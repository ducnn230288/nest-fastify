import { PickType } from "@nestjs/swagger";
import { Category } from "../model/category.model";
import { IsOptional,IsNumber} from 'class-validator';
export class CreateCategoryRequestDto extends PickType(Category, [
    'name', 
]){
    @IsOptional()
    @IsNumber()
    parentId: number;
}