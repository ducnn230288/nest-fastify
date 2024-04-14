import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingService } from '@service';
import { BuildingRepository, RoomRepository } from '@repository';
import { Building, Room } from '@model';
import { AppUser } from './model/app-user.entity';
import { BuildingAddress } from './model/building-address.entity';
import { BuildingContent } from './model/building-content.entity';
import { BuildingMedia } from './model/building-media.entity';
import { BuildingUtility } from './model/building-utility.entity';
import { RoomContent } from './model/room-content.entity';
import { RoomCost } from './model/room-cost.entity';
import { RoomMedia } from './model/room-media.entity';
import { RoomSchedule } from './model/room-schedule.entity';
import { RoomSupplies } from './model/room-supplies.entity';
import { RoomUtility } from './model/room-utility.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Building,
      Room,
      AppUser,
      BuildingAddress,
      BuildingContent,
      BuildingMedia,
      BuildingUtility,
      RoomContent,
      RoomCost,
      RoomMedia,
      RoomSchedule,
      RoomSupplies,
      RoomUtility,
    ]),
  ],
  controllers: [],
  providers: [BuildingRepository, RoomRepository, BuildingService],
  exports: [BuildingService],
})
export class BuildingModule {}
