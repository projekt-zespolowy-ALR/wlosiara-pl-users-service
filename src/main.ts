import {NestFactory} from "@nestjs/core";
import AppModule from "./AppModule.js";
import {FastifyAdapter, type NestFastifyApplication} from "@nestjs/platform-fastify";
import AppConfig from "./app_config/AppConfig.js";
import initializeApp from "./initializeApp.js";
import type {FastifyReply, FastifyRequest} from "fastify";

const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
app.use((req: FastifyRequest, res: FastifyReply, next: () => void) => {
	console.log(req.method, req.url, Date.now());
	next();
});
initializeApp(app);
const appConfig = app.get(AppConfig);
await app.listen(appConfig.PORT, "0.0.0.0");
console.log(`Nest.js server listening at ${await app.getUrl()}`);
