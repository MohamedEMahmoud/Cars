import { UpdateUserDto } from './dto/update-user.dto';
import { Controller, Post, Get, Patch, Delete, Param, Query, Body, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDto } from './dto/user.dto';
import { UsersService } from "./users.service";
import { Serialize } from './../interceptors/serialize.interceptors';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private userService: UsersService) { }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        this.userService.create(body.email, body.password);
    }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.userService.findOne(~~id);
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.userService.find(email);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.userService.remove(~~id);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(~~id, body);
    }
}
