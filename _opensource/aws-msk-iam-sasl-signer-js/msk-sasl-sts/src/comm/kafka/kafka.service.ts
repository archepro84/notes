import { Kafka, KafkaConfig, Producer, ProducerConfig } from 'kafkajs';
import { Injectable, Logger, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { generateAuthToken } from 'aws-msk-iam-sasl-signer-js';
import { EnvironmentService } from '@comm/environments/environment.service';

@Injectable()
export default class KafkaService implements OnModuleInit, OnApplicationShutdown {
  private kafka: Kafka;
  private producer: Producer;
  private logger = new Logger(KafkaService.name);

  constructor(private readonly environmentService: EnvironmentService) {}

  async onModuleInit() {
    this.logger.log('KafkaService Initialize Start');

    if (!this.kafka) this.kafka = new Kafka(this.getKafkaClientConfig(this.environmentService));
    if (!this.producer) this.producer = this.kafka.producer(this.getKafkaProducerConfig());
    await this.connect();
  }

  async connect() {
    try {
      await this.producer.connect();
      this.logger.log('KafkaService Connect End');
    } catch (err) {
      throw new Error(`KafkaService Connect Fail: ${err}`);
    }
  }

  private getKafkaClientConfig(environmentService: EnvironmentService): KafkaConfig {
    let kafkaClientConfig: KafkaConfig = {
      brokers: environmentService.get('KAFKA_BROKERS').split(','),
      clientId: `${environmentService.get('KAFKA_CLIENT_ID')}-${process.env.HOSTNAME || 'localhost'}`, // Unique Client ID
    };

    if (environmentService.get('KAFKA_ENABLE_MSK') === 'true') {
      kafkaClientConfig = Object.assign(kafkaClientConfig, {
        ssl: true,
        sasl: {
          mechanism: 'oauthbearer',
          oauthBearerProvider: () => this.oauthBearerTokenProvider(this.environmentService.get('KAFKA_MSK_REGION')),
        },
      });
    }

    return kafkaClientConfig;
  }

  private getKafkaProducerConfig(): ProducerConfig {
    return {
      allowAutoTopicCreation: false,
    };
  }

  private async oauthBearerTokenProvider(region: string) {
    // Uses AWS Default Credentials Provider Chain to fetch credentials
    const authTokenResponse = await generateAuthToken({ region });
    return {
      value: authTokenResponse.token,
    };
  }

  public getKafka(): Kafka {
    return this.kafka;
  }

  public getProducer(): Producer {
    return this.producer;
  }

  async onApplicationShutdown() {
    if (this.producer) await this.producer.disconnect();
  }
}
