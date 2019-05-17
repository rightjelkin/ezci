import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

// TODO: accept logger and event dispatcher
// import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
// import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Script } from '../models/Script';
import { ProjectRepository } from '../repositories/ProjectRepository';
import { ScriptRepository } from '../repositories/ScriptRepository';

@Service()
export class ScriptService {

    constructor(
        @OrmRepository() private scriptRepository: ScriptRepository,
        @OrmRepository() private projectRepository: ProjectRepository
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

}
