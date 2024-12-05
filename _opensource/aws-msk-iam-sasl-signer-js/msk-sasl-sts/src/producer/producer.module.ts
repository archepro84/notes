import { Module } from '@nestjs/common';
import { KafkaProducer } from '@producer/kafka.producer';
import { KafkaModule } from '@comm/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  providers: [KafkaProducer],
  exports: [KafkaProducer],
})
export class ProducerModule {}
