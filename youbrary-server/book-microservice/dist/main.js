"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
const config_1 = require("./config");
const logger = new common_1.Logger('Book Main');
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: config_1.book_host,
            port: 3003,
        }
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(() => {
        logger.log('Book microservice has started listening!');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map