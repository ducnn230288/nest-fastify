import { Get, Controller, Render, Req, Post, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { DataService } from '@service';
import { DataDto } from '@dto';

@Controller()
export class AppController {
  constructor(private readonly service: DataService) {}

  @Get('/')
  @Render('index')
  async root(): Promise<{
    title: string;
    partner: DataDto[];
    mission: DataDto[];
    services: DataDto[];
    value: DataDto[];
    member: DataDto[];
  }> {
    // const data = req.session.get('data'); @Req() req: FastifyRequest
    // console.log(data);
    // req.session.delete();
    const language = 'vn';
    const dataArray = await this.service.findArrayCode(['partner', 'mission', 'services', 'value', 'member']);
    return {
      title: 'ARI TECHNOLOGY',
      partner: dataArray['partner'],
      mission: dataArray['mission'].map((item) => ({
        ...item,
        translation: item.translations?.filter((subItem) => subItem.language === language)[0],
      })),
      services: dataArray['services'].map((item) => ({
        ...item,
        translation: item.translations?.filter((subItem) => subItem.language === language)[0],
      })),
      value: dataArray['value'].map((item) => ({
        ...item,
        translation: item.translations?.filter((subItem) => subItem.language === language)[0],
      })),
      member: dataArray['member'].map((item) => ({
        ...item,
        translation: item.translations?.filter((subItem) => subItem.language === language)[0],
      })),
    };
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
