import { IncidentType } from "./incident-type";

/* Defines a claim made for an insurance policy. */
export interface Claim {
  policyId: string;
  incidentType: IncidentType;
  incidentDate: Date;
  amountClaimed: number;
}