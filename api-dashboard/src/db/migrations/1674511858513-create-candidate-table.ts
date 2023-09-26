import { MigrationInterface, QueryRunner } from "typeorm";

export class createCandidateTable1674511858513 implements MigrationInterface {
    name = 'createCandidateTable1674511858513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "candidate" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "position" varchar NOT NULL, "shortDescription" varchar NOT NULL, "longDescription" varchar NOT NULL, "logo" varchar NOT NULL, "companyName" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "candidate"`);
    }

}
