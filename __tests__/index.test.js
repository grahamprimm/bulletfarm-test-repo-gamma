const request = require('supertest');
const express = require('express');

const app = express();

app.use(express.json());

// Sample in-memory data store
let items = [];

// Input validation middleware
function validateItem(req, res, next) {
    const { name, price } = req.body;
    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Invalid input: name must be a non-empty string.' });
    }
    if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: 'Invalid input: price must be a positive number.' });
    }
    next();
}

// POST /items route
app.post('/items', validateItem, (req, res) => {
    const { name, price } = req.body;
    items.push({ id: items.length + 1, name, price });
    res.status(201).json({ message: 'Item added successfully', item: { name, price } });
});

// GET /items route
app.get('/items', (req, res) => {
    res.status(200).json(items);
});

// GET /items/:id route
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json(item);
});

// Test suite
describe('API Tests', () => {
    it('should add an item', async () => {
        const response = await request(app)
            .post('/items')
            .send({ name: 'Item1', price: 10 });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Item added successfully');
        expect(response.body.item).toEqual({ name: 'Item1', price: 10 });
    });

    it('should return all items', async () => {
        await request(app).post('/items').send({ name: 'Item2', price: 20 });
        const response = await request(app).get('/items');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    it('should return a specific item by ID', async () => {
        const response = await request(app).get('/items/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'Item1');
    });

    it('should return 404 for non-existent item', async () => {
        const response = await request(app).get('/items/999');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Item not found');
    });

    it('should return 400 for invalid input on POST', async () => {
        const response = await request(app)
            .post('/items')
            .send({ name: '', price: -5 });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});