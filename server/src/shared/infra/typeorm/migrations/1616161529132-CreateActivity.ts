import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateActivity1616161529132 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'activities',
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
            name: 'requesterId',
            type: 'uuid',
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
            columnNames: ['requesterId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'activities_responsibles_users',
        columns: [
          {
            name: 'activitiesId',
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
            columnNames: ['activitiesId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'activities',
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

    await queryRunner.createTable(
      new Table({
        name: 'activities_cities_cities',
        columns: [
          {
            name: 'activitiesId',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'citiesId',
            type: 'uuid',
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['activitiesId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'activities',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['citiesId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cities',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('activities_responsibles_users');
    await queryRunner.dropTable('activities_cities_cities');
    await queryRunner.dropTable('activities');
  }
}
