import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatingAdditionalFields1731534641137 implements MigrationInterface {
    name = 'CreatingAdditionalFields1731534641137';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "medicine" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "usage" character varying NOT NULL, CONSTRAINT "PK_b9e0e6f37b7cadb5f402390928b" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(`ALTER TABLE "pacient" ADD "diagnostic" character varying(240)`);
        await queryRunner.query(`ALTER TABLE "pacient" ADD "conduct" character varying(240)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "conduct"`);
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "diagnostic"`);
        await queryRunner.query(`DROP TABLE "medicine"`);
    }
}
