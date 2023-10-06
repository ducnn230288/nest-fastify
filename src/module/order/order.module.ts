import { Order, OrderAddress, OrderProduct, Product } from "@model";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderController } from "@controller";
import { OrderService, ProductService } from "@service";
import { OrderAddressService } from "./service/order-address.service";
import { OrderProductService } from "./service/order-product.service";
import { ProductRepository } from "../product/repository/product.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderAddress, OrderProduct, Product]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderAddressService, OrderProductService, ProductService,ProductRepository],
})

export class OrderModule {

}