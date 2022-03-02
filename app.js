var myCharacteristic;
    const btn = document.getElementById("btn");
    const text = document.getElementById("batt_level");

  btn.addEventListener("click", async event =>{
        startButton();
   })

  function handleNotifications(event) {
  let value = event.target.value;
  let a = [];
  for (let i = 0; i < value.byteLength; i++) {
    a.push(value.getUint8(i));
  }
  log('> ' + a.join(' '));
 }



function log(data) {
  text.innerHTML = data + "%"; //text.innerHTML + "<br>" 
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
    log('> Notifications started');
    myCharacteristic.addEventListener('characteristicvaluechanged',
    handleNotifications);
    });
  })
  .catch(error => {
     log(error);
  });
}
