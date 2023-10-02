import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderAddress } from "../model/order-address.model";
import { Repository } from "typeorm";
import { BaseService } from "@shared";

@Injectable()
export class OrderAddressService extends BaseService<OrderAddress> {
     constructor(
         @InjectRepository(OrderAddress)  public repo: Repository<OrderAddress>,
     ) {
         super(repo);
     }
}