import { OmitType, PartialType, PickType } from "@nestjs/swagger";
import { Product } from "@model";
import { DefaultResponsesDto, PaginationResponsesDto } from "@shared";

export class CreateProductRequestDto extends PartialType(Product) { }

export class UpdateProductRequestDto extends PartialType(
    OmitType(Product, ['storeId', 'categoryId'] as const)
) { }

export class DefaultProductRequestDto extends PartialType(Product) { }

export class ListProductResponseDto extends PartialType(PaginationResponsesDto) {
    readonly data: Product[]
}

export class ProductResponseDto extends DefaultResponsesDto {
    readonly data: DefaultProductRequestDto | null;
}