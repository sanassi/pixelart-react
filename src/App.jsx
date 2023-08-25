import './App.css'
import Canvas from "./Canvas.jsx";
import ColorPicker from "./ColorPicker.jsx";
import useColorState from "./UseColorState.jsx";
import {useState} from "react";

function App() {
   const [color, setColor] = useColorState('#ffff00');
   const [history, setHistory] = useState([]);
   return (
      <>
         <div className="app">
            <Canvas drawingColor={color}/>
            <ColorPicker colorState={[color, setColor]} historyState={[history, setHistory]}/>
         </div>
      </>
   )
}

export default App
