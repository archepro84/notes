import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConnectEvent, DisconnectEvent, Producer, ProducerRecord, RequestQueueSizeEvent } from 'kafkajs';
import KafkaService from '@comm/kafka/kafka.service';

@Injectable()
export class KafkaProducer implements OnModuleInit {
  private producer: Producer;
  private readonly logger = new Logger(KafkaProducer.name);

  constructor(private readonly kafkaService: KafkaService) {}

  async onModuleInit() {
    await this.init();
  }

  private async init(): Promise<Producer> {
    if (!this.producer) {
      await this.kafkaService.connect();
      this.producer = this.kafkaService.getProducer();
      this.onProducerEvent(this.producer);
      this.logger.log('KafkaProducer Initialize Success.');
    }

    return this.producer;
  }

  // Kafka Producer Event Handlers
  // Docs: https://kafka.js.org/docs/instrumentation-events#a-name-producer-a-producer
  onProducerEvent(producer: Producer) {
    producer.on('producer.connect', async (event: ConnectEvent) => {
      this.logger.log(`Producer connected to a broker. (${JSON.stringify(event)})`);
    });

    producer.on('producer.disconnect', async (event: DisconnectEvent) => {
      this.logger.error(`Producer has disconnected. (${JSON.stringify(event)})`);
    });

    producer.on('producer.network.request_timeout', async (event: RequestQueueSizeEvent) => {
      this.logger.error(`Request to a broker has timed out. (${JSON.stringify(event)})`);
    });
  }

  async produceEvent(topic: string, payload: any): Promise<boolean> {
    const record: ProducerRecord = {
      topic,
      messages: [{ value: JSON.stringify(payload) }],
    };

    await this.producer.send(record).then(() => {
      this.logger.debug(`Produced message to Kafka :${JSON.stringify(payload)}`);
    });

    return true;
  }
}
