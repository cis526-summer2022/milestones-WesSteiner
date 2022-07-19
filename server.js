require('./src/database');
require('./src/templates')

const app = require('./src/app');
const http = require('http');

const port = 3000;

// Start listening for requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});