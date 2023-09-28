import './App.css'
import ColorPicker from "./ColorPicker.jsx";
import Tools from './Tools.jsx'
import useColorState from "./UseColorState.jsx";
import {createContext, useState} from "react";
import SaveButton from "./SaveButton.jsx";
import TabPanel from "./TabPanel.jsx";

export const AppContext = createContext(null);

function App() {

   let nbCellWidth = 40;
   let nbCellHeight = 40;

   const appState = {
      penWidth: 1,
      penColor: '#5fee0c',
      mode: 'pen',
      drawing: false,
      backgroundColor: '#242424',
      transparentColor: '#ffffff00',
      nbCellWidth: nbCellWidth,
      nbCellHeight: nbCellHeight,
      cellWidth: 20,
      tabs: {},
      activeTabId: '',
   };

   const [color, setColor] = useColorState(appState.penColor);
   const [history, setHistory] = useState([]);

   return (
      <AppContext.Provider value={appState}>
         <div className="app">
            <div className="app-top">
               <Tools/>
               <TabPanel drawingColor={color}/>
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
