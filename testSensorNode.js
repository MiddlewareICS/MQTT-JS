var mqtt    = require('mqtt');

var localUrl = 'mqtt://127.0.0.1';
var PiUrl = 'mqtt://192.168.199.170';//树莓派ip
var heweiUrl = 'mqtt://192.168.199.231';//hewei ip

//Sclient :server端为代理时，Dclient ：device端为代理时

// --------------------- Server Sub --------------------------------
// var Sclient = mqtt.connect(heweiUrl); 
// var x=11,y=22;
// Sclient.on('connect', function () {
//   Sclient.subscribe('toDevice');
// });
// Sclient.on('message', function (topic, message) {
//   if(topic === 'toDevice'){
//   	console.log('\n-- Device Sub:');
//   	eval(message.toString());
//   }	
//   else 
//   	console.log('\n-- Device Sub:'+ message.toString());
// });


// --------------------- Device Sub --------------------------------
var x=11,y=22;
var Dclient = mqtt.connect(localUrl);
var scriptStr='';

Dclient.on('connect', function () {
  Dclient.subscribe('rawEnvironment');
  Dclient.subscribe('rawRaspberryPiInfo');
  Dclient.subscribe('toDevice');
});
 
Dclient.on('message', function (topic, message) {
  if(topic === 'toDevice'){
    console.log('\n-- Device Sub:');
    // eval(message.toString());
    scriptStr = message.toString();
  } 
  else{
    var messageStr =  message.toString();
    console.log('\n## Device Sub:'+ messageStr);
    
    if(scriptStr === ''){
      Dclient.publish(topic.replace("raw",""),messageStr);
    }
    else{
      if(scriptSolve(scriptStr,topic,messageStr)!=''){
        Dclient.publish(topic.replace("raw",""),scriptSolve(scriptStr,topic,messageStr));
      }
    }
      
  }      
});

function scriptSolve(scriptStr,topic,deviceData){
  eval(scriptStr);//预定义好，脚本方面必须是以 scriptFunc 形式进行写
  return scriptFunc(topic,deviceData);
}

