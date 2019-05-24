import { UserService } from './user.service';
import { User } from 'src/graphql.schema';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    user(username: string): Promise<User>;
    create(username: string, password: string, email: string): Promise<any>;
}
