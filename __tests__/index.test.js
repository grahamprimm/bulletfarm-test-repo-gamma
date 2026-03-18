const request = require('supertest');
const app = require('../index'); // import your Express app

describe('Items API', () => {
  // Testing GET /items
  describe('GET /items', () => {
    it('should return a list of items', async () => {
      const res = await request(app).get('/items');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('items');
    });
  });

  // Testing GET /items/:id
  describe('GET /items/:id', () => {
    it('should return an item by id', async () => {
      const res = await request(app).get('/items/1'); // Assuming 1 is a valid ID
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('item');
    });

    it('should return 404 for invalid item id', async () => {
      const res = await request(app).get('/items/999'); // Assuming 999 is an invalid ID
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  // Testing POST /items
  describe('POST /items', () => {
    it('should create a new item', async () => {
      const newItem = { name: 'New Item' }; // Replace with valid item structure
      const res = await request(app).post('/items').send(newItem);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('item');
    });

    it('should return 400 for invalid input', async () => {
      const res = await request(app).post('/items').send({}); // Sending empty object
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});
