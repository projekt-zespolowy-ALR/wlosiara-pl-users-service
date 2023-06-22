import {IsBoolean, IsNotEmpty, IsString} from "class-validator";

export default class SetUserHairTypeRequestBody {
	@IsNotEmpty()
	@IsString()
	public readonly hairType!: "wysokoporowate" | "srednioporowate" | "niskoporowate";

	@IsBoolean()
	public readonly isPublic!: boolean;
}
