import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeColumnType1727959627482 implements MigrationInterface {
    name = 'ChangeColumnType1727959627482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "evolution" DROP CONSTRAINT "FK_5845e931afef075b17ae083f8bb"`);
        await queryRunner.query(`ALTER TABLE "surgery" DROP CONSTRAINT "FK_7db0d49c0e89d14d0e6dc97ce40"`);
        await queryRunner.query(`ALTER TABLE "receipt" DROP CONSTRAINT "FK_b84be8a3ce9e4d99162644a7468"`);
        await queryRunner.query(`ALTER TABLE "evolution" RENAME COLUMN "pacientId" TO "pacient_id"`);
        await queryRunner.query(`ALTER TABLE "surgery" RENAME COLUMN "pacientId" TO "pacient_id"`);
        await queryRunner.query(`ALTER TABLE "receipt" RENAME COLUMN "pacientId" TO "pacient_id"`);
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "exams"`);
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "surgeries"`);
        await queryRunner.query(`ALTER TABLE "exam" ALTER COLUMN "results" SET DEFAULT CAST('[]' AS jsonb)`);
        await queryRunner.query(`ALTER TABLE "evolution" ADD CONSTRAINT "FK_f2de859ee082f21322e554ecc61" FOREIGN KEY ("pacient_id") REFERENCES "pacient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "surgery" ADD CONSTRAINT "FK_5bc0a24181c5c39e041dcf3dd56" FOREIGN KEY ("pacient_id") REFERENCES "pacient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "receipt" ADD CONSTRAINT "FK_9a7b17dea79ec0949153bbfd8cd" FOREIGN KEY ("pacient_id") REFERENCES "pacient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "receipt" DROP CONSTRAINT "FK_9a7b17dea79ec0949153bbfd8cd"`);
        await queryRunner.query(`ALTER TABLE "surgery" DROP CONSTRAINT "FK_5bc0a24181c5c39e041dcf3dd56"`);
        await queryRunner.query(`ALTER TABLE "evolution" DROP CONSTRAINT "FK_f2de859ee082f21322e554ecc61"`);
        await queryRunner.query(`ALTER TABLE "exam" ALTER COLUMN "results" SET DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "pacient" ADD "surgeries" jsonb DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "pacient" ADD "exams" jsonb DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "receipt" RENAME COLUMN "pacient_id" TO "pacientId"`);
        await queryRunner.query(`ALTER TABLE "surgery" RENAME COLUMN "pacient_id" TO "pacientId"`);
        await queryRunner.query(`ALTER TABLE "evolution" RENAME COLUMN "pacient_id" TO "pacientId"`);
        await queryRunner.query(`ALTER TABLE "receipt" ADD CONSTRAINT "FK_b84be8a3ce9e4d99162644a7468" FOREIGN KEY ("pacientId") REFERENCES "pacient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "surgery" ADD CONSTRAINT "FK_7db0d49c0e89d14d0e6dc97ce40" FOREIGN KEY ("pacientId") REFERENCES "pacient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evolution" ADD CONSTRAINT "FK_5845e931afef075b17ae083f8bb" FOREIGN KEY ("pacientId") REFERENCES "pacient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
