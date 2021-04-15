import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTasks1600883443327 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'audit1',
            type: 'boolean',
            default: false,
          },
          {
            name: 'audit2',
            type: 'boolean',
            default: false,
          },
          {
            name: 'audit3',
            type: 'boolean',
            default: false,
          },
          {
            name: 'audit4',
            type: 'boolean',
            default: false,
          },
          {
            name: 'audit5',
            type: 'boolean',
            default: false,
          },
          {
            name: 'cafirs',
            type: 'boolean',
            default: false,
          },
          {
            name: 'diffs',
            type: 'boolean',
            default: false,
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
    await queryRunner.dropTable('tasks');
  }
}
