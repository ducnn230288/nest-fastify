import { MigrationInterface, QueryRunner } from 'typeorm';

export class Core1698359444654 implements MigrationInterface {
  name = 'Core1698359444654';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "base" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ee39d2f844e458c187af0e5383f" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "core"."code" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL, "type" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_3aab60cbcf5684b4a89fb46147e" UNIQUE ("code"), CONSTRAINT "PK_367e70f79a9106b8e802e1a9825" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "core"."code_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, "is_primary" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_26e48b5ff442e5a476363c7c289" UNIQUE ("code"), CONSTRAINT "PK_aee67663d3bf78ece882e953afd" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "core"."data" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying NOT NULL, "name" character varying, "image" character varying, "order" integer, CONSTRAINT "PK_2533602bd9247937e3a4861e173" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "core"."data_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "language" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "position" character varying, "content" character varying, "data_id" uuid NOT NULL, CONSTRAINT "PK_e48e7820fb4c959630441506fc3" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "core"."data_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, "is_primary" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_e407b5b8f08191a39e15c0559eb" UNIQUE ("code"), CONSTRAINT "PK_d7dc4348c702c83c5ff959dfaac" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "core"."file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "type" integer NOT NULL, "url" character varying NOT NULL, "description" character varying, "data" character varying, "status" integer NOT NULL DEFAULT '0', "user_id" character varying NOT NULL, CONSTRAINT "UQ_ff5d246bb5831ad7351f87e67cb" UNIQUE ("url"), CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "core"."parameter" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL, "vn" character varying, "en" character varying, CONSTRAINT "PK_cc5c047040f9c69f0e0d6a844a0" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "core"."post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying NOT NULL, "thumbnail_url" character varying, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "core"."post_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "language" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "slug" character varying, "content" character varying, "post_id" uuid NOT NULL, CONSTRAINT "PK_0410fbb063b8214218be7639ea9" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "core"."post_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, "is_primary" boolean NOT NULL DEFAULT false, "mpath" character varying DEFAULT '', "parent_id" uuid, CONSTRAINT "UQ_1564a516eb281b60ae54e01a36c" UNIQUE ("code"), CONSTRAINT "PK_fbd367b0f90f065f0e54f858a6a" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "user"."address_province" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "UQ_858a97d2423118631af080793f1" UNIQUE ("code"), CONSTRAINT "PK_4f4f5db6965d8b7efcea357f330" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "user"."address_district" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, "code_province" character varying NOT NULL, CONSTRAINT "UQ_7444cd6ee100f493b1463722b98" UNIQUE ("code"), CONSTRAINT "PK_64989ed42a39bc4b40d51d13e0e" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "user"."address_ward" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, "code_district" character varying NOT NULL, CONSTRAINT "UQ_3b11e3dd0964b66967ce5acdfd8" UNIQUE ("code"), CONSTRAINT "PK_e5ad8623648a0deb50ddf4e9550" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "user"."address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "code_province" character varying NOT NULL, "code_district" character varying NOT NULL, "code_ward" character varying NOT NULL, "specific_address" character varying NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "user"."user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "avatar" character varying, "password" character varying NOT NULL, "refresh_token" character varying, "otp" character varying, "email" character varying NOT NULL, "phone_number" character varying NOT NULL, "dob" TIMESTAMP NOT NULL, "description" character varying, "role_code" character varying, "position_code" character varying, "start_date" TIMESTAMP NOT NULL, "date_leave" real, "date_off" real DEFAULT '0', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "user"."user_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL, "name" character varying NOT NULL, "is_system_admin" boolean NOT NULL DEFAULT false, "permissions" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "UQ_00c232124015d4998bdc6036310" UNIQUE ("code"), CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "core"."code" ADD CONSTRAINT "FK_927209d9e3f6f87ace1a933c978" FOREIGN KEY ("type") REFERENCES "core"."code_type"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."data" ADD CONSTRAINT "FK_5411ba018172ec73e64e74bf5b0" FOREIGN KEY ("type") REFERENCES "core"."data_type"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."data_translation" ADD CONSTRAINT "FK_f96ec095c0ace5a939faae0f492" FOREIGN KEY ("data_id") REFERENCES "core"."data"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "core"."post" ADD CONSTRAINT "FK_b499447822de3f24ad355e19b8c" FOREIGN KEY ("type") REFERENCES "core"."post_type"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "core"."post_translation" ADD CONSTRAINT "FK_20683910402d734638e0a835124" FOREIGN KEY ("post_id") REFERENCES "core"."post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "core"."post_type" ADD CONSTRAINT "FK_0e271348dc86606bcb78bb5baf0" FOREIGN KEY ("parent_id") REFERENCES "core"."post_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "user"."address_district" ADD CONSTRAINT "FK_fdd42469a45a920583ac5466ecc" FOREIGN KEY ("code_province") REFERENCES "user"."address_province"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "user"."address_ward" ADD CONSTRAINT "FK_cf5667d6d48ceca260e97ed4d0e" FOREIGN KEY ("code_district") REFERENCES "user"."address_district"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "user"."address" ADD CONSTRAINT "FK_5e3ad5a5a7aca85fb5e44481240" FOREIGN KEY ("code_province") REFERENCES "user"."address_province"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "user"."address" ADD CONSTRAINT "FK_aaa0daeec19655b4d944406b0e5" FOREIGN KEY ("code_district") REFERENCES "user"."address_district"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "user"."address" ADD CONSTRAINT "FK_ff3bf3e9944150cdc91de65b1ae" FOREIGN KEY ("code_ward") REFERENCES "user"."address_ward"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "user"."address" ADD CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20" FOREIGN KEY ("user_id") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "user"."user" ADD CONSTRAINT "FK_00c232124015d4998bdc6036310" FOREIGN KEY ("role_code") REFERENCES "user"."user_role"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "user"."user" ADD CONSTRAINT "FK_4dd17565fdaf6605da3629e48cb" FOREIGN KEY ("position_code") REFERENCES "core"."code"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user"."user" DROP CONSTRAINT "FK_4dd17565fdaf6605da3629e48cb"`);
    await queryRunner.query(`ALTER TABLE "user"."user" DROP CONSTRAINT "FK_00c232124015d4998bdc6036310"`);
    await queryRunner.query(`ALTER TABLE "user"."address" DROP CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20"`);
    await queryRunner.query(`ALTER TABLE "user"."address" DROP CONSTRAINT "FK_ff3bf3e9944150cdc91de65b1ae"`);
    await queryRunner.query(`ALTER TABLE "user"."address" DROP CONSTRAINT "FK_aaa0daeec19655b4d944406b0e5"`);
    await queryRunner.query(`ALTER TABLE "user"."address" DROP CONSTRAINT "FK_5e3ad5a5a7aca85fb5e44481240"`);
    await queryRunner.query(`ALTER TABLE "user"."address_ward" DROP CONSTRAINT "FK_cf5667d6d48ceca260e97ed4d0e"`);
    await queryRunner.query(`ALTER TABLE "user"."address_district" DROP CONSTRAINT "FK_fdd42469a45a920583ac5466ecc"`);
    await queryRunner.query(`ALTER TABLE "core"."post_type" DROP CONSTRAINT "FK_0e271348dc86606bcb78bb5baf0"`);
    await queryRunner.query(`ALTER TABLE "core"."post_translation" DROP CONSTRAINT "FK_20683910402d734638e0a835124"`);
    await queryRunner.query(`ALTER TABLE "core"."post" DROP CONSTRAINT "FK_b499447822de3f24ad355e19b8c"`);
    await queryRunner.query(`ALTER TABLE "core"."data_translation" DROP CONSTRAINT "FK_f96ec095c0ace5a939faae0f492"`);
    await queryRunner.query(`ALTER TABLE "core"."data" DROP CONSTRAINT "FK_5411ba018172ec73e64e74bf5b0"`);
    await queryRunner.query(`ALTER TABLE "core"."code" DROP CONSTRAINT "FK_927209d9e3f6f87ace1a933c978"`);
    await queryRunner.query(`DROP TABLE "user"."user_role"`);
    await queryRunner.query(`DROP TABLE "user"."user"`);
    await queryRunner.query(`DROP TABLE "user"."address"`);
    await queryRunner.query(`DROP TABLE "user"."address_ward"`);
    await queryRunner.query(`DROP TABLE "user"."address_district"`);
    await queryRunner.query(`DROP TABLE "user"."address_province"`);
    await queryRunner.query(`DROP TABLE "core"."post_type"`);
    await queryRunner.query(`DROP TABLE "core"."post_translation"`);
    await queryRunner.query(`DROP TABLE "core"."post"`);
    await queryRunner.query(`DROP TABLE "core"."parameter"`);
    await queryRunner.query(`DROP TABLE "core"."file"`);
    await queryRunner.query(`DROP TABLE "core"."data_type"`);
    await queryRunner.query(`DROP TABLE "core"."data_translation"`);
    await queryRunner.query(`DROP TABLE "core"."data"`);
    await queryRunner.query(`DROP TABLE "core"."code_type"`);
    await queryRunner.query(`DROP TABLE "core"."code"`);
    await queryRunner.query(`DROP TABLE "base"`);
  }
}
