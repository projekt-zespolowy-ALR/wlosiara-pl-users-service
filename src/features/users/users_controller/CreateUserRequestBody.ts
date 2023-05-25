import {IsNotEmpty, IsString} from "class-validator";

export default class CreateUserRequestBody {
	@IsNotEmpty()
	@IsString()
	public readonly username!: string;

	@IsNotEmpty()
	@IsString()
	public readonly avatarUrl!: string;
}
