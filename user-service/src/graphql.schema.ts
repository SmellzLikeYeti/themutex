
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export abstract class IMutation {
    abstract createUser(userid: string, password: string, email: string): boolean | Promise<boolean>;
}

export abstract class IQuery {
    abstract user(userid: string): User | Promise<User>;
}

export class User {
    userid: string;
    email: string;
}
