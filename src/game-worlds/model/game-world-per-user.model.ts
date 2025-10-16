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
	@JoinColumn({name: 'userId'})
	public user: User;

	@Column()
	public userId: number;

	@Column()
	public habitatId: number;

	@Column()
	public worldId: string;
}
