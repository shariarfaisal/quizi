import { Controller, Post, Body, Param, Get, Put, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { Admin } from './admin.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetAdmin } from './get-admin.decorator';


@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService){}


  @Post('/signup')
  signupAdmin(@Body() dto: SignupDto): Promise<boolean>{
    return this.adminService.signup(dto)
  }

  @Post('/signin')
  signinAdmin(@Body() dto: SigninDto):Promise<{ accessToken: string}>{
    return this.adminService.signin(dto)
  }

  @Get('/')
  @UseGuards(AuthGuard('admin'))
  getAdmins():Promise<Admin[]>{
    return this.adminService.getAdmins()
  }


  @Get('/profile')
  @UseGuards(AuthGuard('admin'))
  getProfile(@GetAdmin() admin: Admin){
    return admin
  }

  @Get('/:id')
  @UseGuards(AuthGuard('admin'))
  getAdmin(@Param('id', ParseUUIDPipe) id: string): Promise<Admin>{
    return this.adminService.getAdmin(id)
  }

}
