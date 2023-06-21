import type {EditUserRequestBody} from "./EditUserRequestBody.js";
import {EditUserPayload} from "../users_service/EditUserPayload.js";
import {plainToClass} from "class-transformer";

export default function payloadifyEditUserRequestBody(
	editUserRequestBody: EditUserRequestBody
): EditUserPayload {
	return plainToClass(EditUserPayload, {
		...editUserRequestBody,
	});
}
