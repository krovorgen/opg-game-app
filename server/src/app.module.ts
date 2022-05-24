import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { AppController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb://${configuration().database.MONGO_URL}/test`,
    ),
    JwtModule.register({
      signOptions: {
        expiresIn: '365d',
      },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [JwtModule],
  exports: [],
})
export class AppModule {}
