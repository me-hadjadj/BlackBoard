var ctx = document.getElementById("myChart");
var ctx1 = document.getElementById("myChart1");
var ctx2 = document.getElementById("chartpie");
var ctx3 = document.getElementById("linechart");

var dataChart = document.getElementById('myChart');
var femmaleTotal= dataChart.dataset.female;
var maleTotal= dataChart.dataset.male;

var dataMailChart = document.getElementById('myChart1');
var messagesReadFromFront = dataMailChart.dataset.read;
var messagesUnreadFromFront = dataMailChart.dataset.unread;

var dataOrders = document.getElementById('chartpie');
var ordersPayedExpFromFront =  dataOrders.dataset.payedexp;
var ordersPayedNotExpFromFront =  dataOrders.dataset.payednotexp;

var dataSalesByMonth = document.getElementById('linechart');
var SalesByMonthFromFront =  dataSalesByMonth.dataset.salesbymonth;
var NewSalesByMonthFromFront = JSON.parse((SalesByMonthFromFront));

var tabSales = [
    { _id: { monthSales: 1, annualSales: 2019 }, total: 0 },
    { _id: { monthSales: 2, annualSales: 2019 }, total: 0 },
    { _id: { monthSales: 3, annualSales: 2019 }, total: 0 },
    { _id: { monthSales: 4, annualSales: 2019 }, total: 0 },
    { _id: { monthSales: 5, annualSales: 2019 }, total: 0 },
    { _id: { monthSales: 6, annualSales: 2019 }, total: 0 },
    { _id: { monthSales: 7, annualSales: 2019 }, total: 0 },
    { _id: { monthSales: 8, annualSales: 2019 }, total: 0 },
    { _id: { monthSales: 9, annualSales: 2019 }, total: 0 },
    { _id: { monthSales: 10, annualSales: 2019 }, total: 0 },
    { _id: { monthSales: 11, annualSales: 2019 }, total: 0 },
    { _id: { monthSales: 12, annualSales: 2019 }, total: 0 }
];
for (var i =0; i < NewSalesByMonthFromFront.length; i++){
    var index = tabSales.findIndex(x=> x._id.monthSales == NewSalesByMonthFromFront[i]._id.monthSales);
    tabSales[index].total = NewSalesByMonthFromFront[i].total
}
console.log(tabSales);
new Chart(ctx, {

    type: 'bar',
    data: {
        labels: ["Male", "Female"],
        datasets: [{

            label:"Users gender",
            data: [ maleTotal, femmaleTotal ],
            backgroundColor: [
                '#686de0',
                '#ff7979'
            ],
            borderColor : [
                '#4834d4',
                '#eb4d4b'
            ],
            borderWidth: 2
        }]

 },
 options: {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}
});


new Chart(ctx1, {

 type: 'doughnut',
 data: {
   labels: [ "Read", "Unread" ],
   datasets: [{

     data:[ messagesReadFromFront , messagesUnreadFromFront ],
     backgroundColor: [
        '#badc58',
        '#ff7979'
        ],
    borderColor : [
        '#6ab04c',
        '#eb4d4b'
    ],
    borderWidth: 2
   
   }]
 }
});

new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: [ "Payed and not expedited", "Payed and expedited" ],
        datasets: [{
     
          data:[ ordersPayedExpFromFront , ordersPayedNotExpFromFront ],
          backgroundColor: [
             '#dff9fb',
             '#e056fd'
             ],
             borderColor : [
                '#c7ecee',
                '#be2edd'
            ],
            borderWidth: 2
        
        }]
      }})

new Chart(ctx3, {
        type: 'line',
        
        data: {
            labels: [ "Janv", "Fév", "Mar", "Avr", "Mai", "Juin", "Juillet", "Aout", "Sept", "Oct", "Nov", "Dec"  ],
            datasets: [{
            label: "Sales by month",
         
              data:[ tabSales[0].total , tabSales[1].total, tabSales[2].total, tabSales[3].total, tabSales[4].total, tabSales[5].total, tabSales[6].total, tabSales[7].total, tabSales[8].total, tabSales[9].total, tabSales[10].total, tabSales[11].total ],
              backgroundColor: [
                '#c7ecee',
                ],
                borderColor : [
                   '#e056fd',
                
               ],
               borderWidth: 1
            
            }]
          }})