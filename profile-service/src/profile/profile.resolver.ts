import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from 'src/graphql.schema';

@Resolver('Profile')
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query('profile')
  async profile(@Args('userid') userid: string): Promise<Profile> {
    return await this.profileService.fetchProfile(userid);
  }

  @Mutation('createProfile')
  async create(
    @Args('userid') userid: string,
    @Args('fname') fname: string,
    @Args('lname') lname: string,
    @Args('occupation') occupation: string,
    @Args('company') company: string,
  ): Promise<boolean> {
    return await this.profileService.createProfile(
      userid,
      fname,
      lname,
      occupation,
      company,
    );
  }
  @Mutation('updateFName')
  async updateFName(
    @Args('userid') userid: string,
    @Args('fname') fname: string,
  ): Promise<boolean> {
    return await this.profileService.updateFirstName(userid, fname);
  }
  @Mutation('updateLName')
  async updateLName(
    @Args('userid') userid: string,
    @Args('lname') lname: string,
  ): Promise<boolean> {
    return await this.profileService.updateLastName(userid, lname);
  }
  @Mutation('updateOccupation')
  async updateOccupation(
    @Args('userid') userid: string,
    @Args('occupation') occupation: string,
  ): Promise<boolean> {
    return await this.profileService.updateOccupation(userid, occupation);
  }
  @Mutation('updateCompany')
  async updateCompany(
    @Args('userid') userid: string,
    @Args('company') company: string,
  ): Promise<boolean> {
    return await this.profileService.updateCompany(userid, company);
  }
}
