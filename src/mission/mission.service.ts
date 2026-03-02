import { Injectable } from '@nestjs/common';

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
}
