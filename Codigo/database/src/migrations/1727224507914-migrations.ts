import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1727224507914 implements MigrationInterface {
    name = 'Migrations1727224507914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "marritalStatus"`);
        await queryRunner.query(`DROP TYPE "public"."pacient_marritalstatus_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."pacient_maritalstatus_enum" AS ENUM('married', 'divorced', 'separed', 'single', 'widower')`);
        await queryRunner.query(`ALTER TABLE "pacient" ADD "maritalStatus" "public"."pacient_maritalstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "pacient" ADD "updatedAt" TIMESTAMP DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "maritalStatus"`);
        await queryRunner.query(`DROP TYPE "public"."pacient_maritalstatus_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."pacient_marritalstatus_enum" AS ENUM('married', 'divorced', 'separed', 'single', 'widower')`);
        await queryRunner.query(`ALTER TABLE "pacient" ADD "marritalStatus" "public"."pacient_marritalstatus_enum"`);
    }

}
