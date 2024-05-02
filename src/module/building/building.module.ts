import { Module } from '@nestjs/common';
import { BuildingService, RoomService } from '@service';
import { BuildingRepository, RoomRepository } from '@repository';
@Module({
  imports: [],
  controllers: [],
  providers: [BuildingRepository, RoomRepository, BuildingService, RoomService],
  exports: [BuildingService, RoomService],
})
export class BuildingModule {}
