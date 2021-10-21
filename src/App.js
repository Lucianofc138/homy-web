import { useState, useEffect } from "react";
// import mqttService from "./helpers";
import mqtt from 'mqtt';


const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);
  const [MQTTClient, setMQTTClient] = useState(null);
  
  useEffect(() => {
    init();
  }, []);
  
  const init = () => {
    // const mqtt = require('mqtt')
    const newClient  = mqtt.connect('ws://192.168.0.108:9001/mqtt'); //ws://test.mosquitto.org:8080/mqtt
    newClient.on('connect', function () {
      newClient.publish('topic', 'Web socket connected');
      setMQTTClient(newClient);
    });
  };
  
  const handleClick = () => {
    const newCounter = counter + 1;
    setCounter((prevState) => prevState + 1);
    setValues((prevState) => prevState.concat(counter));
    if (MQTTClient === null) return;
    MQTTClient.publish('topic', newCounter.toString(10));
  };

  return (
    <div className="container">
      <h1>Hello Luciano!</h1>
      <button onClick={handleClick}> press this!</button>
      <div>
        <strong>{counter}</strong>
      </div>
    </div>
  );
};

export default App;
