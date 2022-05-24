import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/users.schema';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CryptographyModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
