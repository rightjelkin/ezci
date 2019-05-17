import { EntityRepository, Repository } from 'typeorm';

import { Script } from '../models/Script';

@EntityRepository(Script)
export class ScriptRepository extends Repository<Script>  {

}
