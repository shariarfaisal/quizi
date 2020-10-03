import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config'
import { JwtStrategy } from './jwt.strategy';

const jwtConfig = config.get('jwt')


@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions:{
        expiresIn: jwtConfig.expiresIn
      }
    })
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    JwtStrategy
  ],
  exports:[
    JwtStrategy,
    PassportModule
  ]
})
export class AdminModule {}
