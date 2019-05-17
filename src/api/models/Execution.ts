import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Script } from './Script';

@Entity()
export class Execution {

    @PrimaryGeneratedColumn()
    public id: number;

    @IsNotEmpty()
    @Column()
    public timestamp: string;

    @IsNotEmpty()
    @Column({ type: 'jsonb', nullable: false })
    public outs: any;

    @ManyToOne(type => Script, script => script.executions)
    @JoinColumn({ name: 'script_id' })
    public script: Script;

    public toString(): string {
        return `${this.id}`;
    }

}
