import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeExam1728841918770 implements MigrationInterface {
    name = 'ChangeExam1728841918770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exam" DROP COLUMN "custom"`);
        await queryRunner.query(`ALTER TABLE "exam" ALTER COLUMN "reference" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "exam" ALTER COLUMN "results" SET DEFAULT CAST('[]' AS jsonb)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exam" ALTER COLUMN "results" SET DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "exam" ALTER COLUMN "reference" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "exam" ADD "custom" boolean DEFAULT true`);
    }

}
