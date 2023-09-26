import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAppliedJobsIds1684015228179 implements MigrationInterface {
    name = 'AddAppliedJobsIds1684015228179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_candidate" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "position" varchar NOT NULL, "shortDescription" varchar NOT NULL, "longDescription" varchar NOT NULL, "logo" varchar NOT NULL, "companyName" varchar NOT NULL, "appliedToJobId" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_candidate"("id", "createdAt", "updatedAt", "name", "position", "shortDescription", "longDescription", "logo", "companyName") SELECT "id", "createdAt", "updatedAt", "name", "position", "shortDescription", "longDescription", "logo", "companyName" FROM "candidate"`);
        await queryRunner.query(`DROP TABLE "candidate"`);
        await queryRunner.query(`ALTER TABLE "temporary_candidate" RENAME TO "candidate"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "candidate" RENAME TO "temporary_candidate"`);
        await queryRunner.query(`CREATE TABLE "candidate" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "position" varchar NOT NULL, "shortDescription" varchar NOT NULL, "longDescription" varchar NOT NULL, "logo" varchar NOT NULL, "companyName" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "candidate"("id", "createdAt", "updatedAt", "name", "position", "shortDescription", "longDescription", "logo", "companyName") SELECT "id", "createdAt", "updatedAt", "name", "position", "shortDescription", "longDescription", "logo", "companyName" FROM "temporary_candidate"`);
        await queryRunner.query(`DROP TABLE "temporary_candidate"`);
    }

}
