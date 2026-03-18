const express = require('express');
const app = express();
app.use(express.json());

// Input validation middleware
function validateItem(req, res, next) {
    const { name, price } = req.body;
    // Check for valid name
    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Invalid input: name must be a non-empty string.' });
    }
    // Check for valid price
    if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: 'Invalid input: price must be a positive number.' });
    }
    next();
}

// POST /items route
app.post('/items', validateItem, (req, res) => {
    const { name, price } = req.body;
    // Assume we save the item here
    res.status(201).json({ message: 'Item added successfully', item: { name, price } });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Logging middleware
const logger = (req, res, next) => {
    const start = Date.now();
    const requestId = req.headers['x-request-id'] || 'N/A';

    res.on('finish', () => {
        const responseTime = Date.now() - start;
        console.log(JSON.stringify({
            timestamp: new Date().toISOString(),
            method: req.method,
            path: req.originalUrl,
            statusCode: res.statusCode,
            responseTime,
            requestId,
        }));
    });
    next();
};

app.use(logger);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});