import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1727222504773 implements MigrationInterface {
    name = 'Migrations1727222504773'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "birthDate" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacient" ALTER COLUMN "birthDate" SET NOT NULL`);
    }

}
