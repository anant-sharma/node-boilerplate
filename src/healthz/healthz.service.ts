import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HealthzService {
  constructor(private configService: ConfigService) {}
  getHealth(): { app: string; status: string; date: string } {
    const appName = this.configService.get<string>('APP_NAME') ?? '';
    return { app: appName, status: 'OK', date: new Date().toISOString() };
  }
}
