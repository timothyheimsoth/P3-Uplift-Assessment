import { IncidentType } from "./incident-type";

/* Defines an insurance policy and the specific coverage details associated to it. */
export interface Policy {
  policyId: string;
  startDate: Date;
  endDate: Date;
  deductible: number;
  coverageLimit: number;
  coveredIncidents: IncidentType[];
}