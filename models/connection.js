var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://lacapsule:AInUolfyadVEx8g1@cluster0.o6j2r.mongodb.net/blackboard?retryWrites=true&w=majority', 
      options,         
      function(err) {
          if (err){
            console.log(err);
          } else {
            console.log('Connection à la base de données réussi');
          }
       
      }
   );
