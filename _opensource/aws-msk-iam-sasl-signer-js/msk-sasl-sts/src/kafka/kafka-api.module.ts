import { Module } from '@nestjs/common';
import { KafkaApiController } from './kafka-api.controller';
import { KafkaApiService } from './kafka-api.service';
import { ProducerModule } from '@producer/producer.module';

@Module({
  imports: [ProducerModule],
  controllers: [KafkaApiController],
  providers: [KafkaApiService],
})
export class KafkaApiModule {}
