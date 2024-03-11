import { MigrationInterface, QueryRunner } from "typeorm";

export class Product1710196497937 implements MigrationInterface {
    name = 'Product1710196497937'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "product"."order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" TIMESTAMP, "isDisabled" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "status" integer NOT NULL DEFAULT '0', "orderCode" character varying NOT NULL, "total" integer NOT NULL, "reason" character varying NOT NULL DEFAULT '', "productStoreId" uuid NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "product"."product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" TIMESTAMP, "isDisabled" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "images" text NOT NULL DEFAULT '', "status" integer NOT NULL DEFAULT '0', "slug" character varying NOT NULL, "mass" integer NOT NULL, "discount" integer NOT NULL DEFAULT '0', "productCategoryId" uuid NOT NULL, "productStoreId" uuid NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "product"."order_product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" TIMESTAMP, "isDisabled" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" uuid NOT NULL, "orderId" uuid NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "quantity" integer NOT NULL, "discount" integer NOT NULL DEFAULT '0', "total" integer NOT NULL, CONSTRAINT "PK_539ede39e518562dfdadfddb492" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "product"."order_address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" TIMESTAMP, "isDisabled" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "codeWard" character varying NOT NULL, "codeDistrict" character varying NOT NULL, "codeProvince" character varying NOT NULL, "specificAddress" character varying NOT NULL, "orderId" uuid NOT NULL, "addressId" uuid NOT NULL, CONSTRAINT "REL_d82a2840b5e5c98c569d75e92e" UNIQUE ("orderId"), CONSTRAINT "PK_f07603e96b068aae820d4590270" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "product"."product_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" TIMESTAMP, "isDisabled" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "slug" character varying NOT NULL, "image" character varying NOT NULL, "parentId" uuid, CONSTRAINT "PK_0dce9bc93c2d2c399982d04bef1" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "product"."product_store" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" TIMESTAMP, "isDisabled" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "status" integer NOT NULL DEFAULT '0', "phone" character varying NOT NULL, "description" character varying NOT NULL, "slug" character varying NOT NULL, "avatar" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_4fb20f5e0d195dcc2e27e8cc815" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "product"."order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."order" ADD CONSTRAINT "FK_7325a76d8075bb591c92163c082" FOREIGN KEY ("productStoreId") REFERENCES "product"."product_store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."product" ADD CONSTRAINT "FK_618194d24a7ea86a165d7ec628e" FOREIGN KEY ("productCategoryId") REFERENCES "product"."product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."product" ADD CONSTRAINT "FK_0e5c6a5d34a05abf7ae85a986c1" FOREIGN KEY ("productStoreId") REFERENCES "product"."product_store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."order_product" ADD CONSTRAINT "FK_073c85ed133e05241040bd70f02" FOREIGN KEY ("productId") REFERENCES "product"."product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."order_product" ADD CONSTRAINT "FK_3fb066240db56c9558a91139431" FOREIGN KEY ("orderId") REFERENCES "product"."order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."order_address" ADD CONSTRAINT "FK_ccf99bddac2b13881081c00dc02" FOREIGN KEY ("codeWard") REFERENCES "user"."address_ward"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."order_address" ADD CONSTRAINT "FK_607070503e4944c8f4182b611fc" FOREIGN KEY ("codeDistrict") REFERENCES "user"."address_district"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."order_address" ADD CONSTRAINT "FK_e91ee756d74e0b7be8c6704ef75" FOREIGN KEY ("codeProvince") REFERENCES "user"."address_province"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."order_address" ADD CONSTRAINT "FK_d82a2840b5e5c98c569d75e92e8" FOREIGN KEY ("orderId") REFERENCES "product"."order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."order_address" ADD CONSTRAINT "FK_de4c2ed4974dd99f5d47bf156bb" FOREIGN KEY ("addressId") REFERENCES "user"."address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."product_category" ADD CONSTRAINT "FK_569b30aa4b0a1ad42bcd30916aa" FOREIGN KEY ("parentId") REFERENCES "product"."product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."product_store" ADD CONSTRAINT "FK_54864aa393358842a623638bded" FOREIGN KEY ("userId") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product"."product_store" DROP CONSTRAINT "FK_54864aa393358842a623638bded"`);
    await queryRunner.query(`ALTER TABLE "product"."product_category" DROP CONSTRAINT "FK_569b30aa4b0a1ad42bcd30916aa"`);
    await queryRunner.query(`ALTER TABLE "product"."order_address" DROP CONSTRAINT "FK_de4c2ed4974dd99f5d47bf156bb"`);
    await queryRunner.query(`ALTER TABLE "product"."order_address" DROP CONSTRAINT "FK_d82a2840b5e5c98c569d75e92e8"`);
    await queryRunner.query(`ALTER TABLE "product"."order_address" DROP CONSTRAINT "FK_e91ee756d74e0b7be8c6704ef75"`);
    await queryRunner.query(`ALTER TABLE "product"."order_address" DROP CONSTRAINT "FK_607070503e4944c8f4182b611fc"`);
    await queryRunner.query(`ALTER TABLE "product"."order_address" DROP CONSTRAINT "FK_ccf99bddac2b13881081c00dc02"`);
    await queryRunner.query(`ALTER TABLE "product"."order_product" DROP CONSTRAINT "FK_3fb066240db56c9558a91139431"`);
    await queryRunner.query(`ALTER TABLE "product"."order_product" DROP CONSTRAINT "FK_073c85ed133e05241040bd70f02"`);
    await queryRunner.query(`ALTER TABLE "product"."product" DROP CONSTRAINT "FK_0e5c6a5d34a05abf7ae85a986c1"`);
    await queryRunner.query(`ALTER TABLE "product"."product" DROP CONSTRAINT "FK_618194d24a7ea86a165d7ec628e"`);
    await queryRunner.query(`ALTER TABLE "product"."order" DROP CONSTRAINT "FK_7325a76d8075bb591c92163c082"`);
    await queryRunner.query(`ALTER TABLE "product"."order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
    await queryRunner.query(`DROP TABLE "product"."product_store"`);
    await queryRunner.query(`DROP TABLE "product"."product_category"`);
    await queryRunner.query(`DROP TABLE "product"."order_address"`);
    await queryRunner.query(`DROP TABLE "product"."order_product"`);
    await queryRunner.query(`DROP TABLE "product"."product"`);
    await queryRunner.query(`DROP TABLE "product"."order"`);
  }

}
