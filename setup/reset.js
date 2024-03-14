require('dotenv').config({ path: __dirname + '/../.variables.env' });

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/erp-pro');
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

async function deleteData() {
  try {
    await mongoose.connection.on('connected', async () => {
      const collections = await mongoose.connection.db.collections();

      // Loop through each collection and delete all documents
      for (const collection of collections) {
        await collection.deleteMany({});
      }
      console.log('👍👍👍👍👍👍👍👍 All data cleared in the database!');
      process.exit();
    });
  } catch (e) {
    console.log('\n👎👎👎👎👎👎👎👎 Error! The Error info is below');
    console.log(e);
    process.exit();
  }
}
deleteData();
