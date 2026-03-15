// Tests for the Express API
const request = require('supertest');
const express = require('express');

const app = require('../index'); // Assuming your Express app is exported from index.js

describe('Items API', () => {
    it('GET /items should return all items', async () => {
        const response = await request(app).get('/items');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Array)); // Assuming the response is an array
    });

    it('GET /items/:id should return an item by id', async () => {
        const response = await request(app).get('/items/1'); // assuming 1 is a valid id
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('price');
    });

    it('POST /items should create a new item', async () => {
        const newItem = { name: 'Test Item', price: 10 };
        const response = await request(app).post('/items').send(newItem);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Item added successfully');
        expect(response.body.item).toEqual(newItem);
    });

    it('POST /items should return 400 for invalid input', async () => {
        const invalidItem = { name: '', price: -10 };
        const response = await request(app).post('/items').send(invalidItem);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    it('GET /items/:id should return 404 for non-existent item', async () => {
        const response = await request(app).get('/items/999'); // assuming 999 does not exist
        expect(response.status).toBe(404);
    });
});