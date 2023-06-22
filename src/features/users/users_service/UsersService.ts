import {Injectable} from "@nestjs/common";
import {EntityNotFoundError, Repository} from "typeorm";
import UserEntity from "./UserEntity.js";
import {InjectRepository} from "@nestjs/typeorm";
import type Page from "../../../paging/Page.js";
import type PagingOptions from "../../../paging/PagingOptions.js";
import paginatedFindAndCount from "../../../paging/paginatedFindAndCount.js";
import type User from "../users_controller/User.js";
import deentityifyUserEntity from "./deentityifyUserEntity.js";
import type CreateUserPayload from "./CreateUserPayload.js";
import UsersServiceUserWithGivenIdNotFoundError from "./UsersServiceUserWithGivenIdNotFoundError.js";
import type {EditUserPayload} from "./EditUserPayload.js";
import type SetUserHairTypeRequestBody from "../users_controller/SetUserHairTypeRequestBody.js";
import UserHairTypeEntity from "./UserHairTypeEntity.js";

@Injectable()
export default class UsersService {
	private readonly usersRepository: Repository<UserEntity>;
	private readonly userHairTypeRepository: Repository<UserHairTypeEntity>;
	public constructor(
		@InjectRepository(UserEntity) usersRepository: Repository<UserEntity>,
		@InjectRepository(UserHairTypeEntity) hairTypeRepository: Repository<UserHairTypeEntity>
	) {
		this.usersRepository = usersRepository;
		this.userHairTypeRepository = hairTypeRepository;
	}
	public async getUsers(pagingOptions: PagingOptions): Promise<Page<User>> {
		return (await paginatedFindAndCount(this.usersRepository, pagingOptions)).map(
			deentityifyUserEntity
		);
	}
	public async getUserById(id: string): Promise<User> {
		try {
			return deentityifyUserEntity(await this.usersRepository.findOneByOrFail({id}));
		} catch (error) {
			if (error instanceof EntityNotFoundError) {
				throw new UsersServiceUserWithGivenIdNotFoundError(id);
			}
			throw error;
		}
	}
	public async createUser(createUserPayload: CreateUserPayload): Promise<User> {
		return deentityifyUserEntity(await this.usersRepository.save(createUserPayload));
	}

	public async deleteUserById(id: string): Promise<boolean> {
		try {
			await this.usersRepository.delete({id});
			return true;
		} catch (error) {
			if (error instanceof EntityNotFoundError) {
				throw new UsersServiceUserWithGivenIdNotFoundError(id);
			}
			throw error;
		}
	}
	public async updateUser(userId: string, arg1: EditUserPayload): Promise<User> {
		const editUserPayload = arg1;
		await this.usersRepository.update(userId, editUserPayload);
		return deentityifyUserEntity(await this.usersRepository.findOneByOrFail({id: userId}));
	}
	public async setHairType(
		id: string,
		hairType: SetUserHairTypeRequestBody
	): Promise<{
		isPublic: boolean;
		hairType: "wysokoporowate" | "srednioporowate" | "niskoporowate" | null;
	}> {
		try {
			const user = await this.usersRepository.findOneByOrFail({id});
			if (user.hairType) {
				await this.userHairTypeRepository.delete(user.id);
			}
			if (
				hairType.hairType === "wysokoporowate" ||
				hairType.hairType === "srednioporowate" ||
				hairType.hairType === "niskoporowate"
			) {
				const userHairTypeEntity = await this.userHairTypeRepository.save({
					hairType: hairType.hairType,
					isPublic: hairType.isPublic,
					user,
				});
				console.log(userHairTypeEntity);
				return {
					isPublic: userHairTypeEntity.isPublic,
					hairType: userHairTypeEntity.hairType,
				};
			} else {
				throw new Error("Wrong hair type");
			}
		} catch (error) {
			if (error instanceof EntityNotFoundError) {
				throw new UsersServiceUserWithGivenIdNotFoundError(id);
			}
			throw error;
		}
	}

	public async getHairType(id: string): Promise<{
		isPublic: boolean;
		hairType: "wysokoporowate" | "srednioporowate" | "niskoporowate" | null;
	}> {
		try {
			const user = await this.usersRepository.findOneByOrFail({id});
			console.log(user);
			const userHairTypeEntity = await this.userHairTypeRepository.findOneByOrFail({
				userId: user.id,
			});
			console.log(userHairTypeEntity);
			return {
				isPublic: userHairTypeEntity.isPublic,
				hairType: userHairTypeEntity.hairType,
			};
		} catch (error) {
			if (error instanceof EntityNotFoundError) {
				throw new UsersServiceUserWithGivenIdNotFoundError(id);
			}
			throw error;
		}
	}
}
