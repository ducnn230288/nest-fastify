import { IsNotEmpty } from 'class-validator';
export class PriceBalanceCommissionDto {
    @IsNotEmpty()
    revenue: number;

    amountBalance: number;

    percentBalance: number;
}