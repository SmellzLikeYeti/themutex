
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export abstract class IMutation {
    abstract createUser(username: string, password: string, email: string): User | Promise<User>;
}

export class Profile {
    fName?: string;
    lName?: string;
}

export abstract class IQuery {
    abstract user(username: string): User | Promise<User>;
}

export class User {
    username: string;
    password?: string;
    email?: string;
}
