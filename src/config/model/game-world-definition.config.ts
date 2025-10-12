import {IsString} from 'class-validator';

export class GameWorldDefinition {
	@IsString()
	public id: string;

	@IsString()
	public loginURL: string;

	@IsString()
	public publicURL: string;
}
