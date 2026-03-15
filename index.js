const express = require('express');
const app = express();

app.use(express.json());

// Middleware for input validation
const validateItem = (req, res, next) => {
    const { name, price } = req.body;
    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Name is required and must be a string.' });
    }
    if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: 'Price must be a positive number.' });
    }
    next();
};

// Example route
app.post('/items', validateItem, (req, res) => {
    const { name, price } = req.body;
    // Assume we save the item here
    res.status(201).json({ message: 'Item created!', item: { name, price } });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let items = [
  { id: 1, name: 'Widget', price: 9.99 },
  { id: 2, name: 'Gadget', price: 24.99 },
  { id: 3, name: 'Doohickey', price: 4.99 },
];

app.get('/items', (req, res) => {
  res.json(items);
});

app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

app.post('/items', (req, res) => {
  const item = { id: items.length + 1, ...req.body };
  items.push(item);
  res.status(201).json(item);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;
