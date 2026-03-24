import { Controller, Get, Param, Query } from '@nestjs/common';
import { MissionService } from './mission.service';

@Controller('missions')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Get('summary')
  getSummary() {
    return this.missionService.getSummary();
  }

  //2
  @Get()
  findAll() {
    return this.missionService.findAll();
  }

  //3
  @Get(':id')
  findOne(@Param('id') id: string, @Query('clearance') clearance: string) {
    return this.missionService.findOne(id, clearance || 'STANDARD');
  }
}
