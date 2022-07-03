var mongoose = require('mongoose');


   var usersSchema = mongoose.Schema({
  
      firstName: String,
      lastName: String,
      email: String,
      password: String,
      age: Number,
      status: String,
      gender: String,
      dateInsert: Date,
      messages: [{
          title: String,
          content: String,
          dateExp: Date,
          read: Boolean,
          sender: String
        }],
        tasks: [{
            name: String,
            category: String,
            owner: String,
            dateInsert: Date,
            dateDue: Date,
            dateCloture: Date
        }]
      

 });



 
 var usersModel = mongoose.model('users', usersSchema);

 module.exports = usersModel;