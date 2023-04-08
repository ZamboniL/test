import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1681013244078 implements MigrationInterface {
    name = 'Initial1681013244078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction_type" ("id" integer NOT NULL, "description" character varying NOT NULL, "signal" character varying(1) NOT NULL, CONSTRAINT "PK_e4e15bcea926d360cfeea703c36" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "product" character varying NOT NULL, "price" character varying NOT NULL, "seller" character varying NOT NULL, "typeId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`INSERT INTO transaction_type VALUES (1, 'Venda produtor', '+'), (2, 'Venda afiliado', '+'), (3, 'Comissão paga', '-'), (4, 'Comissão recebida', '+')`)
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_45f62a7f98171c11f05253040bb" FOREIGN KEY ("typeId") REFERENCES "transaction_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_45f62a7f98171c11f05253040bb"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "transaction_type"`);
    }

}
