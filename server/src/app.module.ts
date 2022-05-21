import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidateTokenMiddleware } from './middleware/validate-token.middleware';
import configuration from './config/configuration';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${configuration().database.MONGO_URL}/test`,
    ),
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateTokenMiddleware).forRoutes('api/users');
  }
}
