import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "users"})
export default class UserEntity {
	@PrimaryGeneratedColumn("uuid", {name: "id"})
	public readonly id!: string;

	@Column({name: "username", type: "text"})
	public readonly username!: string;

	@Column({name: "avatar_url", type: "text"})
	public readonly avatarUrl!: string;
}
