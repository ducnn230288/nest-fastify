export class CreateRetailPriceDto {
    id: number;

    unit: string;

    coefficient: number;

    price: number;

    barcode: string;

    code: string;

    basePrice: number // thêm bởi Tuấn

    isActive: boolean // thêm bởi Tuấn
}