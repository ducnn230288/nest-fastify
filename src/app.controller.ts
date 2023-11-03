import { Get, Controller, Render, ValidationPipe, Query } from '@nestjs/common';
import { ProductCategoryService, DataService, PostService, ParameterService, ProductService } from '@service';
import { PaginationQueryDto } from './shared/base';
import { ProductCategoryDto, ProductDto } from '@dto';
import { I18nContext } from 'nestjs-i18n';

@Controller()
export class AppController {
  constructor(
    private readonly dataService: DataService,
    private readonly postService: PostService,
    private readonly parameterService: ParameterService, // @Inject(CACHE_MANAGER) private managerCache: Cache,
    private readonly categoryService: ProductCategoryService,
    private readonly productService: ProductService,
  ) {}
  @Get('')
  @Render('pages/home/index')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async root(
    language: string = 'en',
    urlLang = '/vn',
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<any> {
    const { data } = await this.common(language);

    let [categories, ...a] = await this.categoryService.findAll(paginationQuery);
    const [products, ...b] = await this.productService.findAll(paginationQuery);
    const featureCate = categories.slice(0, 3);
    categories = categories.map((item) => Object.assign(item, { countProds: item.products?.length }));

    return {
      urlLang,
      ...data,
      language: {
        ...data.language,
      },
      categoriFilter: featureCate,
      categories: categories,
      products: products,
    };
  }

  async common(language: string): Promise<any> {
    const i18n = I18nContext.current()!;

    return {
      data: {
        title: 'Web Store',
        content: 'Web Store',
        lang: language,
        isEnglish: language == 'en',
        language: {
          layout: {
            header: {
              About: i18n.t('main.layout.header.About', { lang: language }),
              Me: i18n.t('main.layout.header.Me', { lang: language }),
              Whistlist: i18n.t('main.layout.header.Whistlist', { lang: language }),
              OrderTracking: i18n.t('main.layout.header.OrderTracking', { lang: language }),
              NeedHelp: i18n.t('main.layout.header.NeedHelp', { lang: language }),
              CallUs: i18n.t('main.layout.header.CallUs', { lang: language }),
              Compare: i18n.t('main.layout.header.Compare', { lang: language }),
              Cart: i18n.t('main.layout.header.Cart', { lang: language }),
              Account: i18n.t('main.layout.header.Account', { lang: language }),
              Deals: i18n.t('main.layout.header.Deals', { lang: language }),
              Home: i18n.t('main.layout.header.Home', { lang: language }),
              Shop: i18n.t('main.layout.header.Shop', { lang: language }),
              Vendor: i18n.t('main.layout.header.Vendor', { lang: language }),
              MegaMenu: i18n.t('main.layout.header.MegaMenu', { lang: language }),
              Blog: i18n.t('main.layout.header.Blog', { lang: language }),
              Pages: i18n.t('main.layout.header.Pages', { lang: language }),
              Contact: i18n.t('main.layout.header.Contact', { lang: language }),
              Support: i18n.t('main.layout.header.Support', { lang: language }),
            },
            footer: {
              WedStore: i18n.t('main.layout.footer.WedStore', { lang: language }),
              Address: i18n.t('main.layout.footer.Address', { lang: language }),
              CallUs: i18n.t('main.layout.footer.CallUs', { lang: language }),
              Email: i18n.t('main.layout.footer.Email', { lang: language }),
              Hour: i18n.t('main.layout.footer.Hour', { lang: language }),
              Install: i18n.t('main.layout.footer.Install', { lang: language }),
              LinkInstall: i18n.t('main.layout.footer.LinkInstall', { lang: language }),
              Payment: i18n.t('main.layout.footer.Payment', { lang: language }),
              company: {
                Company: i18n.t('main.layout.footer.company.Company', { lang: language }),
                Careers: i18n.t('main.layout.footer.company.Careers', { lang: language }),
                TermsConditions: i18n.t('main.layout.footer.company.TermsConditions', { lang: language }),
                PrivacyPolicy: i18n.t('main.layout.footer.company.PrivacyPolicy', { lang: language }),
                DeliveryInformation: i18n.t('main.layout.footer.company.DeliveryInformation', { lang: language }),
                About: i18n.t('main.layout.footer.company.About', { lang: language }),
                Contact: i18n.t('main.layout.footer.company.Contact', { lang: language }),
              },
              account: {
                SignIn: i18n.t('main.layout.footer.account.SignIn', { lang: language }),
                ViewCart: i18n.t('main.layout.footer.account.ViewCart', { lang: language }),
                MyWishlist: i18n.t('main.layout.footer.account.MyWishlist', { lang: language }),
                TrackMyOrder: i18n.t('main.layout.footer.account.TrackMyOrder', { lang: language }),
                HelpTicket: i18n.t('main.layout.footer.account.HelpTicket', { lang: language }),
                ShippingDetails: i18n.t('main.layout.footer.account.ShippingDetails', { lang: language }),
                CompareProducts: i18n.t('main.layout.footer.account.CompareProducts', { lang: language }),
              },
              corporate: {
                BecomeVendor: i18n.t('main.layout.footer.corporate.BecomeVendor', { lang: language }),
                AffiliateProgram: i18n.t('main.layout.footer.corporate.AffiliateProgram', { lang: language }),
                FarmBusiness: i18n.t('main.layout.footer.corporate.FarmBusiness', { lang: language }),
                FarmCareers: i18n.t('main.layout.footer.corporate.FarmCareers', { lang: language }),
                OurSuppliers: i18n.t('main.layout.footer.corporate.OurSuppliers', { lang: language }),
                Accessibility: i18n.t('main.layout.footer.corporate.Accessibility', { lang: language }),
              },
              popular: {
                MilkAndFlavouredMilk: i18n.t('main.layout.footer.popular.MilkAndFlavouredMilk', { lang: language }),
                ButterAndMargarine: i18n.t('main.layout.footer.popular.ButterAndMargarine', { lang: language }),
                EggsSubstitutes: i18n.t('main.layout.footer.popular.EggsSubstitutes', { lang: language }),
                Marmalades: i18n.t('main.layout.footer.popular.Marmalades', { lang: language }),
                SourCreamandDips: i18n.t('main.layout.footer.popular.SourCreamandDips', { lang: language }),
                TeaAndKombucha: i18n.t('main.layout.footer.popular.TeaAndKombucha', { lang: language }),
                Cheese: i18n.t('main.layout.footer.popular.Cheese', { lang: language }),
              },
            },
            validation: {},
          },
        },
      },
    };
  }

  /*
  // @Get('auth/profile')
  // @Render('auth/profile')
  // profile(): void {}

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
              content: this.renderEditor(translation!.content!.blocks),
            },
          };
        }),
      },
    };
  }

   private categoryService : ProductCategoryService
  ) { }
  @Get('/en')
  @Render('pages/home')
 async root( @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto): Promise<any> {
  constructor(private categoryService: ProductCategoryService) {}
  @Get('/')
  @Render('pages/home/index')
  async root(@Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto): Promise<any> {
    const cate = await this.categoryService.findAll(paginationQuery);
    return {
      title: 'Home Page',
      content: 'Home Page',
      categories: cate[0] || [],
    };
  }
  */
}

interface Category {
  category: ProductCategoryDto;
  countProds: number;
}

interface Ihome {
  urlLang: string;
  categories: Array<object>;
  products: ProductDto[];
}
