import { Get, Controller, Render, Req, Post, Res, Param } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { DataService, ParameterService } from '@service';
import { DataDto } from '@dto';
import { I18n, I18nContext, I18nLang, I18nLanguageInterceptor, I18nService } from 'nestjs-i18n';

@Controller()
export class AppController {
  constructor(
    private readonly dataService: DataService,
    private readonly parameterService: ParameterService,
  ) {}

  @Get('')
  @Render('index')
  async root(@I18nLang() language: string): Promise<{
    title: string;
    lang: string;
    language: object;
    parameter: object;
    partner: DataDto[];
    mission: DataDto[];
    services: DataDto[];
    value: DataDto[];
    member: DataDto[];
  }> {
    // const data = req.session.get('data'); @Req() req: FastifyRequest
    // console.log(data);
    // req.session.delete();

    const [parameter] = await this.parameterService.findAll({});
    const returnParameter = {};
    parameter.forEach((item) => (returnParameter[item.code] = item[language]));

    const dataArray = await this.dataService.findArrayCode(['partner', 'mission', 'services', 'value', 'member']);

    return {
      title: 'ARI TECHNOLOGY',
      lang: language,
      language: { year: new Date().getFullYear() },
      parameter: returnParameter,
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
