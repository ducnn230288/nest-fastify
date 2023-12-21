import { PartialType, PickType } from "@nestjs/swagger";
import { Category } from "@model";


export class CreateCategoryRequestDto extends PickType(Category, ['name','parentId']) { }
export class DetailCategoryResponeDto extends PartialType(Category){}
export class UpdateCategoryRequestDto extends PartialType(Category){}