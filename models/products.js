var mongoose = require('mongoose');


   var productsSchema = mongoose.Schema({
  
title: String,
description: String,
price: Number,
stock: Number,
weight: Number,
img: String

 });
 
 var productsModel = mongoose.model('articles', productsSchema);

 module.exports = productsModel;