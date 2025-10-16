import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import {User} from '../users/user.model';
import {UsersService} from '../users/users.service';

import {JwtService} from './jwt.service';
import {TokenResponse} from './types';
@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	public async register(username: string, password: string): Promise<User> {
		const existingUser = await this.usersService.findByUsername(username);
		if (existingUser) {
			throw new BadRequestException('Username already in use');
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		return this.usersService.create({
			username,
			password: hashedPassword,
		});
	}

	public async login(
		username: string,
		password: string,
	): Promise<TokenResponse> {
		const user = await this.usersService.findByUsername(username);
		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid credentials');
		}

		return this.jwtService.sign(user.id);
	}

	public refreshToken(userId: number): TokenResponse {
		return this.jwtService.sign(userId);
	}
}
