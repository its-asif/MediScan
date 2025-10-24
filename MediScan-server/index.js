const http = require('http');
const app = require('./src/app');
const { connectDB } = require('./src/config/db');
const config = require('./src/config/env');

const server = http.createServer(app);

async function start() {
  try {
    await connectDB();
    server.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

function shutdown(signal) {
  console.log(`Received ${signal}. Shutting down...`);
  server.close(() => {
    process.exit(0);
  });
}

['SIGINT', 'SIGTERM'].forEach((sig) => process.on(sig, () => shutdown(sig)));

start();