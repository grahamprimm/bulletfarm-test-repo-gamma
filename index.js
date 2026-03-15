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
