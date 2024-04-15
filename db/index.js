const mongoose = require('mongoose');


module.exports = function(){
mongoose.connect('mongodb://localhost:27017/sivatravel', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
  
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Disconnected from MongoDB');
      process.exit(0);
    });
  });
}