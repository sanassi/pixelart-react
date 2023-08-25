import useMousePosition from "./UseMousePosition.jsx";
import PropTypes from "prop-types";
import {useContext, useRef} from "react";
import {AppContext} from "./App.jsx";

export default function Canvas(props) {

   const appState = useContext(AppContext);

   const canvasRef = useRef(null);
   const [coords, handleCoords] = useMousePosition(true);
   const canvasWidth = appState.nbCellWidth * appState.cellWidth;
   const canvasHeight = appState.nbCellHeight * appState.cellWidth;

   const cellWidth = appState.cellWidth;
   const drawingColor = props.drawingColor;

   function draw(event) {
      if (!canvasRef.current)
         return;

      handleCoords(event);
      const ctx = canvasRef.current.getContext("2d");

      switch (appState.mode) {
         case 'pen':
            ctx.fillStyle = drawingColor;
            break;
         case 'eraser':
            ctx.fillStyle = appState.backgroundColor;
            break;
      }

      let gridX = Math.floor(coords.x / cellWidth);
      let gridY = Math.floor(coords.y / cellWidth);

      appState.grid[gridY * appState.nbCellWidth + gridX] = drawingColor;

      let drawX = gridX * cellWidth;
      let drawY = gridY * cellWidth;

      ctx?.fillRect(drawX, drawY, cellWidth, cellWidth);
   }

   return (
      <>
         <div>
            <canvas
               ref={canvasRef}
               width={canvasWidth}
               height={canvasHeight}
               onMouseDown={(event) => {
                  draw(event);
               }}/>
         </div>
      </>
   )
}

Canvas.propTypes = {
   drawingColor: PropTypes.string
}