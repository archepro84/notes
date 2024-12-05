import { Injectable } from '@nestjs/common';
import { KafkaProducer } from '@producer/kafka.producer';
import { EnvironmentService } from '@comm/environments/environment.service';

@Injectable()
export class KafkaApiService {
  constructor(
    private readonly kafkaProducer: KafkaProducer,
    private readonly environmentService: EnvironmentService,
  ) {}

  async kafkaHealthCheck(): Promise<boolean> {
    return await this.kafkaProducer.produceEvent(this.environmentService.get('KAFKA_PRODUCE_TOPIC'), {
      message: `Hello Kafka! by ${process.env.HOSTNAME || 'localhost'}`,
      timestamp: new Date().toISOString(),
    });
  }
}
