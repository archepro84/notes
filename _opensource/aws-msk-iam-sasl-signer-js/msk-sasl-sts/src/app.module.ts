import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { KafkaApiModule } from '@/kafka/kafka-api.module';
import { ConsumerModule } from '@consumer/consumer.module';
import { EnvironmentModule } from '@comm/environments/environment.module';

@Module({
  imports: [EnvironmentModule, KafkaApiModule, ConsumerModule],
  controllers: [AppController],
})
export class AppModule {}
