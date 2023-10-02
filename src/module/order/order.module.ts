import { Order, OrderAddress, OrderProduct } from "@model";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderController } from "@controller";
import { OrderService } from "@service";
import { OrderAddressService } from "./service/order-address.service";
import { OrderProductService } from "./service/order-product.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderAddress, OrderProduct]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderAddressService,OrderProductService ],
})

export class OrderModule {

}