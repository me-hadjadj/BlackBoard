var express = require('express');
var router = express.Router();

var productsModel = require('../models/products.js');
var ordersModel = require('../models/orders.js');
var usersModel = require('../models/users.js');


/* GET home page. */
router.get('/', async function(req, res, next) {
  var users = usersModel;
  var usersList = await users.findById('5c52e4efaa4beef85aad5e52');
  //console.log(usersList)
  var products = productsModel;
  var productsList = await products.find();
  //console.log(productsList);
  var productsOutOfStock = 0;
  for (var i =0; i < productsList.length; i++ ){
     if(productsList[i].stock == 0) {
     productsOutOfStock +=1;
      };
    };
    var messagesUnread = 0;
    for (var i = 0; i < usersList.messages.length; i++ ){
      if(usersList.messages[i].read == false) {
        messagesUnread +=1;
       }
     }
     var taskToDo = 0;
    for (var i = 0; i < usersList.tasks.length; i++ ){
      if(usersList.tasks[i].dateCloture == null) {
        taskToDo +=1;
       }
     }

    //console.log(messagesUnread);
    //console.log(taskToDo);

  res.render('index',{usersList, productsList, productsOutOfStock, messagesUnread, taskToDo});
});

/* GET tasks page. */
router.get('/tasks-page', async function(req, res, next) {
  var users = usersModel;
  var usersList = await users.findById('5c52e4efaa4beef85aad5e52');
  res.render('tasks', {usersList});
});

/* GET Messages page. */
router.get('/messages-page', async function(req, res, next) {
  var users = usersModel;
  var usersList = await users.findById('5c52e4efaa4beef85aad5e52');
  
  res.render('messages',{usersList});
});

/* GET Users page. */
router.get('/users-page', async function(req, res, next) {
  var users = usersModel;
  var usersList = await users.find( { status: "customer" } );
  //console.log(usersList);

  res.render('users',{usersList});
});

/* GET Catalog page. */
router.get('/catalog-page', async function(req, res, next) {
  var products = productsModel;
  var productsList = await products.find();
  //console.log(productsList);

  res.render('catalog', {productsList});
});

/* GET Orders-list page. */
router.get('/orders-list-page', async function(req, res, next) {
  var orders = ordersModel;
  var ordersList = await orders.find();
  //console.log(ordersList);
  res.render('orders-list',{ordersList} );
});

/* GET Order detail page. */
router.get('/order-page', async function(req, res, next) {
  var orders = ordersModel;
  var ordersList = await orders.findById(req.query.ref).populate('articles');
  //console.log(ordersList);


  res.render('order', {ordersList });
});

/* GET chart page. */
router.get('/charts', async function(req, res, next) {
  var aggregate = usersModel.aggregate();
  aggregate.group( { _id : "$gender", userCount: { $sum: 1 } });

var dataGender = await aggregate.exec();

//Recupération des mail lu/non-lu de l'admin pour la BI
var users = usersModel;
var usersList = await users.findById('5c52e4efaa4beef85aad5e52'); 

var messagesRead = 0;
var messagesUnread = 0;
for (var i = 0; i < usersList.messages.length; i++){
if ( usersList.messages[i].read == true){
messagesRead +=1;
  } else if ( usersList.messages[i].read == false){
messagesUnread +=1
}
};

//Recupération du nombre de commandes payées expédiées et payées non expédiées pour la BI

var aggregateOrder = ordersModel.aggregate();
aggregateOrder.match({"status_payment": 'validated'});
aggregateOrder.group( { _id : "$status_shipment", userCount: { $sum: 1 } });

var dataOrder = await aggregateOrder.exec();

var ordersPayedAndExp = dataOrder[0].userCount
var ordersPayedAndNotExp = dataOrder[1].userCount

// Récupération des données pour faire ressortir le CA mensuel
var aggregateSalesByMonth = ordersModel.aggregate();
aggregateSalesByMonth.match({"status_payment": 'validated'});
aggregateSalesByMonth.group( {
   _id : {
  monthSales : { $month : "$date_payment"},
  annualSales : { $year : "$date_payment"},
  
   },
   total : {$sum: '$total'}
  });
  var dataSalesByMonth = await aggregateSalesByMonth.exec();
  console.log(dataSalesByMonth);
  
  res.render('charts', {dataGender, messagesRead, messagesUnread, ordersPayedAndExp, ordersPayedAndNotExp, dataSalesByMonth});
});



module.exports = router;
