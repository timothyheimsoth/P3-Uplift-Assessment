import { describe, it, expect, beforeEach } from 'vitest';
import { PolicyService } from "../../../src/services/policy.service";
import { Policy } from '../../../src/types/policy';

describe('PolicyService', () => {
    let policyService: PolicyService;

    beforeEach(() => {
        policyService = new PolicyService();
    });

    it('should save a new policy', () => {
        const policy: Policy = {
            policyId: 'POL123',
            startDate: new Date('2023-01-01'),
            endDate: new Date('2024-01-01'),
            deductible: 500,
            coverageLimit: 10000,
            coveredIncidents: ['accident', 'fire'],
        }; 
        policyService.save(policy);
        expect(policyService.get('POL123')).toEqual(policy);
    });

    it('should save multiple policies', () => {
        const policies: Policy[] = [
            {
                policyId: 'POL123',
                startDate: new Date('2023-01-01'),
                endDate: new Date('2024-01-01'),
                deductible: 500,
                coverageLimit: 10000,
                coveredIncidents: ['accident', 'fire'],
            },
            {
                policyId: 'POL456',
                startDate: new Date('2022-06-01'),
                endDate: new Date('2025-06-01'),
                deductible: 250,
                coverageLimit: 50000,
                coveredIncidents: ['accident', 'theft', 'fire', 'water damage'],
            }
        ]; // Adjust according to your Policy type
        policyService.saveRange(policies);
        expect(policyService.get('POL123')).toEqual(policies[0]);
        expect(policyService.get('POL456')).toEqual(policies[1]);
    });

    it('should throw an error when getting a non-existent policy', () => {
        expect(() => policyService.get('non-existent')).toThrow('Not implemented');
    });
});