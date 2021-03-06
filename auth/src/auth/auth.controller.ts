import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Авторизация')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация' })
  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @ApiOperation({ summary: 'Логин' })
  @Post('/login')
  async login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Новый пароль' })
  @Post('/set-new-password')
  async setNewPassword(
    @Body() body: { recoveryCode: string; newPassword: string },
  ) {
    const { recoveryCode, newPassword } = body;
    return this.authService.setNewPassword(newPassword, recoveryCode);
  }

  @ApiOperation({ summary: 'Проверка авторизации' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/me')
  async me(@Request() req) {
    return this.authService.me(req.user);
  }

  @ApiOperation({ summary: 'Восстановление пароля' })
  @Post('/password-recovery')
  async passwordRecovery(@Body('email') email) {
    return this.authService.passwordRecovery(email);
  }
}
