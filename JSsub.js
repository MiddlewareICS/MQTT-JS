var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://127.0.0.1');
 
var x=11,y=22;

client.on('connect', function () {

  client.subscribe('Temperature');
  client.subscribe('toDevice');
 
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