import { Get, JsonController, OnUndefined, Param } from 'routing-controllers';

import { ScriptOrProjectNotFoundError } from '../errors/ScriptOrProjectNotFoundError';
import { Execution } from '../models/Execution';
import { ExecutionService } from '../services/ExecutionService';

@JsonController('/execution')
export class ScriptController {

    constructor(
        private executionService: ExecutionService
    ) { }

    @OnUndefined(ScriptOrProjectNotFoundError)
    @Get('/:id')
    public read(@Param('id') id: number): Promise<Execution> {
        return this.executionService.read(id);
    }
}
