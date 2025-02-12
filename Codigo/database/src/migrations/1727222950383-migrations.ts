import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1727222950383 implements MigrationInterface {
    name = 'Migrations1727222950383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "family" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "biography" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "record" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "exams" SET DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "treatments" SET DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "surgeries" SET DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "surgeries" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "treatments" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "exams" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "record" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "biography" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "family" DROP DEFAULT`);
    }

}
