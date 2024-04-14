import { MigrationInterface, QueryRunner } from "typeorm";

export class Product1710196497937 implements MigrationInterface {
    name = 'Product1710196497937'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "product"."order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "status" integer NOT NULL DEFAULT '0', "order_code" character varying NOT NULL, "total" integer NOT NULL, "reason" character varying NOT NULL DEFAULT '', "product_store_id" uuid NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "product"."product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "images" text NOT NULL DEFAULT '', "status" integer NOT NULL DEFAULT '0', "slug" character varying NOT NULL, "mass" integer NOT NULL, "discount" integer NOT NULL DEFAULT '0', "product_category_id" uuid NOT NULL, "product_store_id" uuid NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "product"."order_product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "product_id" uuid NOT NULL, "order_id" uuid NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "quantity" integer NOT NULL, "discount" integer NOT NULL DEFAULT '0', "total" integer NOT NULL, CONSTRAINT "PK_539ede39e518562dfdadfddb492" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "product"."order_address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "code_ward" character varying NOT NULL, "code_district" character varying NOT NULL, "code_province" character varying NOT NULL, "specific_address" character varying NOT NULL, "order_id" uuid NOT NULL, "address_id" uuid NOT NULL, CONSTRAINT "REL_bd8424734e4ed6b3113b2b9dd1" UNIQUE ("order_id"), CONSTRAINT "PK_f07603e96b068aae820d4590270" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "product"."product_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "slug" character varying NOT NULL, "image" character varying NOT NULL, "parent_id" uuid, CONSTRAINT "PK_0dce9bc93c2d2c399982d04bef1" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "product"."product_store" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "status" integer NOT NULL DEFAULT '0', "phone" character varying NOT NULL, "description" character varying NOT NULL, "slug" character varying NOT NULL, "avatar" character varying NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_4fb20f5e0d195dcc2e27e8cc815" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "product"."order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."order" ADD CONSTRAINT "FK_f69e3aff91b3289ce57f4dfaf91" FOREIGN KEY ("product_store_id") REFERENCES "product"."product_store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."product" ADD CONSTRAINT "FK_c385a97195418da0bd3a08ceced" FOREIGN KEY ("product_category_id") REFERENCES "product"."product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."product" ADD CONSTRAINT "FK_4a62fe6fc1750f670f43b1a1945" FOREIGN KEY ("product_store_id") REFERENCES "product"."product_store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."order_product" ADD CONSTRAINT "FK_400f1584bf37c21172da3b15e2d" FOREIGN KEY ("product_id") REFERENCES "product"."product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."order_product" ADD CONSTRAINT "FK_ea143999ecfa6a152f2202895e2" FOREIGN KEY ("order_id") REFERENCES "product"."order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."order_address" ADD CONSTRAINT "FK_a1f3f396d16df0f0a2d9a3aa61b" FOREIGN KEY ("code_ward") REFERENCES "user"."address_ward"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."order_address" ADD CONSTRAINT "FK_decb2cb6c54d9cd825adf4d243f" FOREIGN KEY ("code_district") REFERENCES "user"."address_district"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."order_address" ADD CONSTRAINT "FK_a6ac5dc992eb0adaf82948afeac" FOREIGN KEY ("code_province") REFERENCES "user"."address_province"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."order_address" ADD CONSTRAINT "FK_bd8424734e4ed6b3113b2b9dd19" FOREIGN KEY ("order_id") REFERENCES "product"."order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."order_address" ADD CONSTRAINT "FK_80aa0894c299459b2a6d0d39e01" FOREIGN KEY ("address_id") REFERENCES "user"."address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."product_category" ADD CONSTRAINT "FK_17f434523d4566716f2b1c528a8" FOREIGN KEY ("parent_id") REFERENCES "product"."product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product"."product_store" ADD CONSTRAINT "FK_26003f47e1dbb65e1ff9b99ddfd" FOREIGN KEY ("user_id") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product"."product_store" DROP CONSTRAINT "FK_26003f47e1dbb65e1ff9b99ddfd"`);
    await queryRunner.query(`ALTER TABLE "product"."product_category" DROP CONSTRAINT "FK_17f434523d4566716f2b1c528a8"`);
    await queryRunner.query(`ALTER TABLE "product"."order_address" DROP CONSTRAINT "FK_80aa0894c299459b2a6d0d39e01"`);
    await queryRunner.query(`ALTER TABLE "product"."order_address" DROP CONSTRAINT "FK_bd8424734e4ed6b3113b2b9dd19"`);
    await queryRunner.query(`ALTER TABLE "product"."order_address" DROP CONSTRAINT "FK_a6ac5dc992eb0adaf82948afeac"`);
    await queryRunner.query(`ALTER TABLE "product"."order_address" DROP CONSTRAINT "FK_decb2cb6c54d9cd825adf4d243f"`);
    await queryRunner.query(`ALTER TABLE "product"."order_address" DROP CONSTRAINT "FK_a1f3f396d16df0f0a2d9a3aa61b"`);
    await queryRunner.query(`ALTER TABLE "product"."order_product" DROP CONSTRAINT "FK_ea143999ecfa6a152f2202895e2"`);
    await queryRunner.query(`ALTER TABLE "product"."order_product" DROP CONSTRAINT "FK_400f1584bf37c21172da3b15e2d"`);
    await queryRunner.query(`ALTER TABLE "product"."product" DROP CONSTRAINT "FK_4a62fe6fc1750f670f43b1a1945"`);
    await queryRunner.query(`ALTER TABLE "product"."product" DROP CONSTRAINT "FK_c385a97195418da0bd3a08ceced"`);
    await queryRunner.query(`ALTER TABLE "product"."order" DROP CONSTRAINT "FK_f69e3aff91b3289ce57f4dfaf91"`);
    await queryRunner.query(`ALTER TABLE "product"."order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`);
    await queryRunner.query(`DROP TABLE "product"."product_store"`);
    await queryRunner.query(`DROP TABLE "product"."product_category"`);
    await queryRunner.query(`DROP TABLE "product"."order_address"`);
    await queryRunner.query(`DROP TABLE "product"."order_product"`);
    await queryRunner.query(`DROP TABLE "product"."product"`);
    await queryRunner.query(`DROP TABLE "product"."order"`);
  }

}
