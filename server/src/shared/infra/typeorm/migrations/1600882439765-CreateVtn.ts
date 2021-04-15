import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateVtn1600882439765 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vtn',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'year',
            type: 'integer',
          },
          {
            name: 'good',
            type: 'numeric',
            scale: 2,
            precision: 8,
          },
          {
            name: 'regular',
            type: 'numeric',
            scale: 2,
            precision: 8,
          },
          {
            name: 'restricted',
            type: 'numeric',
            scale: 2,
            precision: 8,
          },
          {
            name: 'planted',
            type: 'numeric',
            scale: 2,
            precision: 8,
          },
          {
            name: 'natural',
            type: 'numeric',
            scale: 2,
            precision: 8,
          },
          {
            name: 'preservation',
            type: 'numeric',
            scale: 2,
            precision: 8,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vtn');
  }
}
