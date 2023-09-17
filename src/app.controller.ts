import { Get, Controller, Render, Req, Post, Res, Param } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { DataService, ParameterService, PostService } from '@service';
import { DataDto, PostDto } from '@dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Data } from '@model';
import dayjs from 'dayjs';

@Controller()
export class AppController {
  constructor(
    private readonly dataService: DataService,
    private readonly postService: PostService,
    private readonly parameterService: ParameterService,
  ) {}

  @Get('')
  @Render('index')
  async root(@I18n() i18n: I18nContext, language: string = 'vn', urlLang = '/en/'): Promise<IHome> {
    const { data, dataArray } = await this.common(language, ['mission', 'services', 'value', 'member']);
    return {
      urlLang,
      ...data,
      language: {
        ...data.language,
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
          },
        },
      },
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
        SeeMore: i18n.t('client.page.home.SeeMore', { lang: language }),
        translation: item.translations?.filter((subItem) => subItem.language === language)[0],
      })),
    };
  }

  @Get('en')
  @Render('index')
  async rootLang(@I18n() i18n: I18nContext): Promise<IHome> {
    return await this.root(i18n, 'en', '/');
  }

  @Get('/tin-tuc/')
  @Render('post/list')
  async news(
    @I18n() i18n: I18nContext,
    language: string = 'vn',
    type = 'news',
    url: string = '/tin-tuc/',
    urlLang = '/en/news/',
  ): Promise<IListPost> {
    const { data } = await this.common(language);
    const postArray = await this.postService.findArrayCode([type]);
    return {
      urlLang,
      ...data,
      language: {
        ...data.language,
        page: {
          news: {
            Title: i18n.t(`client.page.${type}.Title`, { lang: language }),
            Description: i18n.t(`client.page.${type}.Description`, { lang: language }),
            OtherRelated: i18n.t(`client.page.${type}.OtherRelated`, { lang: language }),
            MoreUpToDate: i18n.t(`client.page.${type}.MoreUpToDate`, { lang: language }),
          },
        },
      },
      post: postArray[type].map((item) => {
        const translation = item.translations?.filter((subItem) => subItem.language === language)[0];
        return {
          ...item,
          SeeMore: i18n.t('client.page.home.SeeMore', { lang: language }),
          translation: {
            ...translation,
            slug: url + translation!.slug,
          },
        };
      }),
    };
  }
  @Get('/en/news/')
  @Render('post/list')
  async newsEn(@I18n() i18n: I18nContext): Promise<IListPost> {
    return await this.news(i18n, 'en', 'news', '/en/news/', '/tin-tuc/');
  }

  @Get('/du-an/')
  @Render('post/list')
  async projects(@I18n() i18n: I18nContext): Promise<IListPost> {
    return await this.news(i18n, 'vn', 'projects', '/du-an/', '/en/projects/');
  }

  @Get('/en/projects/')
  @Render('post/list')
  async projectsEn(@I18n() i18n: I18nContext): Promise<IListPost> {
    return await this.news(i18n, 'en', 'projects', '/en/projects/', '/du-an/');
  }

  @Get('/tin-tuc/:slug/')
  @Render('post/detail')
  async newsDetail(
    @I18n() i18n: I18nContext,
    @Param('slug') slug: string,
    @Res({ passthrough: true }) res: FastifyReply,
    language: string = 'vn',
    type = 'news',
    url: string = '/tin-tuc/',
    urlLang = '/en/news/',
  ): Promise<IPost | void> {
    const { data } = await this.common(language);
    const post = await this.postService.findSlug(slug);
    if (!post) res.redirect(404, '/404');
    else {
      const postArray = await this.postService.findArrayCode([type]);
      const translation = post.translations?.filter((subItem) => subItem.language === language)[0];
      return {
        urlLang: urlLang + post.translations?.filter((subItem) => subItem.language !== language)[0].slug,
        ...data,
        language: {
          ...data.language,
          page: {
            news: {
              Title: i18n.t(`client.page.${type}.Title`, { lang: language }),
              Description: i18n.t(`client.page.${type}.Description`, { lang: language }),
              OtherRelated: i18n.t(`client.page.${type}.OtherRelated`, { lang: language }),
              MoreUpToDate: i18n.t(`client.page.${type}.MoreUpToDate`, { lang: language }),
            },
          },
        },
        post: postArray[type].map((item) => {
          const translation = item.translations?.filter((subItem) => subItem.language === language)[0];
          return {
            ...item,
            createdAt: dayjs(item.createdAt).format('DD-MM-YYYY'),
            SeeMore: i18n.t('client.page.home.SeeMore', { lang: language }),
            translation: {
              ...translation,
              slug: url + translation!.slug,
            },
          };
        }),
        detail: {
          ...post,
          translation: {
            ...translation,

            slug: url + translation!.slug,
            content: this.renderEditor(translation!.content!.blocks),
          },
        },
      };
    }
  }
  @Get('/en/news/:slug/')
  @Render('post/detail')
  async newsDetailEn(
    @I18n() i18n: I18nContext,
    @Param('slug') slug: string,
    @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<IPost | void> {
    return await this.newsDetail(i18n, slug, res, 'en', 'news', '/en/news/', '/tin-tuc/');
  }

  @Get('/du-an/:slug/')
  @Render('post/detail')
  async projectsDetail(
    @I18n() i18n: I18nContext,
    @Param('slug') slug: string,
    @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<IPost | void> {
    return await this.newsDetail(i18n, slug, res, 'vn', 'projects', '/du-an/', '/en/projects/');
  }
  @Get('/en/projects/:slug/')
  @Render('post/detail')
  async projectsDetailEn(
    @I18n() i18n: I18nContext,
    @Param('slug') slug: string,
    @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<IPost | void> {
    return await this.newsDetail(i18n, slug, res, 'en', 'projects', '/en/projects/', '/du-an/');
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

  async common(
    language: string,
    arrayCode: string[] = [],
  ): Promise<{
    data: ICommon;
    dataArray: { [p: string]: Data[] };
  }> {
    const i18n = I18nContext.current()!;
    const [parameter] = await this.parameterService.findAll({});
    const returnParameter = {};
    parameter.forEach((item) => (returnParameter[item.code] = item[language]));

    const dataArray = await this.dataService.findArrayCode(['partner', ...arrayCode]);
    return {
      data: {
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
              Copyright: i18n.t('client.layout.footer.Copyright', {
                lang: language,
                args: { year: new Date().getFullYear() },
              }),
            },
          },
        },
        parameter: returnParameter,
        partner: dataArray['partner'],
      },
      dataArray,
    };
  }

  renderEditor(content: IEditor[]) {
    return content.map(({ type, data }) => {
      switch (type) {
        case 'header':
          return `<h${data.level}>${data.text}</h${data.level}>`;
        case 'image':
          return ` <a class="image glightbox" href=${data.file?.url} data-description=${
            data.caption
          }><img class="lazy" alt="${data.caption}" data-src="${data.file?.url}"/>${
            data.caption ? '<span class="caption">' + data.caption + '</span>' : ''
          }</a>`;
        default:
          return `<p>${data.text}</p>`;
      }
    });
  }
}
interface ICommon {
  title: string;
  lang: string;
  isEnglish: boolean;
  language: object;
  parameter: object;
  partner: DataDto[];
}
interface IHome extends ICommon {
  urlLang: string;
  mission: DataDto[];
  services: DataDto[];
  value: DataDto[];
  member: DataDto[];
}
interface IListPost extends ICommon {
  urlLang: string;
  post: PostDto[];
}
interface IPost extends ICommon {
  urlLang: string;
  post: PostDto[];
  detail: object;
}
interface IEditor {
  id: string;
  data: {
    text: string;
    level?: string;
    file?: {
      url?: string;
    };
    caption?: string;
    stretched?: boolean;
    withBorder?: boolean;
    withBackground?: boolean;
  };
  type: string;
}
