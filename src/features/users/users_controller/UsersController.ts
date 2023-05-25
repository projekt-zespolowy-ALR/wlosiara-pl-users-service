import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	ParseUUIDPipe,
	Post,
	Query,
	ValidationPipe,
} from "@nestjs/common";
import UsersService from "../users_service/UsersService.js";
import PagingOptions from "../../../paging/PagingOptions.js";
import type Page from "../../../paging/Page.js";
import type User from "./User.js";
import UsersServiceUserWithGivenIdNotFoundError from "../users_service/UsersServiceUserWithGivenIdNotFoundError.js";
import CreateUserRequestBody from "./CreateUserRequestBody.js";
import payloadifyCreateUserRequestBody from "./payloadifyCreateUserRequestBody.js";

@Controller("/")
export default class UsersController {
	private readonly usersService: UsersService;
	public constructor(usersService: UsersService) {
		this.usersService = usersService;
	}
	@Get("/users")
	public async getUsers(
		@Query(
			new ValidationPipe({
				transform: true, // Transform to instance of PagingOptions
				whitelist: true, // Do not put other query parameters into the object
			})
		)
		pagingOptions: PagingOptions
	): Promise<Page<User>> {
		return await this.usersService.getUsers(pagingOptions);
	}

	@Get("/users/:userId")
	public async getUserById(
		@Param(
			"userId",
			new ParseUUIDPipe({
				version: "4",
			})
		)
		userId: string
	): Promise<User> {
		try {
			const targetUser = await this.usersService.getUserById(userId);
			return targetUser;
		} catch (error) {
			if (error instanceof UsersServiceUserWithGivenIdNotFoundError) {
				throw new NotFoundException(`User with id "${userId}" not found`);
			}
			throw error;
		}
	}

	@Post("/users")
	public async createUser(
		@Body(
			new ValidationPipe({
				transform: true, // Transform to instance of CreateCatRequestBody
				whitelist: true, // Do not allow other properties than those defined in CreateCatRequestBody
				forbidNonWhitelisted: true, // Throw an error if other properties than those defined in CreateCatRequestBody are present
			})
		)
		createUserRequestBody: CreateUserRequestBody
	): Promise<User> {
		return await this.usersService.createUser(
			payloadifyCreateUserRequestBody(createUserRequestBody)
		);
	}
}
