var mqtt = require('mqtt');
var options = {
  port: 1883,
  host: '18.116.101.158',
  clientId: 'GHPLAYA_TORRES' + Math.round(Math.random() * (0- 10000) * -1) ,
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
  client.subscribe('Bopstem/cond/RI', function (err) {
    console.log("Subscripción exitosa!")
  });
  client.subscribe('Bopstem/coolInver_towers', function (err) {
    console.log("Subscripción exitosa!")
  });
})

client.on('message', function (topic, message) {
  if (topic == "Bopstem/cond/RI"){
  var msg = message.toString();
  msg = msg.split(",");
  retorno = msg[0].toString();
  inyeccion = msg[1].toString();
  inyeccion = parseFloat(inyeccion);
  inyeccion = inyeccion/10;
  //console.log(retorno);
   //client.publish('Bopstem/SetPoint',sp);

   }
});


client.on('message', function (topic, message) {
  if (topic == "Bopstem/coolInver_towers"){
    vfd = message.toString();
    vfd = vfd.replace('[','');
    vfd = parseFloat(vfd);
  console.log(vfd);
if (inyeccion < 28.5 & vfd > 2000){
vfd = vfd - 1000;
vfd = vfd.toString();
client.publish('Bopstem/coolInver_tower',vfd);

}

if (inyeccion >29 & vfd < 10000){
vfd = vfd + 1000;
vfd = vfd.toString();
client.publish('Bopstem/coolInver_tower',vfd);
}

     }
     });
