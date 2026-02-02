// src/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0'
    },
    components: {
      schemas: {
        Claim: {
          type: 'object',
          required: ['policyId', 'incidentType', 'incidentDate', 'amountClaimed'],
          properties: {
            policyId: { type: 'string', example: 'POL123' },
            incidentType: {
              type: 'string',
              enum: ['accident', 'fire', 'theft', 'water damage'],
              example: 'fire'
            },
            incidentDate: { type: 'string', format: 'date-time', example: '2023-06-15T00:00:00.000Z' },
            amountClaimed: { type: 'number', format: 'double', example: 3000, minimum: 0 }
          }
        },
        ClaimResult: {
          type: 'object',
          required: ['approved', 'payout', 'reasonCode'],
          properties: {
            approved: { type: 'boolean', example: true },
            payout: { type: 'number', format: 'double', example: 2500 },
            reasonCode: {
              type: 'string',
              enum: ['APPROVED', 'POLICY_INACTIVE', 'NOT_COVERED', 'ZERO_PAYOUT', 'EXCEEDS_LIMIT', 'ERROR'],
              example: 'APPROVED'
            },
            error: { type: 'string', nullable: true }
          }
        },
        Policy: {
          type: 'object',
          properties: {
            policyId: { type: 'string', example: 'POL123' },
            startDate: { type: 'string', format: 'date-time' },
            endDate: { type: 'string', format: 'date-time' },
            deductible: { type: 'number' },
            coverageLimit: { type: 'number' },
            coveredIncidents: { type: 'array', items: { type: 'string' } }
          }
        },
        Error: {
          type: 'object',
          required: ['error', 'status'],
          properties: {
            error: { type: 'string' },
            status: { type: 'integer', format: 'int32' }
          }
        },
        HealthCheck: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            timestamp: { type: 'string', format: 'date-time' },
            service: { type: 'string' }
          }
        },
        BatchClaimRequest: {
          type: 'object',
          required: ['claims'],
          properties: {
            claims: { type: 'array', items: { $ref: '#/components/schemas/Claim' } }
          }
        }
      },
      responses: {
        BadRequest: { description: 'Bad request', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        InternalError: { description: 'Internal server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
      }
    }
  },
  // scan all .ts files in src so new routes are picked up automatically
  apis: ['./src/**/*.ts']
};

export const swaggerSpec = swaggerJsdoc(options);