const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const __path = process.cwd();

// Increase EventEmitter listener limit
require('events').EventEmitter.defaultMaxListeners = 500;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(__path));

// Pairing API
app.use('/code', require('./pair'));

// Pair page
app.get('/pair', (req, res) => {
    res.sendFile(path.join(__path, 'pair.html'));
});

// Main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__path, 'main.html'));
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        bot: 'ALEXA-MIN'
    });
});

// Export app for Vercel
module.exports = app;

// Local development
if (require.main === module) {
    const PORT = process.env.PORT || 8000;

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`
  ALEXA-MINI Server ON
  Port: ${PORT}
  URL: http://0.0.0.0:${PORT}
============================
        `);
    });
}