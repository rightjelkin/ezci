import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateScriptTable1558128350888 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'script',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true,
                    isNullable: false,
                }, {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                    isUnique: true,
                }, {
                    name: 'script',
                    type: 'jsonb',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'project_id',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                },
            ],
        });
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('script');
    }

}
