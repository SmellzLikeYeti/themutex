import { ProfileService } from './profile.service';
import { Profile } from 'src/graphql.schema';
export declare class ProfileResolver {
    private readonly profileService;
    constructor(profileService: ProfileService);
    profile(userid: string): Promise<Profile>;
    create(userid: string, fname: string, lname: string, occupation: string, company: string): Promise<boolean>;
    updateFName(userid: string, fname: string): Promise<boolean>;
    updateLName(userid: string, lname: string): Promise<boolean>;
    updateOccupation(userid: string, occupation: string): Promise<boolean>;
    updateCompany(userid: string, company: string): Promise<boolean>;
}
