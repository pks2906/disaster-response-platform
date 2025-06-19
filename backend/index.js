const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const disasterRoutes = require('./routes/disasterRoutes');
const geocodeRoutes = require('./routes/geocodeRoutes');
const socialMediaRoutes = require('./routes/socialMediaRoutes');
const officialUpdatesRoutes = require('./routes/officialUpdatesRoutes');
const imageVerifyRoutes = require('./routes/imageVerifyRoutes');


const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

global.io = io;

app.use(cors());
app.use(express.json());
app.use('/api', disasterRoutes);
app.use('/api', geocodeRoutes);
app.use('/api', socialMediaRoutes);
app.use('/api', officialUpdatesRoutes);
app.use('/api', imageVerifyRoutes);


io.on('connection', (socket) => {
  console.log('WebSocket client connected');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
