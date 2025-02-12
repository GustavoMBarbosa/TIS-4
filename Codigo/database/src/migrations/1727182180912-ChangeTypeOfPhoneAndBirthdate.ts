import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTypeOfPhoneAndBirthdate1727182180912 implements MigrationInterface {
    name = 'ChangeTypeOfPhoneAndBirthdate1727182180912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "birthDate"`);
        await queryRunner.query(`ALTER TABLE "pacient" ADD "birthdate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "pacient" ADD "phone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "pacient" ADD "phone" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "birthdate"`);
        await queryRunner.query(`ALTER TABLE "pacient" ADD "birthDate" TIMESTAMP NOT NULL`);
    }

}
