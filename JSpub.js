var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://127.0.0.1');
 
client.on('connect', function () {
  //向presence主题发布消息
  setInterval(function(){
  	client.publish('presence', 'Hello mqtt');
  	console.log('## Device pub: Hello mqtt')
  },3000);
  
  // setInterval(function(){
  // 	client.publish('short', '------');
  // },1000);
});
  