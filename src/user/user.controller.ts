import { Controller, Post, Body, Param, Get, Put, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';


@Controller('user')
export class UserController {
  constructor(private userService: UserService){}


  @Post('/signup')
  signupUser(@Body() dto: SignupDto): Promise<boolean>{
    return this.userService.signup(dto)
  }

  @Post('/signin')
  signinUser(@Body() dto: SigninDto):Promise<{ accessToken: string}>{
    return this.userService.signin(dto)
  }

  @Get('/')
  @UseGuards(AuthGuard('admin'))
  getUsers():Promise<User[]>{
    return this.userService.getUsers()
  }


  @Get('/profile')
  @UseGuards(AuthGuard('user'))
  getProfile(@GetUser() user: User){
    return user
  }

  @Get('/:id')
  @UseGuards(AuthGuard('user'))
  getUser(@Param('id', ParseUUIDPipe) id: string): Promise<User>{
    return this.userService.getUser(id)
  }

}
