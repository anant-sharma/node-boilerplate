import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthzController } from './healthz/healthz.controller';
import { HealthzService } from './healthz/healthz.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, HealthzController],
  providers: [AppService, HealthzService],
})
export class AppModule {}
