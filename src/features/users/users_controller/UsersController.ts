import {
	Body,
	Controller,
	Get,
	Delete,
	NotFoundException,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
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
import {EditUserRequestBody} from "./EditUserRequestBody.js";
import SetUserHairTypeRequestBody from "./SetUserHairTypeRequestBody.js";
import type UserHairTypeEntity from "../users_service/UserHairTypeEntity.js";

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

	@Delete("/users/:userId")
	public async deleteUserById(
		@Param(
			"userId",
			new ParseUUIDPipe({
				version: "4",
			})
		)
		userId: string
	): Promise<boolean> {
		try {
			const targetUser = await this.usersService.deleteUserById(userId);
			return targetUser;
		} catch (error) {
			if (error instanceof UsersServiceUserWithGivenIdNotFoundError) {
				throw new NotFoundException(`User with id "${userId}" not found`);
			}
			throw error;
		}
	}
	@Put("/users/:userId")
	public async updateUser(
		@Param(
			"userId",
			new ParseUUIDPipe({
				version: "4",
			})
		)
		userId: string,
		@Body(
			new ValidationPipe({
				transform: true, // Transform to instance of CreateCatRequestBody

				// Do not allow other properties than those defined in CreateCatRequestBody
				whitelist: true,

				// Throw an error if other properties than those defined in CreateCatRequestBody are present
				forbidNonWhitelisted: true,
			})
		)
		editUserRequestBody: EditUserRequestBody
	): Promise<User> {
		return await this.usersService.updateUser(
			userId,
			payloadifyCreateUserRequestBody(editUserRequestBody)
		);
	}
	@Put("/users/:userId/hair-type")
	public async setHairType(
		@Param(
			"userId",
			new ParseUUIDPipe({
				version: "4",
			})
		)
		userId: string,
		@Body(
			new ValidationPipe({
				transform: true, // Transform to instance of CreateCatRequestBody
				whitelist: true, // Do not allow other properties than those defined in CreateCatRequestBody
				forbidNonWhitelisted: true, // Throw an error if other properties than those defined in CreateCatRequestBody are present
			})
		)
		hairType: SetUserHairTypeRequestBody
	): Promise<{
		isPublic: boolean;
		hairType: "wysokoporowate" | "srednioporowate" | "niskoporowate" | null;
	}> {
		try {
			const hairEntity = await this.usersService.setHairType(userId, hairType);
			return hairEntity;
		} catch (error) {
			if (error instanceof UsersServiceUserWithGivenIdNotFoundError) {
				throw new NotFoundException(`User with id "${userId}" not found`);
			}
			throw error;
		}
	}
}
