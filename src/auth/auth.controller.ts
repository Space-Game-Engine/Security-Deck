import {Body, Controller, Post} from '@nestjs/common';

import {User} from '../users/user.entity';

import {AuthService} from './auth.service';
import {Public} from './decorator/public-path.decorator';
import {TokenResponse} from './types';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post('register')
	public async register(
		@Body('username') username: string,
		@Body('password') password: string,
	): Promise<Omit<User, 'password'>> {
		const registeredUser = await this.authService.register(username, password);

		return {
			id: registeredUser.id,
			username: registeredUser.username,
		};
	}

	@Public()
	@Post('login')
	public async login(
		@Body('username') username: string,
		@Body('password') password: string,
	): Promise<TokenResponse> {
		return this.authService.login(username, password);
	}
}
