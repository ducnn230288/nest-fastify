import { Module } from '@nestjs/common';
import { BuildingService } from '@service';
import { BuildingRepository, RoomRepository } from '@repository';

@Module({
  imports: [],
  controllers: [],
  providers: [BuildingRepository, RoomRepository, BuildingService],
  exports: [BuildingService],
})
export class BuildingModule {}
