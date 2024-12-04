//CREDENCIALES MQTT
var mqtt = require('mqtt');
var options = {
  port: 1883,
  host: '18.116.101.158',
  clientId: 'Churchil_Bopstem' + Math.round(Math.random() * (0- 10000) * -1) ,
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
  client.subscribe('bopstem/R', function (err) {
    console.log("Subscripción exitosa!")
  });
})


client.on('message', function (topic, message) {
  if (topic == "bopstem/R"){
    var msg = message.toString();
   msg = msg.slice(1, 4);
   console.log(msg);
   retorno = parseFloat(msg);
   retorno = retorno/10;
   console.log(retorno);



  var hour;
  hour = new Date();
  hour.setHours( hour.getHours() - 5);
  hour = hour.getUTCHours() + ':' + ('00' + hour.getUTCMinutes()).slice(-2) + ':' + ('00' + hour.getUTCSeconds()).slice(-2);
  hour = hour.substring(0,2);
  hour = parseInt(hour);

if (hour > 5 && hour < 24 )
{
  var sp = 23.34-retorno;
  var spch3 = sp-2;
  sp = sp*10;
  spch3 = spch3*10;
  sp = Math.round(sp);
  spch3 = Math.round(spch3);
  console.log (sp);
  sp = sp.toString();
  spch3 = spch3.toString();
  console.log(sp);
  client.publish('Bopstem/SetPoint',sp);
  client.publish('Bopstem/SetPointch3',spch3);
} else {
  var sp = 23.34-retorno +1;
  var spch3 = sp-2;
  sp = sp*10;
  spch3 = spch3*10;
  sp = Math.round(sp);
  spch3 = Math.round(spch3);
  console.log (sp);
  sp = sp.toString();
  spch3 = spch3.toString();
  console.log(sp);
  client.publish('Bopstem/SetPoint',sp);
  client.publish('Bopstem/SetPointch3',spch3);

}











   }

});
