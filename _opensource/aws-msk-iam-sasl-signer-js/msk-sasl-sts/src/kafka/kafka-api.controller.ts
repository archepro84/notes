import { Controller, Get } from '@nestjs/common';
import { KafkaApiService } from '@/kafka/kafka-api.service';

@Controller('kafka')
export class KafkaApiController {
  constructor(private readonly kafkaApiService: KafkaApiService) {}

  @Get('/')
  async kafkaHealthCheck(): Promise<boolean> {
    return await this.kafkaApiService.kafkaHealthCheck();
  }
}
