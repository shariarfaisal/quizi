import { UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { Admin } from './admin.entity'
import * as config from 'config'
import { JwtPayload } from './jwt.payload'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'admin'){
  constructor(){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret')
    })
  }

  async validate(payload: JwtPayload): Promise<Admin>{
    const { id } = payload
    const admin = await Admin.findOne(id)
    if(!admin){
      throw new UnauthorizedException()
    }
    return admin
  }
}
