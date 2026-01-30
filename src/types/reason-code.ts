/** Reason codes for the result of aclaim evaluation **/
export type ReasonCode =
  | 'APPROVED'
  | 'POLICY_INACTIVE'
  | 'NOT_COVERED'
  | 'ZERO_PAYOUT'
  | 'EXCEEDS_LIMIT';   