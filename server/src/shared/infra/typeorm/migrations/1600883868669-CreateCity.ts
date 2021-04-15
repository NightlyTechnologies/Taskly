import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const cascade = {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
};

export default class CreateCity1600883868669 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cities',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'uf',
            type: 'varchar',
          },
          {
            name: 'avatar_url',
            type: 'varchar',
          },
          {
            name: 'begin_validity',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'final_validity',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'contract_type',
            type: 'enum',
            enum: ['online', 'presential'],
            isNullable: true,
          },
          {
            name: 'contract_value',
            type: 'numeric',
            scale: 2,
            precision: 8,
            isNullable: true,
          },
          {
            name: 'agreement',
            type: 'enum',
            enum: [
              'ok',
              'nonexistent',
              'denounced',
              'unable_worker',
              'unpublished',
            ],
            isNullable: true,
          },
          {
            name: 'mayorId',
            type: 'uuid',
          },
          {
            name: 'taxResponsibleId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'supervisor1Id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'supervisor2Id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'vtn1Id',
            type: 'uuid',
          },
          {
            name: 'vtn2Id',
            type: 'uuid',
          },
          {
            name: 'vtn3Id',
            type: 'uuid',
          },
          {
            name: 'vtn4Id',
            type: 'uuid',
          },
          {
            name: 'vtn5Id',
            type: 'uuid',
          },
          {
            name: 'tasksId',
            type: 'uuid',
            isNullable: true,
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
        foreignKeys: [
          {
            columnNames: ['mayorId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'mayors',
            ...cascade,
          },
          {
            columnNames: ['supervisor1Id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'supervisors',
            ...cascade,
          },
          {
            columnNames: ['supervisor2Id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'supervisors',
            ...cascade,
          },
          {
            columnNames: ['vtn1Id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'vtn',
            ...cascade,
          },
          {
            columnNames: ['vtn2Id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'vtn',
            ...cascade,
          },
          {
            columnNames: ['vtn3Id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'vtn',
            ...cascade,
          },
          {
            columnNames: ['vtn4Id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'vtn',
            ...cascade,
          },
          {
            columnNames: ['vtn5Id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'vtn',
            ...cascade,
          },
          {
            columnNames: ['tasksId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tasks',
            ...cascade,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cities');
  }
}
