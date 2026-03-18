const request = require('supertest');
const app = require('../index'); // Assuming index.js exports the app instance

describe('API Versioning', () => {
    describe('GET /', () => {
        it('should list available API versions', async () => {
            const response = await request(app).get('/');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ versions: ['/v1', '/v2'] });
        });
    });

    describe('v1 /items', () => {
        // Existing tests for v1 /items
        it('should respond with 201 for valid inputs', async () => {
            const response = await request(app)
                .post('/v1/items')
                .send({ name: 'Test Item', price: 10 });
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Item added successfully');
        });
        // Additional v1 tests...
    });

    describe('v2 /items', () => {
        it('should respond with 200 for valid inputs with metadata', async () => {
            const response = await request(app)
                .get('/v2/items')
                .send({ name: 'Test Item', price: 10 });
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('v2 Items retrieved.');
            expect(response.body.metadata).toHaveProperty('version', 'v2');
            expect(response.body.metadata).toHaveProperty('timestamp');
            expect(response.body.metadata).toHaveProperty('request_id');
        });

        // Additional v2 tests can be added here...
    });
});