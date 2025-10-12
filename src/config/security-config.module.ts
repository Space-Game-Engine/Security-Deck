import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';

import config from './config-parser';
import {RuntimeConfig} from './runtime.config';
import {validate} from './validate';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validate: validate,
			load: [config],
		}),
	],
	providers: [
		{
			provide: RuntimeConfig,
			inject: [ConfigService],
			useFactory: (configService: ConfigService): RuntimeConfig | undefined => {
				return configService.get<RuntimeConfig>('runtime');
			},
		},
	],
	exports: [RuntimeConfig],
})
export class SecurityConfigModule {}
