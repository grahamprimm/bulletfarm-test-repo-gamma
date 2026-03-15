const request = require('supertest');
const express = require('express');
const app = require('../index'); // Assuming index.js exports the app instance

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