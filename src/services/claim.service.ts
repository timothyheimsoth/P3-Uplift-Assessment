import { Claim } from "../types/claim";
import { ClaimResult } from "../types/claim-result";
import { PolicyService } from "./policy.service";

/** Service to process claims **/
export class ClaimService {
    private policyService: PolicyService;
    
    constructor(policyService: PolicyService) {
        this.policyService = policyService;
    }

    // Evaluates a claim and returns the result.
    evaluate(claim: Claim): ClaimResult {
        
        //TODO: implement claim evaluation logic
        throw new Error('Not implemented')
    }
}