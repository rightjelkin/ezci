import { HttpError } from 'routing-controllers';

export class ScriptOrProjectNotFoundError extends HttpError {
    constructor() {
        super(404, 'Project or script not found by provided ids');
    }
}
