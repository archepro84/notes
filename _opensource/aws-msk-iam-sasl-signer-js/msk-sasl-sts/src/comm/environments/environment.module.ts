import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentService } from './environment.service';
import path from 'path';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [path.join(process.cwd(), `/env/.env.kafka`)],
      isGlobal: true,
      cache: true,
    }),
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
