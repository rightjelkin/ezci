import { EntityRepository, Repository } from 'typeorm';

import { Execution } from '../models/Execution';

@EntityRepository(Execution)
export class ExecutionRepository extends Repository<Execution>  {

}
