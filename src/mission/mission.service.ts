import { Injectable } from '@nestjs/common';
import { IMission } from './mission.interface';
import { readFileSync } from 'fs';
import { join, parse } from 'path';

@Injectable()
export class MissionService {
  private readonly missions = [
    { id: 1, codename: 'OPERATION_STORM', status: 'ACTIVE' },
    { id: 2, codename: 'SILENT_SNAKE', status: 'COMPLETED' },
    { id: 3, codename: 'RED_DAWN', status: 'FAILED' },
    { id: 4, codename: 'BLACKOUT', status: 'ACTIVE' },
    { id: 5, codename: 'ECHO_FALLS', status: 'COMPLETED' },
    { id: 6, codename: 'GHOST_RIDER', status: 'COMPLETED' },
  ];

  getSummary(): Record<string, number> {
    const summary: Record<string, number> = {};

    for (let i = 0; i < this.missions.length; i++) {
      const status = this.missions[i].status;
      if (!summary[status]) {
        summary[status] = 1;
      } else {
        summary[status] += 1;
      }
    }
    return summary;
  }

  findAll(): IMission[] {
    const filePath = join(process.cwd(), 'data', 'mission.json');
    const rawData = readFileSync(filePath, 'utf-8');
    const missions: IMission[] = JSON.parse(rawData);

    return missions.map((mission) => {
      let durationDays = -1;

      if (mission.endDate !== null) {
        const start = new Date(mission.startDate);
        const end = new Date(mission.endDate);

        const diffTime = end.getTime() - start.getTime();
        durationDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      }

      return {
        id: mission.id,
        codename: mission.codename,
        status: mission.status,
        startDate: mission.startDate,
        endDate: mission.endDate,
        durationDays,
        targetName: mission.targetName,
        riskLevel: mission.riskLevel,
      };
    });
  }
}
