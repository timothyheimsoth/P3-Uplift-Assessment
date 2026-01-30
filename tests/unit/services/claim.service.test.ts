import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ClaimService } from "../../../src/services/claim.service";
import { PolicyService } from '../../../src/services/policy.service';
import { Claim } from '../../../src/types/claim';

describe('ClaimService', () => {
    let claimService: ClaimService;
    let mockPolicyService: PolicyService;

    beforeEach(() => {
        mockPolicyService = new PolicyService();
        mockPolicyService.saveRange([
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
        ]);

        claimService = new ClaimService(mockPolicyService);
    });

    describe('constructor', () => {
        it('should initialize with policy service', () => {
            expect(claimService).toBeDefined();
        });
    });

    describe('evaluate', () => {
        it('should accept a claim object', () => {
            const claim: Claim = {
                policyId: 'POL123',
                incidentType: 'fire',
                incidentDate: new Date('2023-06-15'),
                amountClaimed: 3000,
            };
            expect(claimService.evaluate(claim)).toEqual({
                approved: true,
                payout: 2500,
                reasonCode: 'APPROVED'
            });
        });

        it('should not accept a claim that is not active.', () => {
            const claim: Claim = {
                policyId: 'POL123',
                incidentType: 'fire',
                incidentDate: new Date('2022-06-15'),
                amountClaimed: 3000,
            };
            expect(claimService.evaluate(claim)).toEqual({
                approved: false,
                payout: 0,
                reasonCode: 'POLICY_INACTIVE'
            });
        });

        it('should not accept a incident not covered by the policy.', () => {
            const claim: Claim = {
                policyId: 'POL123',
                incidentType: 'theft',
                incidentDate: new Date('2023-06-15'),
                amountClaimed: 3000,
            };
            expect(claimService.evaluate(claim)).toEqual({
                approved: false,
                payout: 0,
                reasonCode: 'NOT_COVERED'
            });
        });

        it('should return 0 if the deductable is not met.', () => {
            const claim: Claim = {
                policyId: 'POL123',
                incidentType: 'fire',
                incidentDate: new Date('2023-06-15'),
                amountClaimed: 200,
            };
            expect(claimService.evaluate(claim)).toEqual({
                approved: false,
                payout: 0,
                reasonCode: 'ZERO_PAYOUT'
            });
        });
    });
});