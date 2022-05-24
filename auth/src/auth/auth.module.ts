import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/users.schema';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../config/configuration';
import { UserModule } from '../user/user.module';
import { CryptographyModule } from '../cryptography/cryptography.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: configuration().crypto.JWT_SECRET,
      signOptions: {
        expiresIn: '365d',
      },
    }),
    forwardRef(() => UserModule),
    CryptographyModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtModule],
})
export class AuthModule {}
