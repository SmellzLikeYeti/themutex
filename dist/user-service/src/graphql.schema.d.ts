export declare abstract class IMutation {
    abstract createUser(username: string, password: string, email: string): User | Promise<User>;
}
export declare class Profile {
    fName?: string;
    lName?: string;
}
export declare abstract class IQuery {
    abstract user(username: string): User | Promise<User>;
}
export declare class User {
    username: string;
    password?: string;
    email?: string;
}
