import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1727222154367 implements MigrationInterface {
    name = 'Migrations1727222154367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "biologicalSex" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "sign" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "ascendant" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "bloodType" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "marritalStatus" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "marritalStatus" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "bloodType" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "ascendant" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "sign" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "biologicalSex" SET NOT NULL`);
    }

}
