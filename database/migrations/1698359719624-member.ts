import { MigrationInterface, QueryRunner } from 'typeorm';

export class Member1698359719624 implements MigrationInterface {
  name = 'Member1698359719624';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "booking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "startTime" TIMESTAMP, "endTime" TIMESTAMP, "userId" uuid NOT NULL, "typeCode" character varying, "itemCode" character varying, "type" character varying, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "day_off" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL, "type" integer NOT NULL, "status" integer NOT NULL DEFAULT '0', "reason" character varying, "time" integer NOT NULL, "timeNumber" real, "image" character varying, "dateLeaveStart" TIMESTAMP NOT NULL, "dateLeaveEnd" TIMESTAMP NOT NULL, "approvedAt" TIMESTAMP, "approvedById" uuid, "reasonReject" character varying, "staffId" uuid NOT NULL, "managerId" uuid, CONSTRAINT "PK_4ebe4c08c950e3dbc87f0249811" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_team" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "managerId" uuid, CONSTRAINT "PK_155dbc144ff2bd4713fdf1f6c77" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_teams_user_team" ("userId" uuid NOT NULL, "userTeamId" uuid NOT NULL, CONSTRAINT "PK_673c99a7f0d4ea203b0b6bc251e" PRIMARY KEY ("userId", "userTeamId"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_74cb5a61491f8722d90c376972" ON "user_teams_user_team" ("userId") `);
    await queryRunner.query(`CREATE INDEX "IDX_074b07e15f0ba9b81a75740b03" ON "user_teams_user_team" ("userTeamId") `);
    await queryRunner.query(`ALTER TABLE "user" ADD "managerId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_df69481de1f438f2082e4d54749" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_a4108479a7402c440d98205ff09" FOREIGN KEY ("type") REFERENCES "code_type"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_631f222540372c59aefc6cebf75" FOREIGN KEY ("itemCode") REFERENCES "code"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "day_off" ADD CONSTRAINT "FK_a3474e339d2d6ab7f55076e48e5" FOREIGN KEY ("approvedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "day_off" ADD CONSTRAINT "FK_c2b584b7b7008a7cc4b60cb6318" FOREIGN KEY ("staffId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "day_off" ADD CONSTRAINT "FK_08670238291d69988dbf4902e39" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_team" ADD CONSTRAINT "FK_1d03af227d451afbabb890b52fb" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_teams_user_team" ADD CONSTRAINT "FK_74cb5a61491f8722d90c3769729" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_teams_user_team" ADD CONSTRAINT "FK_074b07e15f0ba9b81a75740b039" FOREIGN KEY ("userTeamId") REFERENCES "user_team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_teams_user_team" DROP CONSTRAINT "FK_074b07e15f0ba9b81a75740b039"`);
    await queryRunner.query(`ALTER TABLE "user_teams_user_team" DROP CONSTRAINT "FK_74cb5a61491f8722d90c3769729"`);
    await queryRunner.query(`ALTER TABLE "user_team" DROP CONSTRAINT "FK_1d03af227d451afbabb890b52fb"`);
    await queryRunner.query(`ALTER TABLE "day_off" DROP CONSTRAINT "FK_08670238291d69988dbf4902e39"`);
    await queryRunner.query(`ALTER TABLE "day_off" DROP CONSTRAINT "FK_c2b584b7b7008a7cc4b60cb6318"`);
    await queryRunner.query(`ALTER TABLE "day_off" DROP CONSTRAINT "FK_a3474e339d2d6ab7f55076e48e5"`);
    await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_631f222540372c59aefc6cebf75"`);
    await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_a4108479a7402c440d98205ff09"`);
    await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_336b3f4a235460dc93645fbf222"`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_df69481de1f438f2082e4d54749"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "managerId"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_074b07e15f0ba9b81a75740b03"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_74cb5a61491f8722d90c376972"`);
    await queryRunner.query(`DROP TABLE "user_teams_user_team"`);
    await queryRunner.query(`DROP TABLE "user_team"`);
    await queryRunner.query(`DROP TABLE "day_off"`);
    await queryRunner.query(`DROP TABLE "booking"`);
  }
}
