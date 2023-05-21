import {Module} from "@nestjs/common";
import UsersModule from "./users/users_module/UsersModule.js";

@Module({
	imports: [UsersModule],
	controllers: [],
	providers: [],
})
class FeaturesModule {
	public constructor() {}
}

export default FeaturesModule;
