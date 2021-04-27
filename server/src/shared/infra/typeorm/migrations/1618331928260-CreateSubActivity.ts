import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSubActivity1618331928260
implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sub_activities',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'deadline',
            type: 'date',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['requested', 'pending', 'finished'],
            isNullable: true,
          },
          {
            name: 'activityId',
            type: 'uuid',
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
            columnNames: ['activityId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'activities',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'sub_activities_responsibles_users',
        columns: [
          {
            name: 'subActivitiesId',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'usersId',
            type: 'uuid',
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['subActivitiesId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'sub_activities',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['usersId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sub_activities_responsibles_users');
    await queryRunner.dropTable('sub_activities');
  }
}
