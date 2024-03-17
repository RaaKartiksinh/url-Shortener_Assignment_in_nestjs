import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { signUpAuthDto } from './dto/signUp-auth.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpAuthDto: signUpAuthDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpAuthDto);
  }

  @Post('/login')
  async login(@Body() LoginAuthDto: LoginAuthDto): Promise<{ token: string }> {
    return this.authService.login(LoginAuthDto.email, LoginAuthDto.password);
  }
}
