import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {SecurityConfigModule} from '../config/security-config.module';

import {GameWorldsListService} from './game-worlds-list.service';
import {GameWorldsController} from './game-worlds.controller';
import {GameWorldPerUser} from './model/game-world-per-user.model';

@Module({
	controllers: [GameWorldsController],
	providers: [GameWorldsListService],
	imports: [SecurityConfigModule, TypeOrmModule.forFeature([GameWorldPerUser])],
})
export class GameWorldsModule {}
