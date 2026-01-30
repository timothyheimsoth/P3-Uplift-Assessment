import { Policy } from "../types/policy";

/** Service to process claims **/
export class PolicyService {
    private policies: Map<string, Policy>;
    
    constructor() { this.policies = new Map<string, Policy>(); }

    // Evaluates a claim and returns the result.
    get(policyId: string): Policy {
        const policy = this.policies.get(policyId);

        if (!policy) {
            throw new Error(`Policy with ID ${policyId} not found`);
        }

        return policy;
    }

    // Saves a new policy to the collection.
    save(policy: Policy): void {
        if (!policy.policyId || policy.policyId.trim() === '') {
            throw new Error('Policy ID is required');
        }
        if (!(policy.startDate instanceof Date) || isNaN(policy.startDate.getTime())) {
            throw new Error('Start date must be a valid date');
        }
        if (!(policy.endDate instanceof Date) || isNaN(policy.endDate.getTime())) {
            throw new Error('End date must be a valid date');
        }
        if (policy.startDate >= policy.endDate) {
            throw new Error('Start date must be before end date');
        }
        if (policy.deductible < 0) {
            throw new Error('Deductible cannot be negative');
        }
        if (policy.coverageLimit <= 0) {
            throw new Error('Coverage limit must be positive');
        }
        if (!Array.isArray(policy.coveredIncidents) || policy.coveredIncidents.length === 0) {
            throw new Error('At least one covered incident is required');
        }

        this.policies.set(policy.policyId, policy);
    }

    // Saves multiple policies to the collection.
    saveRange(policies: Policy[]): void {
        for (const policy of policies) {
            this.save(policy);
        }
    }
}