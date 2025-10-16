import {IsOptional, IsString} from 'class-validator';

export class GameWorldDefinition {
	@IsString()
	public id: string;

	@IsString()
	public internalURL: string;

	@IsString()
	public publicURL: string;

	@IsString()
	@IsOptional()
	public authKey?: string;
}
