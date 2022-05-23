import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @Post('/login')
  async login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }
}
