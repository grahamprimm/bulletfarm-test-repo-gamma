const request = require('supertest');
const app = require('../index'); // Adjust the path based on your app's entry point

describe('Items API', () => {
  it('should get all items', async () => {
    const response = await request(app).get('/items');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get item by ID', async () => {
    const response = await request(app).get('/items/1'); // Assuming item with ID 1 exists
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  it('should return 404 for non-existing item', async () => {
    const response = await request(app).get('/items/9999'); // Assuming no item with this ID exists
    expect(response.status).toBe(404);
  });

  it('should create a new item', async () => {
    const newItem = { name: 'New Item', price: 100 }; // Modify as per your item's structure
    const response = await request(app).post('/items').send(newItem);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id'); // Assuming the created item returns an ID
  });

  it('should return 400 for invalid input', async () => {
    const response = await request(app).post('/items').send({}); // Sending empty object
    expect(response.status).toBe(400);
  });
});
