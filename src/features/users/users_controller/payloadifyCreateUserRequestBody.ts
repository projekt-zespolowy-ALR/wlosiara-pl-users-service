import type CreateUserRequestBody from "./CreateUserRequestBody.js";
import CreateUserPayload from "../users_service/CreateUserPayload.js";
import {plainToClass} from "class-transformer";

export default function payloadifyCreateUserRequestBody(
	createUserRequestBody: CreateUserRequestBody
): CreateUserPayload {
	return plainToClass(CreateUserPayload, {
		...createUserRequestBody,
	});
}
