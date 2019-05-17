import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddScriptRelationToExecutionTable1558128350891 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_script_execution',
        columnNames: ['script_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'script',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('execution', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('execution', this.tableForeignKey);
    }

}
