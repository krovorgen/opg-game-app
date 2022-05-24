import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CryptographyModule } from './cryptography/cryptography.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${configuration().database.MONGO_URL}/test`,
    ),
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
    }),
    UserModule,
    CryptographyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
