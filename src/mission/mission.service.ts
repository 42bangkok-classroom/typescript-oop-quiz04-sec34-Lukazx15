import { Injectable } from '@nestjs/common';
import { IMission } from './mission.interface';
import { readFileSync } from 'fs';
import { join } from 'path';
import { NotFoundException } from '@nestjs/common';

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
    return this.missions.reduce(
      (acc, mission) => {
        const status = mission.status;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
  }

  //2
  findAll() {
    const filePath = join(process.cwd(), 'data', 'missions.json');
    const raw = readFileSync(filePath, 'utf-8');
    const missions = JSON.parse(raw) as unknown as IMission[];

    return missions.map((m) => {
      let durationDays = -1;

      if (m.endDate !== null) {
        const start = new Date(m.startDate);
        const end = new Date(m.endDate);

        const diff = end.getTime() - start.getTime();
        durationDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      }

      return {
        ...m,
        durationDays,
      };
    });
  }

  //3
  findOne(id: string, clearance: string = 'STANDARD') {
    const filePath = join(process.cwd(), 'data', 'missions.json');
    const raw = readFileSync(filePath, 'utf-8');
    const missions = JSON.parse(raw) as unknown as IMission[];

    const mission = missions.find((m) => m.id === id);

    if (!mission) {
      throw new NotFoundException('Mission not found');
    }

    // clone object กันแก้ของจริง
    const result = { ...mission };

    const isHighRisk =
      result.riskLevel === 'HIGH' || result.riskLevel === 'CRITICAL';

    const isTopSecret = clearance === 'TOP_SECRET';

    if (isHighRisk && !isTopSecret) {
      result.targetName = '***REDACTED***';
    }

    return result;
  }
}
