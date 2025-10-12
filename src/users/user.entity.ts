import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('user')
export class User {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({unique: true})
	public username: string;

	@Column()
	public password: string;
}
