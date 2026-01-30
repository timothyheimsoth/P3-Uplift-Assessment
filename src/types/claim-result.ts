import { ReasonCode } from "./reason-code";

/** Result of a claim evaluation **/
export interface ClaimResult {
  approved: boolean;
  payout: number;
  reasonCode: ReasonCode;
}