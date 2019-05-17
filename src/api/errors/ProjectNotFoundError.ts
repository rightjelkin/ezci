import { HttpError } from 'routing-controllers';

export class ProjectNotFoundError extends HttpError {
    constructor() {
        super(404, 'Project not found!');
    }
}
