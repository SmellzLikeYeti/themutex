export declare abstract class IMutation {
    abstract createProfile(userid: string, fname: string, lname: string, occupation?: string, company?: string): boolean | Promise<boolean>;
    abstract updateFName(userid: string, fname: string): boolean | Promise<boolean>;
    abstract updateLName(userid: string, lname: string): boolean | Promise<boolean>;
    abstract updateOccupation(userid: string, occupation: string): boolean | Promise<boolean>;
    abstract updateCompany(userid: string, company: string): boolean | Promise<boolean>;
}
export declare class Profile {
    fname: string;
    lname: string;
    occupation?: string;
    company?: string;
}
export declare abstract class IQuery {
    abstract profile(userid: string): Profile | Promise<Profile>;
}
