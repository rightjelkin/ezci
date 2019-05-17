import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

// TODO: accept logger and event dispatcher
// import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
// import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Project } from '../models/Project';
import { ProjectRepository } from '../repositories/ProjectRepository';

@Service()
export class ProjectService {

    constructor(
        @OrmRepository() private projectRepository: ProjectRepository
        // TODO: line 5
        // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        // @Logger(__filename) private log: LoggerInterface
    ) { }

    public readAll(): Promise<Project[]> {
        return this.projectRepository.find({ relations: ['scripts'] });
    }

    public read(uid: string): Promise<Project | undefined> {
        return this.projectRepository.findOne({ uid });
    }

    public async create(project: Project): Promise<Project> {
        project.uid = uuid.v1();
        const newProject = await this.projectRepository.save(project);
        return newProject;
    }

    public update(uid: string, project: Project): Promise<Project> {
        project.uid = uid;
        return this.projectRepository.save(project);
    }

    public async delete(uid: string): Promise<any> {
        return this.projectRepository.delete(uid);
    }

}
