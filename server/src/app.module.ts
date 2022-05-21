import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { settings } from './helpers/settings';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${settings.MONGO_URL}/test`),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
