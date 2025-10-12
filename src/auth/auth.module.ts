import {Module} from '@nestjs/common';
import {APP_GUARD} from '@nestjs/core';
import {JwtModule} from '@nestjs/jwt';

import {UsersModule} from '../users/users.module';

import {jwtExpiration, jwtToken} from './auth.constants';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {JWTAuthGuard} from './guard/jwt.guard';

@Module({
	imports: [
		UsersModule,
		JwtModule.register({
			global: true,
			secret: jwtToken,
			signOptions: {expiresIn: jwtExpiration},
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		JWTAuthGuard,
		{
			provide: APP_GUARD,
			useClass: JWTAuthGuard,
		},
	],
})
export class AuthModule {}
