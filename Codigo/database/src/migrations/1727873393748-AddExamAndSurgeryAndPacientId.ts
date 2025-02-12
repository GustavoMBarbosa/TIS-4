import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExamAndSurgeryAndPacientId1727873393748 implements MigrationInterface {
    name = 'AddExamAndSurgeryAndPacientId1727873393748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "receipt" DROP CONSTRAINT "FK_b84be8a3ce9e4d99162644a7468"`);
        await queryRunner.query(`ALTER TABLE "surgery" DROP CONSTRAINT "FK_7db0d49c0e89d14d0e6dc97ce40"`);
        await queryRunner.query(`ALTER TABLE "receipt" RENAME COLUMN "pacientId" TO "pacient_id"`);
        await queryRunner.query(`ALTER TABLE "surgery" RENAME COLUMN "pacientId" TO "pacient_id"`);
        await queryRunner.query(`CREATE TABLE "exam" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(500) NOT NULL, "reference" character varying NOT NULL, "custom" boolean DEFAULT true, "results" jsonb DEFAULT '[]', "pacient_id" uuid, CONSTRAINT "PK_56071ab3a94aeac01f1b5ab74aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "exams"`);
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "surgeries"`);
        await queryRunner.query(`ALTER TABLE "receipt" ADD CONSTRAINT "FK_9a7b17dea79ec0949153bbfd8cd" FOREIGN KEY ("pacient_id") REFERENCES "pacient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exam" ADD CONSTRAINT "FK_38a8aff7e7fc2eb030752de7b5b" FOREIGN KEY ("pacient_id") REFERENCES "pacient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "surgery" ADD CONSTRAINT "FK_5bc0a24181c5c39e041dcf3dd56" FOREIGN KEY ("pacient_id") REFERENCES "pacient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "surgery" DROP CONSTRAINT "FK_5bc0a24181c5c39e041dcf3dd56"`);
        await queryRunner.query(`ALTER TABLE "exam" DROP CONSTRAINT "FK_38a8aff7e7fc2eb030752de7b5b"`);
        await queryRunner.query(`ALTER TABLE "receipt" DROP CONSTRAINT "FK_9a7b17dea79ec0949153bbfd8cd"`);
        await queryRunner.query(`ALTER TABLE "pacient" ADD "surgeries" jsonb DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "pacient" ADD "exams" jsonb DEFAULT '[]'`);
        await queryRunner.query(`DROP TABLE "exam"`);
        await queryRunner.query(`ALTER TABLE "surgery" RENAME COLUMN "pacient_id" TO "pacientId"`);
        await queryRunner.query(`ALTER TABLE "receipt" RENAME COLUMN "pacient_id" TO "pacientId"`);
        await queryRunner.query(`ALTER TABLE "surgery" ADD CONSTRAINT "FK_7db0d49c0e89d14d0e6dc97ce40" FOREIGN KEY ("pacientId") REFERENCES "pacient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "receipt" ADD CONSTRAINT "FK_b84be8a3ce9e4d99162644a7468" FOREIGN KEY ("pacientId") REFERENCES "pacient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
