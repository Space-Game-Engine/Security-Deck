import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService as NestJwtService} from '@nestjs/jwt';
import {ExtractJwt} from 'passport-jwt';

import {TokenContent, TokenResponse} from './types';

@Injectable()
export class JwtService {
	constructor(
		private readonly nestJwtService: NestJwtService,
		private readonly configService: ConfigService,
	) {}

	public verifyAsync(token: string): Promise<unknown> {
		return this.nestJwtService.verifyAsync(token, {
			secret: this.configService.get('jwt.secret'),
		});
	}

	public sign(userId: number): TokenResponse {
		return {access_token: this.nestJwtService.sign({userId} as TokenContent)};
	}

	public decode(request: Request): TokenContent | undefined {
		const extractJwt = ExtractJwt.fromAuthHeaderAsBearerToken();

		return this.nestJwtService.decode(extractJwt(request) ?? '');
	}
}
