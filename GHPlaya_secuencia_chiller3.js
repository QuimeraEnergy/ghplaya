var mqtt = require('mqtt');
var options = {
  port: 1883,
  host: '18.116.101.158',
  clientId: 'GHPLAYA_CHILELR3' + Math.round(Math.random() * (0- 10000) * -1) ,
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



retorno ="";


//SE REALIZA LA CONEXION
client.on('connect', function () {
  client.subscribe('bopstem/R', function (err) {
    console.log("Subscripción exitosa!")
  });
})



client.on('message', function (topic, message) {

  if (topic == "bopstem/R"){
    var msg = message.toString();
   msg = msg.slice(1, 4);
   retorno = parseFloat(msg);
   retorno = retorno/10;
}
});






 setInterval(function(){

var hour;
hour = new Date();
hour.setHours( hour.getHours() - 5);
hour = hour.getUTCHours() + ':' + ('00' + hour.getUTCMinutes()).slice(-2) + ':' + ('00' + hour.getUTCSeconds()).slice(-2);
hour = hour.substring(0,2);
hour = parseInt(hour);


console.log(hour)
console.log(retorno);



if (hour > 6 && hour < 24) {

if (retorno < 13.4)

  {
	 client.publish('bopstem/ch3/onoff',false);
	  console.log("apaga chiller 3")
  } else if (retorno > 14.1)
   {
	  client.publish('bopstem/ch3/onoff',"true");

   } else {console.log("no hagas nada")}

} else {
 client.publish('bopstem/ch3/onoff',false);
}


if (hour > 15 && hour < 21) {

if (retorno < 13.6)

  {
	 client.publish('bopstem/ch3c2/onoff',false);
	  console.log("apaga chiller 3")
  } else if (retorno > 14.3)
   {
	  client.publish('bopstem/ch3c2/onoff',"true");

   } else {console.log("no hagas nada")}

} else {
 client.publish('bopstem/ch3c2/onoff',false);
}





 }, 1200000);
