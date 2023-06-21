import {IsNotEmpty, IsString} from "class-validator";

export class EditUserRequestBody {
	@IsNotEmpty()
	@IsString()
	public readonly username!: string;

	@IsNotEmpty()
	@IsString()
	public readonly avatarUrl!: string;
}
