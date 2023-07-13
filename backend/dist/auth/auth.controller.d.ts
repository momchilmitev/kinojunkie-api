import { AuthService } from './auth.service';
import { User } from '../users/user.schema';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(signInDto: User): Promise<User>;
    signIn(user: User): Promise<any>;
    getProfile(req: any): any;
}
