import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, type Relation} from "typeorm";
import UserEntity from "./UserEntity.js";

@Entity({name: "user_hair_types"})
export default class UserHairTypeEntity {
	@PrimaryGeneratedColumn("uuid", {name: "id"})
	public readonly id!: string;

	@OneToOne(() => UserEntity, (user) => user.hairType)
	@JoinColumn({referencedColumnName: "id", name: "user_id"})
	public readonly user!: Relation<UserEntity>;

	@Column({name: "is_public", type: "boolean"})
	public readonly isPublic!: boolean;

	@Column({name: "hair_type", type: "text", nullable: true})
	public hairType!: "wysokoporowate" | "srednioporowate" | "niskoporowate" | null;
}
