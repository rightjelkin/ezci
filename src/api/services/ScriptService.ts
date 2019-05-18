import Client from 'node-ssh';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { env } from '../../env';
import { Execution } from '../models/Execution';
// TODO: accept logger and event dispatcher
// import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
// import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Script } from '../models/Script';
import { ExecutionRepository } from '../repositories/ExecutionRepository';
import { ProjectRepository } from '../repositories/ProjectRepository';
import { ScriptRepository } from '../repositories/ScriptRepository';

@Service()
export class ScriptService {

    constructor(
        @OrmRepository() private scriptRepository: ScriptRepository,
        @OrmRepository() private projectRepository: ProjectRepository,
        @OrmRepository() private executionRepository: ExecutionRepository
        // TODO: line 3
        // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        // @Logger(__filename) private log: LoggerInterface
    ) { }

    public async readAll(uid: string): Promise<Script[]> {
        const currentProject = await this.projectRepository.findOne({ uid });
        if (currentProject) {
            return this.scriptRepository.find({ where: { projectId: uid } });
        } else {
            return undefined;
        }
    }

    public async read(uid: string, name: string): Promise<Script | undefined> {
        const currentProject = await this.projectRepository.findOne({ uid });
        if (currentProject) {
            return this.scriptRepository.findOne({ where: { projectId: uid, name } });
        } else {
            return undefined;
        }
    }

    public async create(uid: string, script: Script): Promise<Script> {
        console.log(uid);
        script.id = undefined;
        script.projectId = uid;
        const newScript = await this.scriptRepository.save(script);
        return newScript;
    }

    public async update(uid: string, name: string, script: Script): Promise<Script> {
        const currentProject = await this.projectRepository.findOne({ uid });

        if (currentProject) {
            const updatingScript = await this.scriptRepository.findOne({ where: { name } });
            if (updatingScript) {
                script.id = updatingScript.id;
                script.projectId = updatingScript.projectId;
                return this.scriptRepository.save(script);
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }

    public async delete(uid: string, name: string): Promise<any> {
        const currentProject = await this.projectRepository.findOne({ uid });
        if (currentProject) {
            const deletingScript = await this.scriptRepository.findOne({ where: { projectId: uid, name } });
            if (deletingScript) {
                return this.scriptRepository.delete(deletingScript.id);
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }

    public async readExecutions(uid: string, name: string): Promise<any> {
        const currentProject = await this.projectRepository.findOne({ uid });
        if (!currentProject) { return undefined; }
        const currentScript = await this.scriptRepository.findOne({ where: { projectId: currentProject.uid, name } });
        if (!currentScript) { return undefined; }
        return this.executionRepository.find({ where: { scriptId: currentScript.id } });
    }

    public async execute(uid: string, name: string): Promise<any> {
        const currentProject = await this.projectRepository.findOne({ uid });
        if (!currentProject) { return undefined; }
        const currentScript = await this.scriptRepository.findOne({ where: { projectId: currentProject.uid, name } });
        if (!currentScript) { return undefined; }
        const ssh = new Client();
        const outsArray = [];
        const outsJsonb = {};
        await ssh.connect({
            host: currentProject.host,
            username: currentProject.user,
            privateKey: env.keys.private,
        });
        for (const key in currentScript.script) {
            if (!currentScript.script.hasOwnProperty(key)) { continue; }
            const result = await ssh.execCommand(currentScript.script[key]);
            outsArray.push(result);
            outsJsonb[key] = result;
            if (result.stderr !== '') { break; }
        }
        await ssh.dispose();
        const execution = new Execution();
        execution.timestamp = new Date().toISOString();
        execution.outs = outsJsonb;
        execution.scriptId = currentScript.id;
        return this.executionRepository.save(execution);
    }

}
