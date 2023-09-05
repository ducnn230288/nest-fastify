import { Get, Controller, Render, Req, Post, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller()
export class AppController {
  constructor() {}

  @Get('/')
  @Render('index')
  root(@Req() req: FastifyRequest) {
    const data = req.session.get('data');
    console.log(data);
    req.session.delete();
    return { title: 'True Foundry GitHub Authorizerss' };
  }

  @Post('/')
  login(@Req() req: FastifyRequest, @Res({ passthrough: true }) res: FastifyReply) {
    req.session.set('data', 'req.body');
    res.redirect(302, '/');
    return { title: 'True Foundry GitHub Authorizerss' };
  }

  @Get('/administrator')
  @Render('administrator')
  administrator() {}
}
