import {plainToClass} from "class-transformer";
import User from "../users_controller/User.js";
import type UserEntity from "./UserEntity.js";

export default function deentityifyUserEntity(userEntity: UserEntity): User {
	return plainToClass(User, {
		avatarUrl: userEntity.avatarUrl,
		username: userEntity.username,
		id: userEntity.id,
	});
}
