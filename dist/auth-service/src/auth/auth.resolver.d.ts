import { AuthService } from './auth.service';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    user(password: string, hash: string): Promise<boolean>;
}
