import './Tools.css'
import {useContext} from "react";
import {AppContext} from "./App.jsx";
export default function Tools() {
   const appState = useContext(AppContext);

   return (
      <div className='tools'>
         <button onClick={() => {
            appState.mode = 'pen';
         }}>Pen</button>
         <button onClick={() => {
            appState.mode = 'eraser';
         }}>Eraser</button>
      </div>
   )
}