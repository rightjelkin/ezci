import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProjectTable1558128350887 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'project',
            columns: [
                {
                    name: 'uid',
                    type: 'varchar',
                    length: '255',
                    isPrimary: true,
                    isNullable: false,
                }, {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'cwd',
                    type: 'text',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'host',
                    type: 'varchar',
                    length: '20',
                    isPrimary: false,
                    isNullable: false,
                } , {
                    name: 'user',
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
        await queryRunner.dropTable('project');
    }

}
