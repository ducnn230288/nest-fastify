import { PickType } from "@nestjs/swagger";
import { Product } from "../model/product.model";
import { CreateRetailPriceDto, PriceBalanceCommissionDto, ProductInformationDto, ProductPriceDto } from "@dto";


export class CreateProductRequestDto extends PickType(Product, ['name','barcode','description','brand', 'origin','abilitySupply','exportMarket','importTaxId','exportTaxId','supplierName','approveStatus','basicUnit','price','storeBarcode']) { 

    categoryListId: Array<Number>

    photos:  Array<String>

    sellingPrice: number = 0

    baseCoefficient: number 

    productPrice: ProductPriceDto[];

    priceBalanceCommission: PriceBalanceCommissionDto[];

    productInformation: ProductInformationDto[];

    retailPrices: CreateRetailPriceDto[];

}