var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://127.0.0.1');

var device_json={"secretkey":"93cf82461c324858961b6cc70fc5033d","deviceprofile":{"devicename":"hhhh","IP":"1.1.1.1","location":"23","tags":"33","latitude":"33","longitude":"22","sensors":[{"name":"22","sid":"22","channels":[{"name":"22","type":"22","unit":"22","samplingperiod":"22"}]},{"name":"22","sid":"22","channels":[{"name":"22","type":"22","unit":"22","samplingperiod":"22"}]}],"actuators":[{"name":"22name"}]}};


 
client.on('connect', function () {
  //向presence主题发布消息
  setInterval(function(){
  	client.publish('presence', 'Hello mqtt');
  	console.log('\n## Device pub: Hello mqtt')
  },3000);
  
  setInterval(function(){
  	device_json['deviceprofile']['devicename']='devicename'+new Date().getTime();
  	client.publish('ICS', JSON.stringify(device_json));
  	console.log('\n##-- Device pub: '+ JSON.stringify(device_json))
  },1000);
});
  