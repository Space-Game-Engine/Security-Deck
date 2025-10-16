import {Inject, Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {GameWorldDefinition} from '../config/model/game-world-definition.config';

import * as apiCallInterface from './api-call/api-call.interface';
import {GameWorldsListService} from './game-worlds-list.service';
import {GameWorldPerUser} from './model/game-world-per-user.model';
import {API_CALL, LoginDetailsResponse, LoginParameters} from './types';

@Injectable()
export class GameWorldAuthService {
	constructor(
		@Inject(API_CALL) private readonly apiCall: apiCallInterface.ApiCall,
		private readonly gameWorldsListService: GameWorldsListService,
		@InjectRepository(GameWorldPerUser)
		private readonly gameWorldPerUserRepository: Repository<GameWorldPerUser>,
	) {}

	public async loginToWorld(
		userId: number,
		worldId: string,
	): Promise<LoginDetailsResponse> {
		const gameWorldDefinition =
			this.gameWorldsListService.getWorldById(worldId);

		if (!gameWorldDefinition) {
			throw new InternalServerErrorException(`Unknown world id "${worldId}"`);
		}

		const userWorldDetails = await this.gameWorldPerUserRepository.findOneBy({
			userId: userId,
			worldId,
		});
		let loginParameters: LoginParameters;

		if (!userWorldDetails) {
			loginParameters = await this.registerUser(userId, gameWorldDefinition);
		} else {
			loginParameters = {
				userId,
				habitatId: userWorldDetails.habitatId,
			};
		}

		return {
			token: await this.loginUser(loginParameters, gameWorldDefinition),
			publicURL: gameWorldDefinition.publicURL,
		};
	}

	private async registerUser(
		userId: number,
		gameWorldDefinition: GameWorldDefinition,
	): Promise<LoginParameters> {
		const loginParameters = await this.apiCall.registerUser(
			userId,
			gameWorldDefinition.internalURL,
			gameWorldDefinition.authKey,
		);

		await this.gameWorldPerUserRepository.save({
			userId: userId,
			habitatId: loginParameters.habitatId,
			worldId: gameWorldDefinition.id,
		});

		return loginParameters;
	}

	private loginUser(
		loginParameters: LoginParameters,
		gameWorldDefinition: GameWorldDefinition,
	): Promise<string> {
		return this.apiCall.loginUser(
			loginParameters,
			gameWorldDefinition.internalURL,
			gameWorldDefinition.authKey,
		);
	}
}
