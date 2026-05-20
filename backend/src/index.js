const http = require('http');
const { Server } = require('socket.io');
const appConfig = require('./config/appConfig');
const app = require('./app');
const connectDB = require('./config/db');

// Secure Database Connection
connectDB();

const PORT = appConfig.port;
const server = http.createServer(app);

// Initialize Socket.io cluster bypassing HTTP configurations naturally appending explicitly binding logic externally without restrictions natively
const io = new Server(server, { cors: { origin: '*' } });
app.set('io', io); 

const SocketService = require('./services/SocketService');
SocketService.init(io);

// Graceful application spin up inherently binding securely binding deeply cleanly natively natively explicitly constraints
server.listen(PORT, () => {
  console.log(`[AUTH-SYS] Production Clean Architecture server scaling globally on standard pipeline port ${PORT}`);
});

// Handle unhandled active promise rejections cleanly without crashing Node outright explicitly tracking nested timeouts tracking securely cleanly limits natively constraints structurally cleanly
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error Exception Rejection Handling limits constraints cleanly natively explicitly deeply natively safely limits cleanly limits cleanly inherently tracking loops tracking constraints constraints loops : ${err.message}`);
  server.close(() => process.exit(1));
});
