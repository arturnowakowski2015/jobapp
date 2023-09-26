import { MigrationInterface, QueryRunner } from "typeorm";

export class addStatusColumnToJobs1674835632372 implements MigrationInterface {
    name = 'addStatusColumnToJobs1674835632372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_job" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "title" varchar NOT NULL, "shortDescription" varchar NOT NULL, "longDescription" varchar NOT NULL, "logo" varchar NOT NULL, "companyName" varchar NOT NULL, "status" varchar NOT NULL DEFAULT ('OPEN'))`);
        await queryRunner.query(`INSERT INTO "temporary_job"("id", "createdAt", "updatedAt", "title", "shortDescription", "longDescription", "logo", "companyName") SELECT "id", "createdAt", "updatedAt", "title", "shortDescription", "longDescription", "logo", "companyName" FROM "job"`);
        await queryRunner.query(`DROP TABLE "job"`);
        await queryRunner.query(`ALTER TABLE "temporary_job" RENAME TO "job"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" RENAME TO "temporary_job"`);
        await queryRunner.query(`CREATE TABLE "job" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "title" varchar NOT NULL, "shortDescription" varchar NOT NULL, "longDescription" varchar NOT NULL, "logo" varchar NOT NULL, "companyName" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "job"("id", "createdAt", "updatedAt", "title", "shortDescription", "longDescription", "logo", "companyName") SELECT "id", "createdAt", "updatedAt", "title", "shortDescription", "longDescription", "logo", "companyName" FROM "temporary_job"`);
        await queryRunner.query(`DROP TABLE "temporary_job"`);
    }

}
