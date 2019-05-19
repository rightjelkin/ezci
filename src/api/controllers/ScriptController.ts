import {
    Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put, QueryParam
} from 'routing-controllers';

import { ScriptOrProjectNotFoundError } from '../errors/ScriptOrProjectNotFoundError';
import { Execution } from '../models/Execution';
import { Script } from '../models/Script';
import { ScriptService } from '../services/ScriptService';

@JsonController('/script')
export class ScriptController {

    constructor(
        private scriptService: ScriptService
    ) { }

    @OnUndefined(ScriptOrProjectNotFoundError)
    @Post()
    public create(@Body() script: Script, @QueryParam('uid') uid: string): Promise<Script> {
        return this.scriptService.create(uid, script);
    }

    @OnUndefined(ScriptOrProjectNotFoundError)
    @Get()
    public readAll(@QueryParam('uid') uid: string): Promise<Script[]> {
        return this.scriptService.readAll(uid);
    }

    @OnUndefined(ScriptOrProjectNotFoundError)
    @Get('/byid/:id')
    public readById(@Param('id') id: number): Promise<Script> {
        return this.scriptService.readById(id);
    }

    @OnUndefined(ScriptOrProjectNotFoundError)
    @Get('/:name')
    public read(@QueryParam('uid') uid: string, @Param('name') name: string): Promise<Script> {
        return this.scriptService.read(uid, name);
    }

    @OnUndefined(ScriptOrProjectNotFoundError)
    @Put('/:name')
    public update(@QueryParam('uid') uid: string, @Param('name') name: string, @Body() script: Script): Promise<Script> {
        return this.scriptService.update(uid, name, script);
    }

    @OnUndefined(ScriptOrProjectNotFoundError)
    @Delete('/:name')
    public delete(@QueryParam('uid') uid: string, @Param('name') name: string): Promise<Script> {
        return this.scriptService.delete(uid, name);
    }

    @OnUndefined(ScriptOrProjectNotFoundError)
    @Get('/:name/executions')
    public readExecutions(@QueryParam('uid') uid: string, @Param('name') name: string): Promise<Execution> {
        return this.scriptService.readExecutions(uid, name);
    }

    @OnUndefined(ScriptOrProjectNotFoundError)
    @Post('/:name/execute')
    public execute(@QueryParam('uid') uid: string, @Param('name') name: string): Promise<Script> {
        return this.scriptService.execute(uid, name);
    }
}
