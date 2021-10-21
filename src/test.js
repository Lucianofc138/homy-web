const mqtt = require('mqtt')

const client  = mqtt.connect('', {host: 'localhost', port: 1883});

client.on('connect', function () {
  client.subscribe('topic', function (err) {
    if (!err) {
      client.publish('topic', 'Hello mqtt')
    }
  })
});
