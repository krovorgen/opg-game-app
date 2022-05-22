import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../schemas/users.schema';

@ApiTags('Пользователи')
@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @ApiOperation({ summary: 'Получение определённого пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.usersService.getById(id);
  }

  @ApiOperation({ summary: 'Обновление определённого пользователя' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
