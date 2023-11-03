import { Get, Controller, Render, ValidationPipe, Query } from '@nestjs/common';
import hbs from 'hbs';
import { join } from 'path';
import { ProductCategoryService, DataService, PostService, ParameterService, ProductService } from '@service';
import { PaginationQueryDto } from './shared/base';

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
  async root(@Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto): Promise<any> {
    // eslint-disable-next-line prefer-const
    let [categories, ...a] = await this.categoryService.findAll(paginationQuery);
    const [products, ...b] = await this.productService.findAll(paginationQuery);
    const featureCate = categories.slice(0, 3);
    categories = categories.map((item) => Object.assign(item, { countProds: item.products?.length }));
    return {
      categoriFilter: featureCate,
      categories: categories,
      products: products,
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
