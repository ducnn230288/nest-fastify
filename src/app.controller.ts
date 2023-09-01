import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Render('index.hbs')
  root() {
    return { message: 'Main page!' };
  }
}
