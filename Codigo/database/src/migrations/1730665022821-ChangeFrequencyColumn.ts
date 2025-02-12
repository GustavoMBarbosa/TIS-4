import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeFrequencyColumn1730665022821 implements MigrationInterface {
	name = 'ChangeFrequencyColumn1730665022821';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "appointment" RENAME COLUMN "Frequency" TO "frequency"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "appointment" RENAME COLUMN "frequency" TO "Frequency"`);
	}
}
