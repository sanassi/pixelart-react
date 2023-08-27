import './Tools.css'
import {useContext} from "react";
import {AppContext} from "./App.jsx";

export default function Tools() {
   const appState = useContext(AppContext);

   const clearCanvas = () => {
      appState.grid.fill(appState.transparentColor);
      const ctx = appState.canvasRef.current.getContext('2d');

      let prevFill = ctx.fillStyle;
      ctx.fillStyle = appState.backgroundColor;

      const canvasWidth = appState.nbCellWidth * appState.cellWidth;
      const canvasHeight = appState.nbCellHeight * appState.cellWidth;

      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.fillStyle = prevFill;
   }

   return (
      <div className='tools'>
         <button className="pen-tool-button" onClick={() => {
            appState.mode = 'pen';
         }}>Pen
         </button>
         <button className="eraser-tool-button" onClick={() => {
            appState.mode = 'eraser';
         }}>Eraser
         </button>
         {/*<button className="bucket-tool-button" onClick={() => {
            appState.mode = 'bucket';
         }}>
            Bucket
         </button>*/}
         <button className="clear-tool-button"
                 onClick={clearCanvas}>
            Clear
         </button>
      </div>
   )
}