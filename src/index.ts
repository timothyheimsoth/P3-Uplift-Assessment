import express, { Express, Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import { ClaimService } from './services/claim.service';
import { PolicyService } from './services/policy.service';
import { Claim } from './types/claim';
import { swaggerSpec } from './swagger';

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Initialize services
const policyService = new PolicyService();
const claimService = new ClaimService(policyService);


// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('[ERROR]', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error',
        status: err.status || 500,
    });
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (_, res) => res.json(swaggerSpec));

/**
 * @openapi
 * /api/claims/evaluate:
 *   post:
 *     summary: Evaluate a single claim
 *     tags:
 *       - Claims
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Claim'
 *     responses:
 *       '200':
 *         description: Claim evaluation result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClaimResult'
 *       '400':
 *         description: Invalid claim data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post('/api/claims/evaluate', (req: Request, res: Response) => {
    try {
        const claim: Claim = req.body;
        const result = claimService.evaluate(claim);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
            status: 400,
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`[${new Date().toISOString()}] Claim Service API running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT}/ for available endpoints`);
});

export default app;