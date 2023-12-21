import { UserAdminController } from '@controller';
import { UserAdmin } from '@model';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAdminRepository } from '@repository';
import { UserAdminService } from '@service';

@Module({
  imports: [TypeOrmModule.forFeature([UserAdmin, UserAdminRepository])],
  controllers: [UserAdminController],
  providers: [UserAdminService, UserAdminRepository],
})
export class UserAdminModule {}
