import {NestFactory} from '@nestjs/core';

import {AppModule} from './app.module';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	await app.listen(process.env.PORT ?? 3010);

	console.log(`App is loaded at ${await app.getUrl()} URL`);
}
bootstrap();
