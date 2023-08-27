import './App.css'
import Canvas from "./Canvas.jsx";
import ColorPicker from "./ColorPicker.jsx";
import Tools from './Tools.jsx'
import useColorState from "./UseColorState.jsx";
import {createContext, useState} from "react";
import SaveButton from "./SaveButton.jsx";

export const AppContext = createContext(null);

function App() {

   const appState = {
      canvasRef: null,
      penWidth: 1,
      penColor: '#5fee0c',
      mode: 'pen',
      drawing: false,
      backgroundColor: '#242424',
      transparentColor: '#ffffff00',
      nbCellWidth: 40,
      nbCellHeight: 40,
      cellWidth: 20,
      grid: []
   };

   appState.grid = Array(appState.nbCellHeight * appState.nbCellWidth).fill('#ffffff00');

   const [color, setColor] = useColorState(appState.penColor);
   const [history, setHistory] = useState([]);

   return (
      <AppContext.Provider value={appState}>
         <div className="app">
            <div className="app-top">
               <Tools/>
               <Canvas drawingColor={color}/>
               <ColorPicker colorState={[color, setColor]}
                            historyState={[history, setHistory]}/>
            </div>
            <div className="app-footer">
               <SaveButton/>
            </div>
         </div>
      </AppContext.Provider>
   )
}

export default App
