import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { AppController } from './app.controller';

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
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
