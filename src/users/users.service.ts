import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {User} from './user.model';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	public async create(data: Partial<User>): Promise<User> {
		return this.userRepository.save(data);
	}

	public async findByUsername(username: string): Promise<User | null> {
		return this.userRepository.findOne({where: {username}});
	}
}
