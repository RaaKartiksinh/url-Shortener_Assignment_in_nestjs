import { AuthService } from './auth.service';
import { signUpAuthDto } from './dto/signUp-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpAuthDto: signUpAuthDto): Promise<{
        token: string;
    }>;
    login(LoginAuthDto: LoginAuthDto): Promise<{
        token: string;
    }>;
}
