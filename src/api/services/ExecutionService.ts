import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

// TODO: accept logger and event dispatcher
// import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
// import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Execution } from '../models/Execution';
import { ExecutionRepository } from '../repositories/ExecutionRepository';

@Service()
export class ExecutionService {

    constructor(
        @OrmRepository() private executionRepository: ExecutionRepository
        // TODO: line 5
        // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        // @Logger(__filename) private log: LoggerInterface
    ) { }

    public read(id: number): Promise<Execution | undefined> {
        return this.executionRepository.findOne({ id });
    }
}
