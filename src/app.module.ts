import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {DatabaseConfig} from './config/model/database.config';
import {SecurityConfigModule} from './config/security-config.module';
import {UsersModule} from './users/users.module';

@Module({
	imports: [
		AuthModule,
		UsersModule,
		SecurityConfigModule,
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const databaseConfiguration =
					configService.get<DatabaseConfig>('database');

				return databaseConfiguration as TypeOrmModuleOptions;
			},
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
