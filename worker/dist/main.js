import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module.js';
async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    app.enableShutdownHooks();
    Logger.log('Worker started, waiting for jobs', 'Bootstrap');
}
await bootstrap();
//# sourceMappingURL=main.js.map