import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {GameWorldDefinition} from '../config/model/game-world-definition.config';
import {RuntimeConfig} from '../config/runtime.config';

import {GameWorldPerUser} from './model/game-world-per-user.model';
import {GameWorldsList, UserGameWorld, UserGameWorldsList} from './types';

@Injectable()
export class GameWorldsListService {
	constructor(
		private readonly runtimeConfig: RuntimeConfig,
		@InjectRepository(GameWorldPerUser)
		private readonly gameWorldPerUserRepository: Repository<GameWorldPerUser>,
	) {}

	public getAllWorlds(): GameWorldsList {
		return this.runtimeConfig.gameWorlds.map(singleWorld => {
			return {
				id: singleWorld.id,
				publicURL: singleWorld.publicURL,
			};
		});
	}

	public getWorldById(worldId: string): GameWorldDefinition | undefined {
		return this.runtimeConfig.gameWorlds.find(
			worldDetails => worldDetails.id === worldId,
		);
	}

	public async getUserWorlds(userId: number): Promise<UserGameWorldsList> {
		const allWorlds = this.getAllWorlds();
		const userWorlds = await this.gameWorldPerUserRepository.findBy({
			userId: userId,
		});

		return userWorlds
			.map(singleUserWorld => {
				const worldInfo = allWorlds.find(
					singleWorld => singleWorld.id === singleUserWorld.worldId,
				);

				if (!worldInfo) {
					return undefined;
				}

				return {
					...worldInfo,
					habitatId: singleUserWorld.habitatId,
				};
			})
			.filter(
				(userWorld): userWorld is UserGameWorld => userWorld !== undefined,
			);
	}
}
