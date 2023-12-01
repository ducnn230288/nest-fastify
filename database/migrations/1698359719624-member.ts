import { MigrationInterface, QueryRunner } from 'typeorm';

export class Member1698359719624 implements MigrationInterface {
  name = 'Member1698359719624';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "task_timesheet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "start" TIMESTAMP NOT NULL, "finish" TIMESTAMP NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_d556100ebc2e29cb0471a48583b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "booking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "start_time" TIMESTAMP, "end_time" TIMESTAMP, "user_id" uuid NOT NULL, "type_code" character varying, "item_code" character varying, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "day_off" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL, "type" integer NOT NULL, "status" integer NOT NULL DEFAULT '0', "reason" character varying, "time" integer NOT NULL, "time_number" real, "image" character varying, "date_leave_start" TIMESTAMP NOT NULL, "date_leave_end" TIMESTAMP NOT NULL, "approved_at" TIMESTAMP, "approved_by_id" uuid, "reason_reject" character varying, "staff_id" uuid NOT NULL, "manager_id" uuid, CONSTRAINT "PK_4ebe4c08c950e3dbc87f0249811" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_team" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "manager_id" uuid, CONSTRAINT "PK_155dbc144ff2bd4713fdf1f6c77" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "type_code" character varying, "question" character varying, "options" character varying NOT NULL, "correct" character varying NOT NULL, "image" character varying, "level" real, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "question_test" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "point" real, "answer" jsonb NOT NULL DEFAULT '{}', "user_id" uuid NOT NULL, "question_id" uuid NOT NULL, CONSTRAINT "PK_48dff3c387f955f8f3a7d3f734c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "project_code" character varying, "code" character varying NOT NULL, "name" character varying NOT NULL, "content" jsonb NOT NULL DEFAULT '{}', "start" TIMESTAMP NOT NULL, "finish" TIMESTAMP NOT NULL, "deadline" TIMESTAMP NOT NULL, "priority" integer NOT NULL DEFAULT '0', "level" real, "complete" real, "successors" character varying NOT NULL, "predecessors" character varying NOT NULL, "hours" real, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "task_work" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_deleted" TIMESTAMP, "is_disabled" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "hours" real, "task_id" uuid NOT NULL, "timesheet_id" uuid NOT NULL, CONSTRAINT "PK_e91316aba5c0fa394f53cd94bf4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_teams_user_team" ("user_id" uuid NOT NULL, "user_team_id" uuid NOT NULL, CONSTRAINT "PK_f9eb57c0af40535cd6badb8ebd3" PRIMARY KEY ("user_id", "user_team_id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_74dbad62b5fd384aa05c9222bb" ON "user_teams_user_team" ("user_id") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_edc18edef49726f2bcd9237530" ON "user_teams_user_team" ("user_team_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_tasks_task" ("user_id" uuid NOT NULL, "user_task_id" uuid NOT NULL, CONSTRAINT "PK_f72ab7c905ead982132b0183700" PRIMARY KEY ("user_id", "user_task_id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_13b1fbb8fa6a4fe5176e540325" ON "user_tasks_task" ("user_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_0ffc26f2edc4c6200c9c2ae46f" ON "user_tasks_task" ("user_task_id") `);
    await queryRunner.query(`ALTER TABLE "user" ADD "manager_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "task_timesheet" ADD CONSTRAINT "FK_267f1f62058296378129e0c013c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_b925754780ce53c20179d7204f9" FOREIGN KEY ("manager_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_276896d1a1a30be6de9d7d43f53" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_e53fc837a6287a601e370691e30" FOREIGN KEY ("type_code") REFERENCES "code_type"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_9fa0e75d075fbf1fcc57bdcc7f6" FOREIGN KEY ("item_code") REFERENCES "code"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "day_off" ADD CONSTRAINT "FK_8589c81f413483e9ef5384dcfa8" FOREIGN KEY ("approved_by_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "day_off" ADD CONSTRAINT "FK_3c8b1638fcbbd6259a955c2b538" FOREIGN KEY ("staff_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "day_off" ADD CONSTRAINT "FK_b5228f6b8dc9eaefe69cedd5cfc" FOREIGN KEY ("manager_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_team" ADD CONSTRAINT "FK_a61b50db0c2d681fc37818bdcb1" FOREIGN KEY ("manager_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_47a85e49fe068cc6303841c463c" FOREIGN KEY ("type_code") REFERENCES "code"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_test" ADD CONSTRAINT "FK_64b52e53aee3c9f77fccaf6ecd8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_test" ADD CONSTRAINT "FK_15246b54cf94b34db9152902171" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_e1bacfd2d54255e939f49290d81" FOREIGN KEY ("project_code") REFERENCES "code"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task_work" ADD CONSTRAINT "FK_61474acf4e1f713202ef84dd076" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task_work" ADD CONSTRAINT "FK_e8134c24f8f0ef82314422f47d8" FOREIGN KEY ("timesheet_id") REFERENCES "task_timesheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_teams_user_team" ADD CONSTRAINT "FK_74dbad62b5fd384aa05c9222bbd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_teams_user_team" ADD CONSTRAINT "FK_edc18edef49726f2bcd92375302" FOREIGN KEY ("user_team_id") REFERENCES "user_team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" ADD CONSTRAINT "FK_13b1fbb8fa6a4fe5176e5403259" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks_task" ADD CONSTRAINT "FK_0ffc26f2edc4c6200c9c2ae46f1" FOREIGN KEY ("user_task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_tasks_task" DROP CONSTRAINT "FK_0ffc26f2edc4c6200c9c2ae46f1"`);
    await queryRunner.query(`ALTER TABLE "user_tasks_task" DROP CONSTRAINT "FK_13b1fbb8fa6a4fe5176e5403259"`);
    await queryRunner.query(`ALTER TABLE "user_teams_user_team" DROP CONSTRAINT "FK_edc18edef49726f2bcd92375302"`);
    await queryRunner.query(`ALTER TABLE "user_teams_user_team" DROP CONSTRAINT "FK_74dbad62b5fd384aa05c9222bbd"`);
    await queryRunner.query(`ALTER TABLE "task_work" DROP CONSTRAINT "FK_e8134c24f8f0ef82314422f47d8"`);
    await queryRunner.query(`ALTER TABLE "task_work" DROP CONSTRAINT "FK_61474acf4e1f713202ef84dd076"`);
    await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_e1bacfd2d54255e939f49290d81"`);
    await queryRunner.query(`ALTER TABLE "question_test" DROP CONSTRAINT "FK_15246b54cf94b34db9152902171"`);
    await queryRunner.query(`ALTER TABLE "question_test" DROP CONSTRAINT "FK_64b52e53aee3c9f77fccaf6ecd8"`);
    await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_47a85e49fe068cc6303841c463c"`);
    await queryRunner.query(`ALTER TABLE "user_team" DROP CONSTRAINT "FK_a61b50db0c2d681fc37818bdcb1"`);
    await queryRunner.query(`ALTER TABLE "day_off" DROP CONSTRAINT "FK_b5228f6b8dc9eaefe69cedd5cfc"`);
    await queryRunner.query(`ALTER TABLE "day_off" DROP CONSTRAINT "FK_3c8b1638fcbbd6259a955c2b538"`);
    await queryRunner.query(`ALTER TABLE "day_off" DROP CONSTRAINT "FK_8589c81f413483e9ef5384dcfa8"`);
    await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_9fa0e75d075fbf1fcc57bdcc7f6"`);
    await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_e53fc837a6287a601e370691e30"`);
    await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_276896d1a1a30be6de9d7d43f53"`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_b925754780ce53c20179d7204f9"`);
    await queryRunner.query(`ALTER TABLE "task_timesheet" DROP CONSTRAINT "FK_267f1f62058296378129e0c013c"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "manager_id"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_0ffc26f2edc4c6200c9c2ae46f"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_13b1fbb8fa6a4fe5176e540325"`);
    await queryRunner.query(`DROP TABLE "user_tasks_task"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_edc18edef49726f2bcd9237530"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_74dbad62b5fd384aa05c9222bb"`);
    await queryRunner.query(`DROP TABLE "user_teams_user_team"`);
    await queryRunner.query(`DROP TABLE "task_work"`);
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TABLE "question_test"`);
    await queryRunner.query(`DROP TABLE "question"`);
    await queryRunner.query(`DROP TABLE "user_team"`);
    await queryRunner.query(`DROP TABLE "day_off"`);
    await queryRunner.query(`DROP TABLE "booking"`);
    await queryRunner.query(`DROP TABLE "task_timesheet"`);
  }
}
