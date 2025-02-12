import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatingFisicalExamColumn1730655727194 implements MigrationInterface {
	name = 'CreatingFisicalExamColumn1730655727194';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_99551ecc47dcbf19d9eb44c9422"`);
		await queryRunner.query(`ALTER TABLE "appointment" RENAME COLUMN "pacientId" TO "pacient_id"`);
		await queryRunner.query(`ALTER TABLE "pacient" ADD "fisical_exam" jsonb DEFAULT '{}'`);
		await queryRunner.query(
			`ALTER TABLE "appointment" ADD CONSTRAINT "FK_e2630ccb9a285f9e146952fdaa5" FOREIGN KEY ("pacient_id") REFERENCES "pacient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_e2630ccb9a285f9e146952fdaa5"`);
		await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "fisical_exam"`);
		await queryRunner.query(`ALTER TABLE "appointment" RENAME COLUMN "pacient_id" TO "pacientId"`);
		await queryRunner.query(
			`ALTER TABLE "appointment" ADD CONSTRAINT "FK_99551ecc47dcbf19d9eb44c9422" FOREIGN KEY ("pacientId") REFERENCES "pacient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}
}
