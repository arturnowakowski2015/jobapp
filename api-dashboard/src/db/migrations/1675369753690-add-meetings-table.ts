import { MigrationInterface, QueryRunner } from "typeorm";

export class addMeetingsTable1675369753690 implements MigrationInterface {
    name = 'addMeetingsTable1675369753690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meeting" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "date" datetime NOT NULL, "type" varchar NOT NULL, "place" varchar NOT NULL, "candidateId" varchar NOT NULL, "jobId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_meeting" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "date" datetime NOT NULL, "type" varchar NOT NULL, "place" varchar NOT NULL, "candidateId" varchar NOT NULL, "jobId" varchar NOT NULL, CONSTRAINT "FK_058f0d8cdbedd33e7998434c8c5" FOREIGN KEY ("candidateId") REFERENCES "candidate" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_c4075b95bbd2aab3b81bbb7b016" FOREIGN KEY ("jobId") REFERENCES "job" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_meeting"("id", "createdAt", "updatedAt", "date", "type", "place", "candidateId", "jobId") SELECT "id", "createdAt", "updatedAt", "date", "type", "place", "candidateId", "jobId" FROM "meeting"`);
        await queryRunner.query(`DROP TABLE "meeting"`);
        await queryRunner.query(`ALTER TABLE "temporary_meeting" RENAME TO "meeting"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting" RENAME TO "temporary_meeting"`);
        await queryRunner.query(`CREATE TABLE "meeting" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "date" datetime NOT NULL, "type" varchar NOT NULL, "place" varchar NOT NULL, "candidateId" varchar NOT NULL, "jobId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "meeting"("id", "createdAt", "updatedAt", "date", "type", "place", "candidateId", "jobId") SELECT "id", "createdAt", "updatedAt", "date", "type", "place", "candidateId", "jobId" FROM "temporary_meeting"`);
        await queryRunner.query(`DROP TABLE "temporary_meeting"`);
        await queryRunner.query(`DROP TABLE "meeting"`);
    }

}
