var myCharacteristic;
    const btn = document.getElementById("btn");
    const text1 = document.getElementById("batt_lev");
    const text2 = document.getElementById("speed");
    const text3 = document.getElementById("bpm_data");
    const text4 = document.getElementById("sp02_data");
    const bot_B = document.getElementById("bot_Border");

  btn.addEventListener("click", async event =>{
        startButton();
   })

  function handleNotifications(event) {
  let value = event.target.value;
  let a = [];
  for (let i = 0; i < value.byteLength; i++) {
    a.push(value.getUint8(i));
  }
     log1(a[0]);
     log2(a[1]);
     log3(a[2]);
     log4(a[3]);
     shadowShow(a[4]);
     
 }


function shadowShow(i) {
    console.log(Boolean(i));
}
function log1(data) {
  text1.innerHTML = data + "%"; 
}
function log2(data) {
  text2.innerHTML = data; 
}
function log3(data) {
  text3.innerHTML = data; 
}
function log4(data) {
  text4.innerHTML = data; 
}


function startButton() {
  navigator.bluetooth.requestDevice({
     acceptAllDevices: true,
     optionalServices: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b']
  })
  .then(device => {
//       log('Connecting to GATT Server...' + device.name );
    return device.gatt.connect();
  })
  .then(server => {
//       log('Getting Service...');
   return server.getPrimaryService("4fafc201-1fb5-459e-8fcc-c5c9c331914b");
  })
  .then(service => {
//       log('Getting Characteristic...');
      return service.getCharacteristic("beb5483e-36e1-4688-b7f5-ea07361b26a8");
  })
  .then(characteristic => {
   myCharacteristic = characteristic;
    return myCharacteristic.startNotifications().then(_ => {
    // log('> Notifications started');
    myCharacteristic.addEventListener('characteristicvaluechanged',
    handleNotifications);
    });
  })
  .catch(error => {
     log(error);
  });
}
