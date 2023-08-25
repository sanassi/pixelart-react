import {useContext} from "react";
import {AppContext} from "./App.jsx";
import { saveAs } from 'file-saver'

export default function SaveButton() {

   const appState = useContext(AppContext);

   const canvasWidth = appState.nbCellWidth * appState.cellWidth;
   const canvasHeight = appState.nbCellHeight * appState.cellWidth;

   const cellWidth = appState.cellWidth;

   const onSave = () => {
      let newCanvas = document.createElement('canvas');
      newCanvas.width = canvasWidth;
      newCanvas.height = canvasHeight;

      let newCtx = newCanvas.getContext('2d');

      for (let i = 0; i < appState.nbCellHeight; i++) {
         for (let j = 0; j < appState.nbCellWidth; j++) {
            let prevCtxFill = newCtx.fillStyle;

            newCtx.fillStyle = appState.grid[i * appState.nbCellWidth + j];

            let region = new Path2D();
            region.rect(j * cellWidth, i * cellWidth, cellWidth, cellWidth);
            region.closePath();
            newCtx.fill(region);

            newCtx.fillStyle = prevCtxFill;
         }
      }

      saveAs(newCanvas.toDataURL(), prompt("Enter file name"));
   }

   return (
      <div>
         <button className="save-button" onClick={onSave}>Save</button>
      </div>
   )
}