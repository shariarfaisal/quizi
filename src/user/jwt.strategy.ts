import { UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { User } from './user.entity'
import * as config from 'config'
import { JwtPayload } from './jwt.payload'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'user'){
  constructor(){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret')
    })
  }

  async validate(payload: JwtPayload): Promise<User>{
    const { id } = payload
    const user = await User.findOne(id)
    if(!user){
      throw new UnauthorizedException()
    }
    return user
  }
}
