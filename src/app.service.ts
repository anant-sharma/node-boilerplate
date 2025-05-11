import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService<
      ReturnType<typeof configuration>,
      true
    >,
  ) {}

  getHello(): string {
    const APP_NAME = this.configService.get<string>('APP_NAME');
    return `Welcome to ${APP_NAME}`;
  }
}
