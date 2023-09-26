import { MigrationInterface, QueryRunner } from "typeorm";

export class createJobTable1674512523626 implements MigrationInterface {
    name = 'createJobTable1674512523626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "job" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "title" varchar NOT NULL, "shortDescription" varchar NOT NULL, "longDescription" varchar NOT NULL, "logo" varchar NOT NULL, "companyName" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "job"`);
    }

}
