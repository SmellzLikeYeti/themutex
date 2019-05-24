import { User } from 'src/graphql.schema';
export declare class UserService {
    private docClient;
    constructor();
    findOneByUsername(username: string): Promise<User>;
    create(username: string, password: string, email: string): Promise<User>;
    private hashPassword;
}
