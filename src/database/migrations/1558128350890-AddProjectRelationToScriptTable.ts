import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddProjectRelationToScriptTable1558128350890 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_project_script',
        columnNames: ['project_id'],
        referencedColumnNames: ['uid'],
        referencedTableName: 'project',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('script', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('script', this.tableForeignKey);
    }

}
