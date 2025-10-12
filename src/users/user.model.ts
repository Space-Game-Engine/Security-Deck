import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

import {GameWorldPerUser} from '../game-worlds/model/game-world-per-user.model';

@Entity('user')
export class User {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({unique: true})
	public username: string;

	@Column()
	public password: string;

	@OneToMany(() => GameWorldPerUser, gameWorldPerUser => gameWorldPerUser.user)
	public gameWorlds: GameWorldPerUser[];
}
