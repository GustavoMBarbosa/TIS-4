import { MigrationInterface, QueryRunner } from "typeorm";

export class CreationOfTreatmentTable1729079607105 implements MigrationInterface {
    name = 'CreationOfTreatmentTable1729079607105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "treatment" ("id" SERIAL NOT NULL, "element" character varying NOT NULL, "spiritual" double precision NOT NULL, "sensorial" double precision NOT NULL, "rhythmic" double precision NOT NULL, "motor" double precision NOT NULL, "mental" double precision NOT NULL, "custom" boolean NOT NULL, "pacient_id" uuid, CONSTRAINT "PK_5ed256f72665dee35f8e47b416e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pacient" DROP COLUMN "treatments"`);
        await queryRunner.query(`ALTER TABLE "exam" ALTER COLUMN "results" SET DEFAULT CAST('[]' AS jsonb)`);
        await queryRunner.query(`ALTER TABLE "treatment" ADD CONSTRAINT "FK_a4c706dcd692f8127e6f48e5024" FOREIGN KEY ("pacient_id") REFERENCES "pacient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "treatment" DROP CONSTRAINT "FK_a4c706dcd692f8127e6f48e5024"`);
        await queryRunner.query(`ALTER TABLE "exam" ALTER COLUMN "results" SET DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "pacient" ADD "treatments" jsonb DEFAULT '[]'`);
        await queryRunner.query(`DROP TABLE "treatment"`);
    }

}
