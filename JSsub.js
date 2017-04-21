var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://127.0.0.1');
 
client.on('connect', function () {
  //订阅presence主题
  client.subscribe('presence');
 
});
 
client.on('message', function (topic, message) {
  //收到的消息是一个Buffer
  console.log(message.toString());
  // client.end();
});