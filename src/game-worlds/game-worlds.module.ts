import {HttpModule} from '@nestjs/axios';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {SecurityConfigModule} from '../config/security-config.module';

import {AxiosApiCallService} from './api-call/axios-api-call.service';
import {GameWorldAuthService} from './game-world-auth.service';
import {GameWorldsListService} from './game-worlds-list.service';
import {GameWorldsController} from './game-worlds.controller';
import {GameWorldPerUser} from './model/game-world-per-user.model';
import {API_CALL} from './types';

@Module({
	controllers: [GameWorldsController],
	providers: [
		GameWorldsListService,
		GameWorldAuthService,
		{
			provide: API_CALL,
			useClass: AxiosApiCallService,
		},
	],
	imports: [
		SecurityConfigModule,
		TypeOrmModule.forFeature([GameWorldPerUser]),
		HttpModule,
	],
})
export class GameWorldsModule {}
