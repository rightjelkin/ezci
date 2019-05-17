import {
    Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { ProjectNotFoundError } from '../errors/ProjectNotFoundError';
import { Project } from '../models/Project';
import { ProjectService } from '../services/ProjectService';

@JsonController('/project')
export class ProjectController {

    constructor(
        private projectService: ProjectService
    ) { }

    @Post()
    public create(@Body() project: Project): Promise<Project> {
        return this.projectService.create(project);
    }

    @Get()
    public readAll(): Promise<Project[]> {
        return this.projectService.readAll();
    }

    @OnUndefined(ProjectNotFoundError)
    @Get('/:uid')
    public read(@Param('uid') uid: string): Promise<Project> {
        return this.projectService.read(uid);
    }

    @OnUndefined(ProjectNotFoundError)
    @Put('/:uid')
    public update(@Param('uid') uid: string, @Body() project: Project): Promise<Project> {
        return this.projectService.update(uid, project);
    }

    @OnUndefined(ProjectNotFoundError)
    @Delete('/:uid')
    public delete(@Param('uid') uid: string): Promise<Project> {
       return this.projectService.delete(uid);
    }
}
