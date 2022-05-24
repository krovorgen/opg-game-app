import { Module } from '@nestjs/common';
import { CryptographyService } from './cryptography.service';

@Module({
  controllers: [],
  providers: [CryptographyService],
  exports: [CryptographyService],
})
export class CryptographyModule {}
