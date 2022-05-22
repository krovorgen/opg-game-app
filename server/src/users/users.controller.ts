import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.usersService.getById(id);
  }
}
