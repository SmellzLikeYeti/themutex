import { Module, HttpModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [HttpModule],
  providers: [UserService, UserResolver],
})
export class UserModule {}
