require('module-alias/register');
const socketIo = require('socket.io');
const http = require('http');

const mongoose = require('mongoose');
var g_checkout = false;

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 14 || (major === 14 && minor <= 0)) {
  console.log('Please go to nodejs.org and download version 8 or greater. 👌\n ');
  process.exit();
}

// import environmental variables from our variables.env file
require('dotenv').config({ path: '.variables.env' });

// Connect to our Database and handle any bad connections
// mongoose.connect(process.env.DATABASE);

mongoose.connect("mongodb://eli_usr:AKIAVEVPEOCYEWSHRWPU@72.14.181.46:27017/eli_erp");

mongoose.set('strictQuery', false);

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🚫 Error → : ${err.message}`);
});

const glob = require('glob');
const path = require('path');
glob.sync('./models/**/*.js').forEach(function (file) {
  const model = require(path.resolve(file));
});