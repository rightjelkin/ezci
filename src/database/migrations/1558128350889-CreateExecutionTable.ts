import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateExecutionTable1558128350889 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'execution',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true,
                    isNullable: false,
                }, {
                    name: 'timestamp',
                    type: 'timestamp',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'outs',
                    type: 'jsonb',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'script_id',
                    type: 'serial',
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
