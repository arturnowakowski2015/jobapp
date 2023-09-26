import { MigrationInterface, QueryRunner } from "typeorm";

export class createBlacklistedCandidatesTable1674736365873 implements MigrationInterface {
    name = 'createBlacklistedCandidatesTable1674736365873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blacklisted_candidate" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "reason" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "blacklisted_candidate"`);
    }

}
