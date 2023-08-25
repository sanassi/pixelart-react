import './App.css'
import Canvas from "./Canvas.jsx";
import ColorPicker from "./ColorPicker.jsx";
import Tools from './Tools.jsx'
import useColorState from "./UseColorState.jsx";
import {createContext, useState} from "react";

export const AppContext = createContext(null);

function App() {

   const appState = {
      penWidth: 1,
      penColor: '#ffaaff',
      mode: 'pen',
      backgroundColor: '#242424',
      width: 900,
      height: 900,
      cellWidth: 20,
      grid: []
   };

   appState.grid = Array((appState.width / appState.cellWidth) * (appState.height / appState.cellWidth)).fill('#ffffff00');

   console.log(appState.grid.length);

   const [color, setColor] = useColorState(appState.penColor);
   const [history, setHistory] = useState([]);

   return (
      <AppContext.Provider value={appState}>
         <div className="app">
            <Tools/>
            <Canvas drawingColor={color}/>
            <ColorPicker colorState={[color, setColor]} historyState={[history, setHistory]}/>
         </div>
      </AppContext.Provider>
   )
}

export default App
