require('module-alias/register');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const http = require('http');
// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 14 || (major === 14 && minor <= 0)) {
  console.log('Please go to nodejs.org and download version 8 or greater. 👌 ');
  process.exit();
}

// import environmental variables from our variables.env file
require('dotenv').config({ path: '.variables.env' });

// Connect to our Database and handle any bad connections
// mongoose.connect(process.env.DATABASE);

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/erp-pro", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🚫 Error → : ${err.message}`);
});

const glob = require('glob');
const path = require('path');
glob.sync('./models/**/*.js').forEach(function (file) {
  const model = require(path.resolve(file));
});

var g_checkout = false;
// Start our app!
const app = require('./app');
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'https://eli.mundoeli.com',
    methods: ['GET', 'POST'],
    credentials: true
  }
});
io.on('connection', (socket) => {
  socket.on('checkoutData', (data) => {
    if (typeof data === 'string') {
      io.emit('checkoutData', g_checkout[data]);
    } else {
      g_checkout[data.user_id] = data;
      io.emit('checkoutData', data);
    }
    console.log(data, g_checkout, '444')
  })
})
server.listen(process.env.PORT || 8880, () => {
  console.log(`Express running → On PORT : ${server.address().port}`);
})

