import { Body, Controller, Post } from '@nestjs/common';

@Controller('/api/')
export class AppController {
  @Post('ping')
  ping(@Body('frontTime') frontTime) {
    return { ping: +new Date() - +new Date(frontTime) };
  }
}
