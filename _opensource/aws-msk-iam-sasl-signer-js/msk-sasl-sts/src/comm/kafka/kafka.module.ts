import { Module } from '@nestjs/common';
import KafkaService from '@comm/kafka/kafka.service';

@Module({
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
