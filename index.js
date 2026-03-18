const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to generate request ID
const { v4: uuidv4 } = require('uuid');
app.use((req, res, next) => {
    req.requestId = uuidv4();
    next();
});

// Root endpoint to list available API versions
app.get('/', (req, res) => {
    res.json({ versions: ['/v1', '/v2'] });
});

// v1 Routes
const v1Router = express.Router();
v1Router.get('/items', (req, res) => {
    // handle v1 get items
    res.json({ message: 'v1 Items retrieved.' });
});
app.use('/v1', v1Router);

// v2 Routes
const v2Router = express.Router();
v2Router.get('/items', (req, res) => {
    const metadata = {
        version: 'v2',
        timestamp: new Date().toISOString(),
        request_id: req.requestId
    };
    // handle v2 get items
    res.json({ message: 'v2 Items retrieved.', metadata });
});
app.use('/v2', v2Router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});