
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class Auth {
    userid: string;
    hash: string;
    lastSession: string;
}

export abstract class IMutation {
    abstract createAuthentication(userid: string, hash: string): boolean | Promise<boolean>;

    abstract updateAuthentication(userid: string, password: string): boolean | Promise<boolean>;
}

export abstract class IQuery {
    abstract authenticate(userid: string, password: string): boolean | Promise<boolean>;
}
