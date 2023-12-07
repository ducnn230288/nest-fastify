import { IsOptional } from 'class-validator';
export class ConnectKiotViet {
    @IsOptional()
    clientSecret: string;

    @IsOptional()
    clientId: string;

    @IsOptional()
    retailer: string;

    @IsOptional()
    branchId: number;
}