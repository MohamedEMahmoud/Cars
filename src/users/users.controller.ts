import { UpdateUserDto } from './dto/update-user.dto';
import { Controller, Post, Get, Patch, Delete, Param, Query, Body, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDto } from './dto/user.dto';
import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";
import { Serialize } from './../interceptors/serialize.interceptors';
import { Session } from "@nestjs/common";

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) { }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Get('/currentuser')
    currentuser(@Session() session: any) {
        return this.userService.findOne(session.userId);
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
