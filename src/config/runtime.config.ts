import {Type} from 'class-transformer';
import {ValidateNested} from 'class-validator';

import {GameWorldDefinition} from './model/game-world-definition.config';

export class RuntimeConfig {
	@Type(() => GameWorldDefinition)
	@ValidateNested()
	public gameWorlds: GameWorldDefinition[];
}
