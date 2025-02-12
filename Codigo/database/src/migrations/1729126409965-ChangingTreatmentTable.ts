import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangingTreatmentTable1729126409965 implements MigrationInterface {
	name = 'ChangingTreatmentTable1729126409965';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "treatment" DROP COLUMN "spiritual"`);
		await queryRunner.query(`ALTER TABLE "treatment" ADD "spiritual" character varying`);
		await queryRunner.query(`ALTER TABLE "treatment" DROP COLUMN "sensorial"`);
		await queryRunner.query(`ALTER TABLE "treatment" ADD "sensorial" character varying`);
		await queryRunner.query(`ALTER TABLE "treatment" DROP COLUMN "rhythmic"`);
		await queryRunner.query(`ALTER TABLE "treatment" ADD "rhythmic" character varying`);
		await queryRunner.query(`ALTER TABLE "treatment" DROP COLUMN "motor"`);
		await queryRunner.query(`ALTER TABLE "treatment" ADD "motor" character varying`);
		await queryRunner.query(`ALTER TABLE "treatment" DROP COLUMN "mental"`);
		await queryRunner.query(`ALTER TABLE "treatment" ADD "mental" character varying`);
		await queryRunner.query(`ALTER TABLE "treatment" ALTER COLUMN "custom" SET DEFAULT false`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "treatment" ALTER COLUMN "custom" DROP DEFAULT`);
		await queryRunner.query(`ALTER TABLE "treatment" DROP COLUMN "mental"`);
		await queryRunner.query(`ALTER TABLE "treatment" ADD "mental" double precision NOT NULL`);
		await queryRunner.query(`ALTER TABLE "treatment" DROP COLUMN "motor"`);
		await queryRunner.query(`ALTER TABLE "treatment" ADD "motor" double precision NOT NULL`);
		await queryRunner.query(`ALTER TABLE "treatment" DROP COLUMN "rhythmic"`);
		await queryRunner.query(`ALTER TABLE "treatment" ADD "rhythmic" double precision NOT NULL`);
		await queryRunner.query(`ALTER TABLE "treatment" DROP COLUMN "sensorial"`);
		await queryRunner.query(`ALTER TABLE "treatment" ADD "sensorial" double precision NOT NULL`);
		await queryRunner.query(`ALTER TABLE "treatment" DROP COLUMN "spiritual"`);
		await queryRunner.query(`ALTER TABLE "treatment" ADD "spiritual" double precision NOT NULL`);
	}
}
