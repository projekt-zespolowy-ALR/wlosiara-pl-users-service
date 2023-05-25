import {Module} from "@nestjs/common";
import UsersController from "../users_controller/UsersController.js";
import UsersService from "../users_service/UsersService.js";
import {TypeOrmModule} from "@nestjs/typeorm";
import UserEntity from "../users_service/UserEntity.js";

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	controllers: [UsersController],
	providers: [UsersService],
})
export default class UsersModule {
	public constructor() {}
}
