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
                .post('/v2/items')
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
describe('POST /items', () => {
    it('should respond with 201 for valid inputs', async () => {
        const response = await request(app)
            .post('/items')
            .send({ name: 'Test Item', price: 10 });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Item added successfully');
    });

    it('should respond with 400 for missing name', async () => {
        const response = await request(app)
            .post('/items')
            .send({ price: 10 });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid input: name must be a non-empty string.');
    });

    it('should respond with 400 for empty name', async () => {
        const response = await request(app)
            .post('/items')
            .send({ name: '', price: 10 });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid input: name must be a non-empty string.');
    });

    it('should respond with 400 for invalid price', async () => {
        const response = await request(app)
            .post('/items')
            .send({ name: 'Test Item', price: -5 });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid input: price must be a positive number.');
    });

    it('should respond with 400 for non-numeric price', async () => {
        const response = await request(app)
            .post('/items')
            .send({ name: 'Test Item', price: 'ten' });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid input: price must be a positive number.');
    });
});