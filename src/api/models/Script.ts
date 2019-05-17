import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Execution } from './Execution';
import { Project } from './Project';

@Entity()
export class Script {

    @PrimaryGeneratedColumn()
    public id: number;

    @IsNotEmpty()
    @Column()
    public name: string;

    @IsNotEmpty()
    @Column({ type: 'jsonb', nullable: false })
    public script: any;

    @OneToMany(type => Execution, execution => execution.script)
    public executions: Execution[];

    @Column({
        name: 'project_id',
        nullable: false,
    })
    public projectId: string;

    @ManyToOne(type => Project, project => project.scripts)
    @JoinColumn({ name: 'project_id' })
    public project: Project;

    public toString(): string {
        return `${this.name}`;
    }

}
