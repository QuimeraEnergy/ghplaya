
var mysql = require('mysql');

//CREDENCIALES MYSQL
var con = mysql.createConnection({
  host: "quimeraenergy.chuxlpmqpogy.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "Quimera098",
  database: "GH_Playa"
});



//CREDENCIALES MQTT
var mqtt = require('mqtt');
var options = {
  port: 1883,
  host: '18.116.101.158',
  clientId: 'GHPlaya_DB' + Math.round(Math.random() * (0- 10000) * -1) ,
  username: 'web_client',
  password: '121212',
  keepalive: 60,
  reconnectPeriod: 1000,
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  clean: true,
  encoding: 'utf8'
};

var client = mqtt.connect("mqtt://18.116.101.158", options);

//SE REALIZA LA CONEXION
client.on('connect', function () {
  console.log("Conexión  MQTT Exitosa!");

  client.subscribe('ghplaya/monitoring', function (err) {
    console.log("Subscripción exitosa!")
  });
})


client.on('message', function (topic, message) {
  console.log("Mensaje recibido desde -> " + topic + " Mensaje -> " + message.toString());
});



//nos conectamos
con.connect(function(err){
  if (err) throw err;
  //una vez conectados, podemos hacer consultas.
  console.log("Conexión a MYSQL exitosa!!!")
});



let meters = [];
var i = 0;

client.on('message', function (topic, message){
if (topic == "ghplaya/monitoring"){
var msg = message.toString();
meters.push(msg);
i = i+1;
console.log(i);


if(i == 15){

var TAC1 = meters[0];
var TAC2 = meters[1];
var Torres = meters[2];
var TPD2= meters[3];
var TPC2 = meters[4];
var Chiller2 = meters[5];
var TPA11 = meters[6];
var BombasAH= meters[7];
var TPC11 = meters[8];
var TPK1 = meters[9];
var TPA2 = meters[10];
var TPBR = meters[11];
var TW3 = meters[12];
var Chiller1 = meters[13];
var Chiller3 = meters[14];


var date;
date = new Date();
date.setHours( date.getHours() + 4 );
date = date.getUTCFullYear() + '-' +
('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
('00' + date.getUTCDate()).slice(-2) + ' ' +
('00' + date.getUTCHours()).slice(-2) + ':' +
('00' + date.getUTCMinutes()).slice(-2) + ':' +
('00' + date.getUTCSeconds()).slice(-2);
console.log(date);

var hour;
hour = new Date();
hour.setHours( hour.getHours() -5);
hour = hour.getUTCHours() + ':' + ('00' + hour.getUTCMinutes()).slice(-2) + ':' + ('00' + hour.getUTCSeconds()).slice(-2);
console.log(hour);

var day;
day = new Date();
day.setHours( day.getHours() -5);
day = day.getUTCFullYear() + '-' + ('00' + (day.getUTCMonth()+1)).slice(-2) + '-' + ('00' + day.getUTCDate()).slice(-2);
console.log(day);



var query = "INSERT INTO `GH_Playa`.`GH_Playa_Monitoring_kW_5min` (`Monitoring_TAC1`, `Monitoring_TAC2`,`Monitoring_Torres`, `Monitoring_TPD2`, `Monitoring_TPC2`, `Monitoring_Chiller2`, `Monitoring_TPA11`, `Monitoring_BombasAH`, `Monitoring_TPC11`, `Monitoring_TPK1`, `Monitoring_TPA2`, `Monitoring_TPBR`, `Monitoring_TW3`, `Monitoring_Chiller1`, `Monitoring_Chiller3`,  `Monitoring_Date`, `Monitoring_Hour`) VALUES  ("+ TAC1 +", "+ TAC2 +", " + Torres + ", "+ TPD2 +", "+ TPC2 +", "+ Chiller2 +", "+ TPA11 +", "+ BombasAH +", "+ TPC11 +", "+ TPK1 +", "+ TPA2 +", "+ TPBR +", "+ TW3 +", "+ Chiller1 +", "+ Chiller3 +", '"+ day +"', '"+ hour +"' );";
con.query(query, function (err, result, fields) {
if (err) throw err;
console.log("Fila insertada correctamente");
});


i = 0;
meters = [];

}

};

});
