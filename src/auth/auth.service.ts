import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {User} from '../users/user.entity';
import {UsersService} from '../users/users.service';

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

		const token = this.jwtService.sign({id: user.id});
		return {access_token: token};
	}
}
