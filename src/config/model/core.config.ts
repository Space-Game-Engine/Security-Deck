import {Type} from 'class-transformer';
import {ValidateNested} from 'class-validator';

import {RuntimeConfig} from '../runtime.config';

import {DatabaseConfig} from './database.config';
import {JwtConfig} from './jwt.config';

export class CoreConfig {
	@Type(() => DatabaseConfig)
	@ValidateNested()
	public database: DatabaseConfig;

	@Type(() => JwtConfig)
	@ValidateNested()
	public jwt: JwtConfig;

	@Type(() => RuntimeConfig)
	@ValidateNested()
	public runtime: RuntimeConfig;
}
