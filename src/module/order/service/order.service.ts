import { Order } from "@model";
import { BaseService } from "@shared";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


export const P_ORDER_LISTED = '54e3dc6a-5e96-11ee-8c99-0242ac120002'
export const P_ORDER_CREATE = 'f4dc7e8b-84e4-469b-8342-946fd8f24f13'


@Injectable()
export class OrderService extends BaseService<Order> {
     constructor(
         @InjectRepository(Order)  public repo: Repository<Order>,
     ) {
        super(repo);
     } 
}