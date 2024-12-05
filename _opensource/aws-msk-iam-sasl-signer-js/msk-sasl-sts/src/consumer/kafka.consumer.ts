import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  Consumer,
  Kafka,
  EachMessagePayload,
  ConsumerCrashEvent,
  ConsumerRebalancingEvent,
  ConnectEvent,
  DisconnectEvent,
} from 'kafkajs';

import { EnvironmentService } from '@comm/environments/environment.service';
import KafkaService from '@comm/kafka/kafka.service';

@Injectable()
export class KafkaConsumer implements OnModuleInit {
  private kafka: Kafka;
  private readonly logger = new Logger(KafkaConsumer.name);

  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly kafkaService: KafkaService,
  ) {}

  async onModuleInit() {
    await this.start();
  }

  async init(): Promise<Consumer> {
    this.kafka = this.kafkaService.getKafka();

    const consumer = this.kafka.consumer({
      groupId: this.environmentService.get('KAFKA_CONSUMER_GROUP_ID'),
    });
    await consumer.connect();

    await consumer.subscribe({
      topic: this.environmentService.get('KAFKA_CONSUME_TOPIC'),
      fromBeginning: false,
    });

    return consumer;
  }

  async consume(consumer: Consumer): Promise<void> {
    await consumer.run({
      eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        try {
          const kafkaMessage = JSON.parse(message.value?.toString() ?? '{}');
          this.logger.debug(
            `topic: (${topic}), partition: (${partition}) kafkaMessage: ${JSON.stringify(kafkaMessage)}`,
          );
        } catch (err) {
          this.logger.error(`Topic Consume Error. topic: (${topic}), partition: (${partition}) err: (${err})`);
        }
      },
    });
  }

  // Kafka Consumer Event Handlers
  // Docs: https://kafka.js.org/docs/instrumentation-events#a-name-consumer-a-consumer
  onKafkaEvent(consumer: Consumer) {
    consumer.on('consumer.crash', async (event: ConsumerCrashEvent) => {
      this.logger.error(`Consumer has crashed. (${JSON.stringify(event)})`);
      await consumer.disconnect();
    });

    consumer.on('consumer.rebalancing', async (event: ConsumerRebalancingEvent) => {
      this.logger.warn(`Consumer Group has started rebalancing. (${JSON.stringify(event)})`);
    });

    consumer.on('consumer.connect', async (event: ConnectEvent) => {
      this.logger.log(`Consumer connected to a broker. (${JSON.stringify(event)})`);
    });

    consumer.on('consumer.disconnect', async (event: DisconnectEvent) => {
      this.logger.warn(`Consumer has disconnected. (${JSON.stringify(event)})`);
    });
  }

  async start(): Promise<void> {
    const MAX_RETRY_COUNT = 5;
    const MAX_INTERVAL = 60_000;

    try {
      const consumer = await this.retryWithBackOff(() => this.init(), MAX_RETRY_COUNT, MAX_INTERVAL);
      if (consumer) {
        this.onKafkaEvent(consumer);
        await this.consume(consumer);
        this.logger.log('Kafka Consumer Initialize Success.');
      }
    } catch (err) {
      this.logger.error('Kafka Consumer Initialize Failed.', err);
      throw err;
    }
  }

  // Retry with Exponential Backoff
  private async retryWithBackOff<T>(operation: () => Promise<T>, maxRetries: number, maxInterval: number): Promise<T> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await operation();
        if (result) return result;
      } catch (error) {
        const retryInterval = Math.min(1000 * attempt, maxInterval);
        this.logger.error(`Attempt ${attempt} failed. Retrying in ${retryInterval}ms.`, error);
        if (attempt === maxRetries) throw error;
        await this.sleep(retryInterval);
      }
    }

    throw new Error(`Failed to execute operation after ${maxRetries} attempts.`);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
  }
}
