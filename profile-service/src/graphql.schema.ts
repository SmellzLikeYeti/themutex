
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export abstract class IMutation {
    abstract createProfile(userid: string, fname: string, lname: string, occupation?: string, company?: string): boolean | Promise<boolean>;

    abstract updateFName(userid: string, fname: string): boolean | Promise<boolean>;

    abstract updateLName(userid: string, lname: string): boolean | Promise<boolean>;

    abstract updateOccupation(userid: string, occupation: string): boolean | Promise<boolean>;

    abstract updateCompany(userid: string, company: string): boolean | Promise<boolean>;
}

export class Profile {
    fname: string;
    lname: string;
    occupation?: string;
    company?: string;
}

export abstract class IQuery {
    abstract profile(userid: string): Profile | Promise<Profile>;
}
