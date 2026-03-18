const request = require('supertest');
const app = require('../index'); // Ensure to import your app

describe('Logging Middleware', () => {
    it('should log requests and respond correctly', async () => {
        const response = await request(app)
            .post('/items')
            .set('x-request-id', 'test-request-id')
            .send({ name: 'Test Item', price: 10 });
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: 'Item added successfully', item: { name: 'Test Item', price: 10 }});
    });

    it('should return 400 for invalid name', async () => {
        const response = await request(app)
            .post('/items')
            .send({ name: '', price: 10 });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid input: name must be a non-empty string.' });
    });

    it('should return 400 for invalid price', async () => {
        const response = await request(app)
            .post('/items')
            .send({ name: 'Test Item', price: -5 });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid input: price must be a positive number.' });
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