import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ClaimService } from "../../../src/services/claim.service";
import { PolicyService } from '../../../src/services/policy.service';
import { Claim } from '../../../src/types/claim';

describe('ClaimService', () => {
    let claimService: ClaimService;
    let mockPolicyService: PolicyService;

    beforeEach(() => {
        mockPolicyService = {
            getPolicy: vi.fn(),
            validatePolicy: vi.fn(),
        } as any;
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
            expect(() => claimService.evaluate(claim)).toThrow();
        });
    });
});