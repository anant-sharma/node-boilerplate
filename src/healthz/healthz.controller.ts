import { Controller, Get } from '@nestjs/common';
import { HealthzService } from './healthz.service';

@Controller('healthz')
export class HealthzController {
  constructor(private readonly healthzService: HealthzService) {}
  @Get()
  findAll(): { app: string; status: string; date: string } {
    return this.healthzService.getHealth();
  }
}
