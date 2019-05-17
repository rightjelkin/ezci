import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Script } from './Script';

@Entity()
export class Project {

    @PrimaryColumn('uuid')
    public uid: string;

    @IsNotEmpty()
    @Column()
    public name: string;

    @IsNotEmpty()
    @Column()
    public cwd: string;

    @IsNotEmpty()
    @Column()
    public privateKey: string;

    @IsNotEmpty()
    @Column()
    public host: string;

    @IsNotEmpty()
    @Column()
    public user: string;

    @OneToMany(type => Script, script => script.project)
    public scripts: Script[];

    public toString(): string {
        return `${this.uid} ${this.name}`;
    }

}
