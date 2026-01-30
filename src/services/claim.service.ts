import { Claim } from "../types/claim";
import { ClaimResult } from "../types/claim-result";
import { Policy } from "../types/policy";
import { PolicyService } from "./policy.service";

/** Service to process claims **/
export class ClaimService {
    private policyService: PolicyService;
    
    constructor(policyService: PolicyService) {
        this.policyService = policyService;
    }

    // Evaluates a claim and returns the result.
    evaluate(claim: Claim): ClaimResult {
        if (!claim.policyId || claim.policyId.trim() === '') {
            throw new Error('Policy ID is required');
        }
        if (!claim.incidentType || claim.incidentType.trim() === '') {
            throw new Error('Incident type is required');
        }
        if (!(claim.incidentDate instanceof Date) || isNaN(claim.incidentDate.getTime())) {
            throw new Error('Incident date must be a valid date');
        }
        if (typeof claim.amountClaimed !== 'number' || claim.amountClaimed < 0) {
            throw new Error('Amount claimed must be a non-negative number');
        }

        var policy:Policy;
        
        // Policy not found / doesn't exist
        try {
            policy = this.policyService.get(claim.policyId);

            // Policy must be active
            if (claim.incidentDate < policy.startDate || claim.incidentDate > policy.endDate)
                throw new Error('Policy inactive');

        } catch (error) {
            return {
                approved: false,
                payout: 0,
                reasonCode: 'POLICY_INACTIVE'
            };
        }

        // Incident must be covered
        if (!policy.coveredIncidents.includes(claim.incidentType)) {
            return {
                approved: false,
                payout: 0,
                reasonCode: 'NOT_COVERED'
            };
        }

        // Apply coverage limit
        const finalPayout = Math.min(Math.max(0, claim.amountClaimed - policy.deductible), policy.coverageLimit);

        if (finalPayout <= 0) {
            return {
                approved: false,
                payout: 0,
                reasonCode: 'ZERO_PAYOUT'
            };
        }

        if (policy.coverageLimit <= Math.max(0, claim.amountClaimed - policy.deductible)) {
            return {
                approved: true,
                payout: policy.coverageLimit,
                reasonCode: 'EXCEEDS_LIMIT'
            };
        }

        return {
            approved: true,
            payout: finalPayout,
            reasonCode: 'APPROVED'
        };
    }
}