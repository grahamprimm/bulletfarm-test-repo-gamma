const request = require('supertest');
const app = require('../index');

// Test for GET /items
describe('GET /items', () => {
    test('should respond with JSON array', async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.header['content-type']).toEqual(expect.stringContaining('json'));
        expect(Array.isArray(res.body)).toBe(true);
    });
});

// Test for GET /items/:id
describe('GET /items/:id', () => {
    test('should respond with JSON object', async () => {
        const res = await request(app).get('/items/1');
        expect(res.statusCode).toBe(200);
        expect(res.header['content-type']).toEqual(expect.stringContaining('json'));
    });
    test('should return 404 for non-existent item', async () => {
        const res = await request(app).get('/items/999');
        expect(res.statusCode).toBe(404);
    });
});

// Test for POST /items
describe('POST /items', () => {
    test('should create a new item', async () => {
        const newItem = { name: 'Test Item', price: 10 };
        const res = await request(app).post('/items').send(newItem);
        expect(res.statusCode).toBe(201);
        expect(res.header['content-type']).toEqual(expect.stringContaining('json'));
        expect(res.body.item.name).toBe(newItem.name);
        expect(res.body.item.price).toBe(newItem.price);
    });
    test('should return 400 for missing name', async () => {
        const res = await request(app).post('/items').send({ price: 10 });
        expect(res.statusCode).toBe(400);
    });
    test('should return 400 for missing price', async () => {
        const res = await request(app).post('/items').send({ name: 'Test Item' });
        expect(res.statusCode).toBe(400);
    });
    test('should return 400 for invalid price', async () => {
        const res = await request(app).post('/items').send({ name: 'Test Item', price: -1 });
        expect(res.statusCode).toBe(400);
    });
});

// Test for non-existent routes
describe('Invalid routes', () => {
    test('should return 404 for invalid route', async () => {
        const res = await request(app).get('/invalid-route');
        expect(res.statusCode).toBe(404);
    });
});