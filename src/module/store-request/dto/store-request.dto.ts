import { PickType } from "@nestjs/swagger";
import { extend } from "dayjs";
import { StoreRequest } from "@model";


export class CreateStoreRequestDto extends PickType(StoreRequest, [
    "productName",
    "description",
    "note"
] as const) { }


export class RejectStoreRequestDto extends PickType(StoreRequest, [
    "reason",
    "note"
] as const) { }