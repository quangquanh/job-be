import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller() //  route /
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}
}
