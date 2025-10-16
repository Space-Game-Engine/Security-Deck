import {Controller, Get, Param, Request} from '@nestjs/common';

import {GameWorldAuthService} from './game-world-auth.service';
import {GameWorldsListService} from './game-worlds-list.service';
import * as gameWorldTypes from './types';

@Controller('game-worlds')
export class GameWorldsController {
	constructor(
		private readonly gameWorldsList: GameWorldsListService,
		private readonly gameWorldAuth: GameWorldAuthService,
	) {}

	@Get('user-list')
	public userList(@Request() req): Promise<gameWorldTypes.UserGameWorldsList> {
		const userId = req.user.userId;

		return this.gameWorldsList.getUserWorlds(userId);
	}

	@Get('all')
	public getAllWorlds(): gameWorldTypes.GameWorldsList {
		return this.gameWorldsList.getAllWorlds();
	}

	@Get('loginToWorld/:worldId')
	public loginToWorld(
		@Param('worldId') worldId: string,
		@Request() req,
	): Promise<gameWorldTypes.LoginDetailsResponse> {
		const userId = req.user.userId;

		return this.gameWorldAuth.loginToWorld(userId, worldId);
	}
}
