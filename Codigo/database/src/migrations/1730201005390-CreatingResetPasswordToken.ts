import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatingResetPasswordToken1730201005390 implements MigrationInterface {
    name = 'CreatingResetPasswordToken1730201005390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "resetToken" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "resetTokenExpiresAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "resetTokenExpiresAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "resetToken"`);
    }

}
