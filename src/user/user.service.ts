import { Injectable, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { User } from './user.entity'
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs'
import { signupValidator } from './validators/signup.validator';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt'



@Injectable()
export class UserService {
  constructor(private jwtService: JwtService){}


  async signup(dto: SignupDto): Promise<boolean>{
    const { errors, isValid } = signupValidator(dto)
    if(!isValid){
      throw new BadRequestException({ errors })
    }
    const { username, password } = dto

    const usernameExists = await User.findOne({ username })
    if(usernameExists){
      throw new BadRequestException({ errors:{ username: "Username taken."}})
    }

    const user = new User()
    user.username = username
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password,salt)
    await user.save()
    return true
  }


  async signin(dto: SigninDto):Promise<{accessToken: string}>{
    const { username, password } = dto
    const user = await User.findOne({ username })
    if(!user){
      throw new BadRequestException({ errors:{ msg: "Invalid cridentials."}})
    }

    const passCheck = await bcrypt.compare(password,user.password)
    if(!passCheck){
      throw new BadRequestException({ errors:{ msg: "Invalid cridentials."}})
    }

    const accessToken = this.jwtService.sign({ id: user.id, username })
    return { accessToken }
  }

  async getUsers(): Promise<User[]>{
    const users = await User.find()
    return users
  }

  async getUser(id: string): Promise<User>{
    const user = await User.findOne(id)
    if(!user){
      throw new NotFoundException()
    }
    return user
  }

}
