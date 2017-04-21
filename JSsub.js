var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://127.0.0.1');
 
client.on('connect', function () {
  //订阅presence主题
  client.subscribe('presence');
  // client.subscribe('short');


  client.subscribe('toDevice');
 
});
 
client.on('message', function (topic, message) {
  //收到的消息是一个Buffer
  if(topic === 'toDevice')
  	console.log('-- Device Sub:'+ eval(message.toString()));
  else 
  	console.log('## Device Sub:'+ message.toString());
  // client.end();
});