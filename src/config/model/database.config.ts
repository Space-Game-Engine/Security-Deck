import {IsBoolean, IsString} from 'class-validator';
import * as typeorm from 'typeorm';

import {User} from '../../users/user.entity';

export class DatabaseConfig {
	@IsString()
	public type: typeorm.DatabaseType;

	@IsString()
	public host?: string;

	@IsString()
	public port?: string;

	@IsString()
	public username?: string;

	@IsString()
	public password?: string;

	@IsString()
	public database: string;

	@IsBoolean()
	public synchronize: boolean;

	public get entities(): object[] {
		return [User];
	}
}
