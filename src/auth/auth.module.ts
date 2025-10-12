import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {APP_GUARD} from '@nestjs/core';
import {JwtModule, JwtModuleOptions} from '@nestjs/jwt';

import {UsersModule} from '../users/users.module';

import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {JWTAuthGuard} from './guard/jwt.guard';

@Module({
	imports: [
		UsersModule,
		ConfigModule,
		JwtModule.registerAsync({
			useFactory: async (
				configService: ConfigService,
			): Promise<JwtModuleOptions> => ({
				secret: configService.get('jwt.secret'),
				signOptions: {
					expiresIn: configService.get('jwt.expiresIn'),
				},
			}),
			inject: [ConfigService],
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
