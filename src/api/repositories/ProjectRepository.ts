import { EntityRepository, Repository } from 'typeorm';

import { Project } from '../models/Project';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project>  {

}
