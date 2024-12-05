import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentKey, EnvironmentVariable } from '@comm/environments/environment.variable';

@Injectable()
export class EnvironmentService {
  constructor(private readonly configService: ConfigService) {}

  get<T extends EnvironmentKey>(key: T): EnvironmentVariable[T] {
    const configValue = this.configService.get<EnvironmentVariable[T]>(key);
    if (configValue === undefined) throw new Error(`Config is not exists: ${key}`);
    return configValue;
  }
}
