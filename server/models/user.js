require('dotenv').config();
const mongoose = require('mongoose');


const DB_URI = process.env.MONGO_URI;
mongoose.connect(DB_URI).then(() => {
  console.log('Connected to MongoDB Atlasss');
}).catch((err) => {
  console.error('Failed to connect to MongoDB Atlas:', err);
});


const userSchema = new mongoose.Schema({
  name: String,
  Email: String, // Corrected to lowercase 'email' for consistency
  Password: String
});

module.exports = mongoose.model('userModel', userSchema); // Corrected model name to 'User'