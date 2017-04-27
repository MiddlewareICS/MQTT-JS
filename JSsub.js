var mqtt    = require('mqtt');

var localUrl = 'mqtt://127.0.0.1';
var PiUrl = 'mqtt://192.168.199.170';//树莓派ip
var heweiUrl = 'mqtt://192.168.199.231';//hewei ip

//Sclient :server端为代理时，Dclient ：device端为代理时

// --------------------- Server Sub --------------------------------
var Sclient = mqtt.connect(heweiUrl); 
var x=11,y=22;
Sclient.on('connect', function () {
  Sclient.subscribe('toDevice');
});
Sclient.on('message', function (topic, message) {
  if(topic === 'toDevice'){
  	console.log('\n-- Device Sub:');
  	eval(message.toString());
  }	
  else 
  	console.log('\n-- Device Sub:'+ message.toString());
});


// --------------------- Device Sub --------------------------------
var Dclient = mqtt.connect(localUrl);
Dclient.on('connect', function () {
  Dclient.subscribe('Environment');
  Dclient.subscribe('RaspberryPiInfo');
});
 
Dclient.on('message', function (topic, message) {
  	console.log('## Device Sub:'+ message.toString());
    Sclient.publish(topic,message.toString());           //发送给服务器
  // client.end();
});