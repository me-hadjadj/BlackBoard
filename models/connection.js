var mongoose = require("mongoose");

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(
  "mongodb+srv://blackboard:KRsEro8HYOIzopFX@cluster.dq2na.mongodb.net/blackboard",
  options,
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Connection à la base de données réussi");
    }
  }
);
