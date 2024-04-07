import { Get, Controller, Render, Res, Param, UseInterceptors } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { FastifyReply } from 'fastify';
import dayjs from 'dayjs';
// import { Cache } from 'cache-manager'; CACHE_MANAGER Inject
import { CacheInterceptor } from '@nestjs/cache-manager';

import { DataService, ParameterService, PostService } from '@service';
import { Data } from '@model';
import { DataDto, PostDto } from '@dto';

@Controller()
export class AppController {
  constructor(
    private readonly dataService: DataService,
    private readonly postService: PostService,
    private readonly parameterService: ParameterService, // @Inject(CACHE_MANAGER) private managerCache: Cache,
  ) {}

  @Get('')
  @Render('index')
  @UseInterceptors(CacheInterceptor)
  async root(language: string = 'vn', urlLang = '/en'): Promise<IHome> {
    // let product = await this.managerCache.get<ProductEntity>(`product-${id}`);
    // if (!product) {
    //   product = await this.productService.findById(id);
    //   await this.managerCache.set(`product-${id}`, product);
    // }
    const i18n = I18nContext.current()!;
    const { data, dataArray } = await this.common(language, ['mission', 'services', 'value', 'member']);
    return {
      urlLang,
      ...data,
      language: {
        ...data.language,
        page: {
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
      JSON: {
        member: dataArray['member'].map((item) => {
          const translation = item.translations?.filter((subItem) => subItem.language === language)[0];
          return {
            ...item,
            SeeMore: i18n.t('client.page.home.SeeMore', { lang: language }),
            translation: {
              ...translation,
            },
          };
        }),
      },
    };
  }

  @Get('/en')
  @Render('index')
  @UseInterceptors(CacheInterceptor)
  async rootLang(): Promise<IHome> {
    return await this.root('en', '/');
  }

  @Get('/tin-tuc')
  @Render('post/list')
  async news(
    language: string = 'vn',
    type = 'news',
    url: string = '/tin-tuc/',
    urlLang = '/en/news',
  ): Promise<IListPost> {
    const i18n = I18nContext.current()!;
    const { data } = await this.common(language);
    const postArray = await this.postService.findArrayCode([type]);
    return {
      urlLang,
      ...data,
      language: {
        ...data.language,
        page: {
          Title: i18n.t(`client.page.${type}.Title`, { lang: language }),
          Description: i18n.t(`client.page.${type}.Description`, { lang: language }),
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
  @Get('/en/news')
  @Render('post/list')
  async newsEn(): Promise<IListPost> {
    return await this.news('en', 'news', '/en/news/', '/tin-tuc');
  }

  @Get('/du-an')
  @Render('post/list')
  async projects(): Promise<IListPost> {
    return await this.news('vn', 'projects', '/du-an/', '/en/projects');
  }

  @Get('/en/projects')
  @Render('post/list')
  async projectsEn(): Promise<IListPost> {
    return await this.news('en', 'projects', '/en/projects/', '/du-an');
  }

  @Get('/tin-tuc/:slug')
  @Render('post/detail')
  @UseInterceptors(CacheInterceptor)
  async newsDetail(
    @Param('slug') slug: string,
    @Res({ passthrough: true }) res: FastifyReply,
    language: string = 'vn',
    type = 'news',
    url: string = '/tin-tuc/',
    urlLang = '/en/news/',
  ): Promise<IPost | void> {
    const i18n = I18nContext.current()!;
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
            Title: i18n.t(`client.page.${type}.Title`, { lang: language }),
            Description: i18n.t(`client.page.${type}.Description`, { lang: language }),
            OtherRelated: i18n.t(`client.page.${type}.OtherRelated`, { lang: language }),
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
          },
        },
      };
    }
  }
  @Get('/en/news/:slug')
  @Render('post/detail')
  @UseInterceptors(CacheInterceptor)
  async newsDetailEn(
    @Param('slug') slug: string,
    @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<IPost | void> {
    return await this.newsDetail(slug, res, 'en', 'news', '/en/news/', '/tin-tuc/');
  }

  @Get('/du-an/:slug')
  @Render('post/detail')
  @UseInterceptors(CacheInterceptor)
  async projectsDetail(
    @Param('slug') slug: string,
    @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<IPost | void> {
    return await this.newsDetail(slug, res, 'vn', 'projects', '/du-an/', '/en/projects/');
  }
  @Get('/en/projects/:slug')
  @Render('post/detail')
  @UseInterceptors(CacheInterceptor)
  async projectsDetailEn(
    @Param('slug') slug: string,
    @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<IPost | void> {
    return await this.newsDetail(slug, res, 'en', 'projects', '/en/projects/', '/du-an/');
  }

  @Get('/ve-cong-nghe')
  @Render('about/tech')
  @UseInterceptors(CacheInterceptor)
  async aboutTech(language: string = 'vn', urlLang = '/en/about-tech'): Promise<IAbout> {
    const i18n = I18nContext.current()!;
    const { data, dataArray } = await this.common(language, ['tech']);
    return {
      urlLang,
      ...data,
      language: {
        ...data.language,
        page: {
          Title: i18n.t(`client.page.about.tech.Title`, { lang: language }),
          Description: i18n.t(`client.page.about.tech.Description`, { lang: language }),
        },
      },
      JSON: {
        detail: dataArray['tech'],
      },
    };
  }

  @Get('/en/about-tech')
  @Render('about/tech')
  @UseInterceptors(CacheInterceptor)
  async aboutTechEn(): Promise<IAbout> {
    return await this.aboutTech('en', '/ve-cong-nghe');
  }

  @Get('/doi-ngu-phat-trien-chinh')
  @Render('about/member')
  @UseInterceptors(CacheInterceptor)
  async aboutCoreMember(language: string = 'vn', urlLang = '/en/about-core-member'): Promise<IAbout> {
    const i18n = I18nContext.current()!;
    const { data, dataArray } = await this.common(language, ['member']);
    return {
      urlLang,
      ...data,
      language: {
        ...data.language,
        page: {
          Title: i18n.t(`client.page.about.member.Title`, { lang: language }),
          Description: i18n.t(`client.page.about.member.Description`, { lang: language }),
        },
      },
      JSON: {
        detail: dataArray['member']
          .filter((item) => item.order === null || item.order! > 5)
          .map((item) => {
            const translation = item.translations?.filter((subItem) => subItem.language === language)[0];

            return {
              ...item,
              SeeMore: i18n.t('client.page.home.SeeMore', { lang: language }),
              translation: {
                ...translation,
              },
            };
          }),
      },
    };
  }

  @Get('/en/about-core-member')
  @Render('about/member')
  @UseInterceptors(CacheInterceptor)
  async aboutCoreMemberEn(): Promise<IAbout> {
    return await this.aboutCoreMember('en', '/doi-ngu-phat-trien-chinh');
  }

  // @Post('/')
  // login(@Req() req: FastifyRequest, @Res({ passthrough: true }) res: FastifyReply) {
  //   req.session.set('data', 'req.body');
  //   res.redirect(302, '/');
  //   return { title: 'True Foundry GitHub Authorizerss' };
  // }

  @Get('/administrator')
  @Render('administrator')
  administrator(): void {}

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
            validation: {
              required: i18n.t('client.layout.validation.required', { lang: language }),
              email: i18n.t('client.layout.validation.email', { lang: language }),
              mincheck: i18n.t('client.layout.validation.mincheck', { lang: language }),
            },
          },
        },
        parameter: returnParameter,
        partner: dataArray['partner'],
      },
      dataArray,
    };
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
  JSON: {
    member: DataDto[];
  };
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

interface IAbout extends ICommon {
  urlLang: string;
  JSON: {
    detail: DataDto[];
  };
}
