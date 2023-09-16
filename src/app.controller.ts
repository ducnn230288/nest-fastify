import { Get, Controller, Render, Req, Post, Res, Param } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { DataService, ParameterService } from '@service';
import { DataDto } from '@dto';
import { I18n, I18nContext } from 'nestjs-i18n';
@Controller()
export class AppController {
  constructor(
    private readonly dataService: DataService,
    private readonly parameterService: ParameterService,
  ) {}

  @Get(':lang')
  @Render('index')
  async root(
    @I18n() i18n: I18nContext,
    @Param('lang') language: string,
  ): Promise<{
    title: string;
    lang: string;
    isEnglish: boolean;
    language: object;
    parameter: object;
    partner: DataDto[];
    mission: DataDto[];
    services: DataDto[];
    value: DataDto[];
    member: DataDto[];
  }> {
    const [parameter] = await this.parameterService.findAll({});
    const returnParameter = {};
    parameter.forEach((item) => (returnParameter[item.code] = item[language]));

    const dataArray = await this.dataService.findArrayCode(['partner', 'mission', 'services', 'value', 'member']);
    return {
      title: 'ARI TECHNOLOGY',
      lang: language,
      isEnglish: language == 'en',
      language: {
        layout: {
          header: {
            Location: i18n.t('client.layout.header.Location', { lang: language }),
            Mail: i18n.t('client.layout.header.Mail', { lang: language }),
            Call: i18n.t('client.layout.header.Call', { lang: language }),
            Home: i18n.t('client.layout.header.Home', { lang: language }),
            About: i18n.t('client.layout.header.About', { lang: language }),
            AboutTech: i18n.t('client.layout.header.AboutTech', { lang: language }),
            OurCoreTeam: i18n.t('client.layout.header.OurCoreTeam', { lang: language }),
            News: i18n.t('client.layout.header.News', { lang: language }),
            Projects: i18n.t('client.layout.header.Projects', { lang: language }),
            ContactUs: i18n.t('client.layout.header.ContactUs', { lang: language }),
            Vietnamese: i18n.t('client.layout.header.Vietnamese', { lang: language }),
            English: i18n.t('client.layout.header.English', { lang: language }),
          },
          footer: {
            PartnersAndCustomers: i18n.t('client.layout.footer.PartnersAndCustomers', { lang: language }),
            OurSupportPartner: i18n.t('client.layout.footer.OurSupportPartner', { lang: language }),
            Contact: i18n.t('client.layout.footer.Contact', { lang: language }),
            QuestionsOrConcerns: i18n.t('client.layout.footer.QuestionsOrConcerns', { lang: language }),
            FirstName: i18n.t('client.layout.footer.FirstName', { lang: language }),
            LastName: i18n.t('client.layout.footer.LastName', { lang: language }),
            PhoneNumber: i18n.t('client.layout.footer.PhoneNumber', { lang: language }),
            Email: i18n.t('client.layout.footer.Email', { lang: language }),
            Message: i18n.t('client.layout.footer.Message', { lang: language }),
            SubmitNow: i18n.t('client.layout.footer.SubmitNow', { lang: language }),
            OurServices: i18n.t('client.layout.footer.OurServices', { lang: language }),
            DigitalTransformation: i18n.t('client.layout.footer.DigitalTransformation', { lang: language }),
            RDServices: i18n.t('client.layout.footer.RDServices', { lang: language }),
            OutsourcingServices: i18n.t('client.layout.footer.OutsourcingServices', { lang: language }),
            ProductDevelopment: i18n.t('client.layout.footer.ProductDevelopment', { lang: language }),
            UsefulLinks: i18n.t('client.layout.footer.UsefulLinks', { lang: language }),
            GetInTouch: i18n.t('client.layout.footer.GetInTouch', { lang: language }),
            Copyright: i18n.t('client.layout.footer.Copyright', {
              lang: language,
              args: { year: new Date().getFullYear() },
            }),
          },
        },
        page: {
          home: {
            EnhanceVietnam: i18n.t('client.page.home.EnhanceVietnam', { lang: language }),
            ChooseService: i18n.t('client.page.home.ChooseService', { lang: language }),
            DigitalTransformation: i18n.t('client.page.home.DigitalTransformation', { lang: language }),
            RDServices: i18n.t('client.page.home.RDServices', { lang: language }),
            OutsourcingServices: i18n.t('client.page.home.OutsourcingServices', { lang: language }),
            ProductDevelopment: i18n.t('client.page.home.ProductDevelopment', { lang: language }),
            GetStarted: i18n.t('client.page.home.GetStarted', { lang: language }),
            ABOUT: i18n.t('client.page.home.ABOUT', { lang: language }),
            ARIIs: i18n.t('client.page.home.ARIIs', { lang: language }),
            BestTechnicalAgency: i18n.t('client.page.home.BestTechnicalAgency', { lang: language }),
            About1: i18n.t('client.page.home.About1', { lang: language }),
            About2: i18n.t('client.page.home.About2', { lang: language }),
            About3: i18n.t('client.page.home.About3', { lang: language }),
            OurMission: i18n.t('client.page.home.OurMission', { lang: language }),
            WeProvide: i18n.t('client.page.home.WeProvide', { lang: language }),
            Services: i18n.t('client.page.home.Services', { lang: language }),
            ARightChoice: i18n.t('client.page.home.ARightChoice', { lang: language }),
            ARINotStrives: i18n.t('client.page.home.ARINotStrives', { lang: language }),
            CoreValue: i18n.t('client.page.home.CoreValue', { lang: language }),
            ExecutiveBoard: i18n.t('client.page.home.ExecutiveBoard', { lang: language }),
            WeLove: i18n.t('client.page.home.WeLove', { lang: language }),
            SeeMore: i18n.t('client.page.home.SeeMore', { lang: language }),
          },
        },
      },
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
