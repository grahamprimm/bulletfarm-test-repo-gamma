const express = require('express');
const app = express();
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');

// Logging middleware
app.use((req, res, next) => {
    const requestId = uuidv4();
    const start = Date.now();

    res.on('finish', () => {
        const responseTime = Date.now() - start;
        console.log(JSON.stringify({
            timestamp: new Date().toISOString(),
            method: req.method,
            path: req.originalUrl,
            statusCode: res.statusCode,
            responseTime,
            requestId
        }));
    });

    next();
});

// ... your existing routes would go here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
