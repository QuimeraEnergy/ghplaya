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
  client.subscribe('bopstem/R', function (err) {
    console.log("Subscripción exitosa!")
  });
client.subscribe("bopstem/I");
client.subscribe("bopstem/vfdtorres");
client.subscribe("bopstem/caudal");
client.subscribe("bopstem/setpoint");
client.subscribe("bopstem/HR");
client.subscribe("bopstem/extT");
//client.subscribe("bopstem/vfdbombas");
client.subscribe("bopstem/cond/R");
client.subscribe("bopstem/cond/I");

})


retorno ="";
inyeccion ="";
vfdtorres ="";
caudal ="";
sp ="";
hr ="";
extT ="";
cretorno ="";
cinyeccion ="";

client.on('message', function (topic, message) {




  if (topic == "bopstem/R"){
    var msg = message.toString();
   msg = msg.slice(1, 4);
   retorno = parseFloat(msg);
   retorno = retorno/10;
 }

 if (topic == "bopstem/I"){
   var msg = message.toString();
  msg = msg.slice(1, 4);
  inyeccion = parseFloat(msg);
  inyeccion = inyeccion/10;
}

if (topic == "bopstem/vfdtorres"){
  var msg = message.toString();
 msg = msg.slice(1, 6);
 vfdtorres = parseFloat(msg);
 vfdtorres = vfdtorres/100;
}


if (topic == "bopstem/caudal"){
  var msg = message.toString();
 msg = msg.slice(1, 4);
 caudal = parseFloat(msg);
 caudal = caudal*4.402;
 caudal = parseInt(caudal);
}

if (topic == "bopstem/setpoint"){
  var msg = message.toString();
 msg = msg.slice(1, 4);
 sp = parseFloat(msg);
 sp = sp/10;
}

if (topic == "bopstem/HR"){
  var msg = message.toString();
 msg = msg.slice(1, 4);
 hr = parseFloat(msg);
 hr = hr/10;
}


if (topic == "bopstem/extT"){
  var msg = message.toString();
 msg = msg.slice(1, 4);
 extT = parseFloat(msg);
 extT = extT/10;
}

if (topic == "bopstem/cond/R"){
  var msg = message.toString();
 msg = msg.slice(1, 4);
 cretorno = parseFloat(msg);
 cretorno = cretorno/10;
}

if (topic == "bopstem/cond/I"){
  var msg = message.toString();
 msg = msg.slice(1, 4);
 cinyeccion = parseFloat(msg);
 cinyeccion = cinyeccion/10;
}


});



con.connect(function(err){
  if (err) throw err;

  //una vez conectados, podemos hacer consultas.
  console.log("Conexión a MYSQL exitosa!!!")

  //hacemos la consulta
  var query = "SELECT * FROM bopstem_15min;";
  con.query(query, function (err, result, fields) {
    if (err) throw err;
   if(result.length>0){
     console.log(result);
   }
 });
});


setInterval(function(){
//console.log(retorno);
//console.log(inyeccion);
//console.log(vfdtorres);
//console.log(caudal);
//console.log(sp);
//console.log(hr);
//console.log(extT);
//console.log(cretorno);
//console.log(cinyeccion);



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

var query = "INSERT INTO `GH_Playa`.`bopstem_15min` (`bopstem_Retorno`, `bopstem_Inyeccion`, `bopstem_setpoint`, `bopstem_caudal`, `bopstem_hr`, `bopstem_extT`, `bopstem_cretorno`, `bopstem_cinyeccion`, `bopstem_vfdtorres`, `bopstem_date`, `bopstem_time`) VALUES ("+ retorno +", "+ inyeccion +", "+ sp +", "+ caudal +", "+ hr +", "+ extT +", "+ cretorno +", "+ cinyeccion +", "+ vfdtorres +", '"+ day +"', '"+ hour +"' );";
con.query(query, function (err, result, fields) {
if (err) throw err;
console.log("Fila insertada correctamente");
});

}, 300000);



//para mantener la sesión con mysql abierta
setInterval(function () {
  var query ='UPDATE bopstem_15min SET bopstem_time = CONCAT(0,bopstem_time) WHERE LENGTH(bopstem_time) = 7';

  con.query(query, function (err, result, fields) {
    if (err) throw err;
  });

}, 5000);
