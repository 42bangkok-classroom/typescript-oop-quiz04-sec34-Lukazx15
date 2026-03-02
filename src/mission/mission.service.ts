import { Injectable } from '@nestjs/common';

@Injectable()
export class MissionService {
  private readonly missions: {
    id: number;
    codename: string;
    status: 'ACTIVE' | 'COMPLETED' | 'FAILED';
  }[] = [
    { id: 1, codename: 'OPERATION_STORM', status: 'ACTIVE' },
    { id: 2, codename: 'SILENT_SNAKE', status: 'COMPLETED' },
    { id: 3, codename: 'RED_DAWN', status: 'FAILED' },
    { id: 4, codename: 'BLACKOUT', status: 'ACTIVE' },
    { id: 5, codename: 'ECHO_FALLS', status: 'COMPLETED' },
    { id: 6, codename: 'GHOST_RIDER', status: 'COMPLETED' },
  ];

  getSummary(): Record<'ACTIVE' | 'COMPLETED' | 'FAILED', number> {
    const summary: Record<'ACTIVE' | 'COMPLETED' | 'FAILED', number> = {
      ACTIVE: 0,
      COMPLETED: 0,
      FAILED: 0,
    };

    for (let i = 0; i < this.missions.length; i++) {
      const status = this.missions[i].status;
      summary[status] += 1;
    }

    return summary;
  }
}
