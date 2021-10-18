import {useState} from "react";

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);
  
  const handleClick = () => {
    setCounter((prevState) => prevState+1);
    setValues((prevState) => prevState.concat(counter));
  };
  
  return (
    <div className='container'>
      <h1>Hello Luciano!</h1>
      <button onClick={handleClick}> press this!</button>
      <div>
        <strong>{counter}</strong>
      </div>
    </div>
  );
};

export default App;
