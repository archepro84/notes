import { KafkaConsumer } from '@consumer/kafka.consumer';
import { KafkaModule } from '@comm/kafka/kafka.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [KafkaModule],
  providers: [KafkaConsumer],
  exports: [KafkaConsumer],
})
export class ConsumerModule {}
