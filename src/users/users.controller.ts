import { UpdateUserDto } from './dto/update-user.dto';
import { Controller, Post, Get, Patch, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDto } from './dto/user.dto';
import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";
import { Serialize } from './../interceptors/serialize.interceptors';
import { Session } from "@nestjs/common";
import { User } from './user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from "../guards/auth.guard";

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
    @UseGuards(AuthGuard)
    currentUser(@CurrentUser() user: User) {
        return user;
    }


    @Post('/signout')
    async signout(@Session() session: any) {
        session.userId = null;
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
