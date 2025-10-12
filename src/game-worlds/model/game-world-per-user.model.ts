import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

import {User} from '../../users/user.model';

@Entity()
export class GameWorldPerUser {
	@PrimaryGeneratedColumn()
	public id: number;

	@ManyToOne(() => User, user => user.gameWorlds)
	@JoinColumn()
	public user: User;

	@Column()
	public habitatId: number;

	@Column()
	public worldId: string;
}
