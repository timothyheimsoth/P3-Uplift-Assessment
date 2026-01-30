import { Policy } from "../types/policy";

/** Service to process claims **/
export class PolicyService {
    private policies: Map<string, Policy>;
    
    constructor() { this.policies = new Map<string, Policy>(); }

    // Evaluates a claim and returns the result.
    get(policyId: string): Policy {
        
        //TODO: implement claim evaluation logic
        throw new Error('Not implemented');
    }

    // Saves a new policy to the collection.
    save(policy: Policy): void {

        throw new Error('Not implemented');
    }

    // Saves multiple policies to the collection.
    saveRange(policies: Policy[]): void {

        throw new Error('Not implemented');
    }
}