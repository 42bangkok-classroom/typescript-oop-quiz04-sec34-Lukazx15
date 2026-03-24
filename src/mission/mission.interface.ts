export interface IMission {
  id: string;
  codename: string;
  status: 'COMPLETED' | 'ACTIVE';
  targetName: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  startDate: string;
  endDate: string | null;
}
