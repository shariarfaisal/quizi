import { Injectable, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { Admin } from './admin.entity'
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs'
import { signupValidator } from './validators/signup.validator';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt'



@Injectable()
export class AdminService {
  constructor(private jwtService: JwtService){}


  async signup(dto: SignupDto): Promise<boolean>{
    const { errors, isValid } = signupValidator(dto)
    if(!isValid){
      throw new BadRequestException({ errors })
    }
    const { username, password } = dto

    const usernameExists = await Admin.findOne({ username })
    if(usernameExists){
      throw new ConflictException({ errors:{ username: "Username taken."}})
    }

    const admin = new Admin()
    admin.username = username
    const salt = await bcrypt.genSalt(10)
    admin.password = await bcrypt.hash(password,salt)
    console.log(admin)
    await admin.save()
    return true
  }


  async signin(dto: SigninDto):Promise<{accessToken: string}>{
    const { username, password } = dto
    const admin = await Admin.findOne({ where:{ username }, select:['id','username','password'] })
    if(!admin){
      throw new BadRequestException({ errors:{ msg: "Invalid cridentials."}})
    }

    const passCheck = await bcrypt.compare(password,admin.password)
    if(!passCheck){
      throw new BadRequestException({ errors:{ msg: "Invalid cridentials."}})
    }

    const accessToken = this.jwtService.sign({ id: admin.id, username })
    return { accessToken }
  }

  async getAdmins(): Promise<Admin[]>{
    const admins = await Admin.find()
    return admins
  }

  async getAdmin(id: string): Promise<Admin>{
    const admin = await Admin.findOne(id)
    if(!admin){
      throw new NotFoundException()
    }
    return admin
  }

}
