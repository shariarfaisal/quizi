import { createParamDecorator } from '@nestjs/common'
import { Admin } from './admin.entity'


export const GetAdmin = createParamDecorator((data,req): Admin => {
  return req.args[0].user
})
