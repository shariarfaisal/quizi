import { SignupDto } from "../dto/signup.dto";


export const signupValidator = ({ username, password}: SignupDto) => {
  const errors: any = {}

  if(!username) errors.username = "Username required."
  else if(username.length < 4) errors.username = "Username must be atleast 4 characters."
  else if(username.length > 55) errors.username = "Too long."

  if(!password) errors.password = "Password required."
  else if(password.length < 4) errors.password = "Password should be atleast 4 characters."
  else if(password.length > 255) errors.password = "Too long."

  return { errors, isValid: Object.keys(errors).length === 0}
}
