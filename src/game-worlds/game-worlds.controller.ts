import {Controller, Get, Request} from '@nestjs/common';

import {GameWorldsListService} from './game-worlds-list.service';
import type {GameWorldsList, UserGameWorldsList} from './types';

@Controller('game-worlds')
export class GameWorldsController {
	constructor(private readonly gameWorldsList: GameWorldsListService) {}
	@Get('user-list')
	public userList(@Request() req): Promise<UserGameWorldsList> {
		const userId = req.user.userId;

		return this.gameWorldsList.getUserWorlds(userId);
	}

	@Get('all')
	public getAllWorlds(): GameWorldsList {
		return this.gameWorldsList.getAllWorlds();
	}
}
