import { IsString } from 'class-validator';
export class ProductInformationDto {
    @IsString()
    content: string;

    @IsString()
    url: string;
}