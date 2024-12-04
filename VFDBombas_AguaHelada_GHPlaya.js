//CREDENCIALES MQTT
var mqtt = require('mqtt');
var options = {
  port: 1883,
  host: '18.116.101.158',
  clientId: 'BOPSTEM_GHPLAYA_VFDBombas' + Math.round(Math.random() * (0- 10000) * -1) ,
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
  client.subscribe('bopstem/VFD/aguahelada', function (err) {
    console.log("Subscripción exitosa!")
  });
  client.subscribe("bopstem/R")
  })

vfd ="";



client.on('message', function (topic, message) {


  if (topic == "bopstem/VFD/aguahelada"){
    var msg = message.toString();
    console.log(msg);
	//console.log(OutTChiller2);
 }

   if (topic == "bopstem/R"){
    var msg = message.toString();
	msg = msg.slice(1, 4);
   console.log(msg);
   retorno = parseFloat(msg);
   retorno = retorno/10;
   //console.log(retorno);

   vfd = retorno*10-70;
   //console.log(vfd);

   if (vfd > 100) {
    vfd = 100;
    } else if (vfd < 60) {
   vfd = 60;
}


 }

 });


 setInterval(function(){
	 vfd = vfd*10;
	 console.log(vfd);
	 vfd = vfd.toString();
	 client.publish('Bopstem/aguaheladaPumps',sp);
	 }, 300000);
