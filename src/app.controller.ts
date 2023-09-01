import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}
  // Response
  @Get('/')
  @Render('index')
  root() {
    return { title: 'True Foundry GitHub Authorizerss' };
  }

  @Get('/administrator')
  @Render('administrator')
  administrator() {}
}
