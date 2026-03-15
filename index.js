const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Input validation middleware
function validateItem(req, res, next) {
    const { name, price } = req.body;
    let errors = [];

    // Validate name
    if (typeof name !== 'string' || name.trim() === '') {
        errors.push('Name is required and must be a string.');
    }

    // Validate price
    if (typeof price !== 'number' || price <= 0) {
        errors.push('Price is required and must be a positive number.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

// POST /items endpoint
app.post('/items', validateItem, (req, res) => {
    // Handle adding item logic here
    res.status(201).send('Item added');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
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
