import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1727221855513 implements MigrationInterface {
    name = 'Migrations1727221855513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "familyData"`);
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "birthdate"`);
        await queryRunner.query(`ALTER TABLE "surgery" DROP COLUMN "surgeryDate"`);
        await queryRunner.query(`ALTER TABLE "pacient" ADD "birthDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."pacient_ascendant_enum" AS ENUM('aries', 'taurus', 'gemini', 'leo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces', 'virgo', 'cancer')`);
        await queryRunner.query(`ALTER TABLE "pacient" ADD "ascendant" "public"."pacient_ascendant_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pacient" ADD "birthPlace" character varying(500)`);
        await queryRunner.query(`CREATE TYPE "public"."pacient_marritalstatus_enum" AS ENUM('married', 'divorced', 'separed', 'single', 'widower')`);
        await queryRunner.query(`ALTER TABLE "pacient" ADD "marritalStatus" "public"."pacient_marritalstatus_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pacient" ADD "indication" character varying(240)`);
        await queryRunner.query(`ALTER TABLE "pacient" ADD "family" jsonb`);
        await queryRunner.query(`ALTER TABLE "pacient" ADD "surgeries" jsonb`);
        await queryRunner.query(`ALTER TABLE "surgery" ADD "date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "surgery" ADD "appraisal" character varying`);
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "cpf" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "cpf" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "surgery" DROP COLUMN "appraisal"`);
        await queryRunner.query(`ALTER TABLE "surgery" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "surgeries"`);
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "family"`);
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "indication"`);
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "marritalStatus"`);
        await queryRunner.query(`DROP TYPE "public"."pacient_marritalstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "birthPlace"`);
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "ascendant"`);
        await queryRunner.query(`DROP TYPE "public"."pacient_ascendant_enum"`);
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "birthDate"`);
        await queryRunner.query(`ALTER TABLE "surgery" ADD "surgeryDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pacient" ADD "birthdate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pacient" ADD "familyData" jsonb`);
    }

}
