import { Profile } from 'src/graphql.schema';
export declare class ProfileService {
    private docClient;
    constructor();
    fetchProfile(userid: string): Promise<Profile>;
    createProfile(userid: string, fname: string, lname: string, occupation: string, company: string): Promise<boolean>;
    updateFirstName(userid: string, fname: string): Promise<boolean>;
    updateLastName(userid: string, lname: string): Promise<boolean>;
    updateOccupation(userid: string, occupation: string): Promise<boolean>;
    updateCompany(userid: string, company: string): Promise<boolean>;
}
