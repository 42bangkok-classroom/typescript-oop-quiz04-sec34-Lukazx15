export class CreateMissionDto {
  codename: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  targetName: string;
  startDate: string;
}
