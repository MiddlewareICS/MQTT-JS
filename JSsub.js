var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://127.0.0.1');
// var client = mqtt.connect('mqtt://192.168.199.170'); //树莓派ip
 
var x=11,y=22;

client.on('connect', function () {
  client.subscribe('Environment');
  client.subscribe('RaspberryPiInfo');
  client.subscribe('toDevice');

  client.subscribe('Temperature');
});
 
client.on('message', function (topic, message) {
  //收到的消息是一个Buffer
  if(topic === 'toDevice'){
  	console.log('\n-- Device Sub:');
  	eval(message.toString());
  }	
  else 
  	console.log('## Device Sub:'+ message.toString());
  // client.end();
});


// -----------------------------------------------------
// var client2 = mqtt.connect('mqtt://192.168.199.170');
// client2.on('connect', function () {
//   client2.subscribe('Environment');
// });
 
// client2.on('message', function (topic, message) {
//   	console.log('～～ Device Sub:'+ message.toString());
//   // client.end();
// });