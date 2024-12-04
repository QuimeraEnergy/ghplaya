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
  clientId: 'GH_PLAYA_DB' + Math.round(Math.random() * (0- 10000) * -1) ,
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
 client.subscribe("bopstem/I");
client.subscribe("bopstem/R");
client.subscribe("bopstem/caudal");
client.subscribe("bopstem/chiller3/flow");

})