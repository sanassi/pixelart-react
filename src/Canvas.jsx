import useMousePosition from "./UseMousePosition.jsx";
import PropTypes from "prop-types";
import {useContext, useRef} from "react";
import {AppContext} from "./App.jsx";

export default function Canvas(props) {

   const appState = useContext(AppContext);

   const canvasRef = useRef(null);

   appState.canvasRef = canvasRef;
   const [coords, handleCoords] = useMousePosition(true);
   const canvasWidth = appState.nbCellWidth * appState.cellWidth;
   const canvasHeight = appState.nbCellHeight * appState.cellWidth;

   const cellWidth = appState.cellWidth;
   const drawingColor = props.drawingColor;

   function drawCell(x, y) {
      if (!canvasRef.current)
         return;

      const ctx = canvasRef.current.getContext("2d");
      ctx?.fillRect(x, y, cellWidth, cellWidth);
   }
   function bucketDraw() {
      if (!canvasRef.current)
         return;

      const ctx = canvasRef.current.getContext("2d");
      const prevFill = ctx.fillStyle;

      ctx.fillStyle = drawingColor;

      let x = Math.floor(coords.x / cellWidth);
      let y = Math.floor(coords.y / cellWidth);

      let grid = appState.grid;

      const toReplace = grid[y * appState.nbCellWidth + x];

      if (toReplace === drawingColor)
         return;

      grid[y * appState.nbCellWidth + x] = drawingColor

      let q = [{x, y}];

      //console.log(drawingColor)
      //console.log(toReplace)

      //TODO: replace with loop
      while (q.length !== 0) {
         let pop = q.shift();
         drawCell(pop.x * cellWidth, pop.y * cellWidth);

         if (pop.x - 1 >= 0 && grid[pop.y * appState.nbCellWidth + (pop.x - 1)] === toReplace) {
            grid[pop.y * appState.nbCellWidth + (pop.x - 1)] = drawingColor;
            q.push({x: pop.x - 1, y: pop.y});
         }

         if (pop.x + 1 < appState.nbCellWidth && grid[pop.y * appState.nbCellWidth + (pop.x + 1)] === toReplace) {
            grid[pop.y * appState.nbCellWidth + (pop.x + 1)] = drawingColor;
            q.push({x: pop.x + 1, y: pop.y});
         }

         if (pop.y - 1 >= 0 && grid[(pop.y - 1) * appState.nbCellWidth + pop.x] === toReplace) {
            grid[(pop.y - 1) * appState.nbCellWidth + pop.x] = drawingColor;
            q.push({x: pop.x, y: pop.y - 1});
         }

         if (pop.y + 1 < appState.nbCellWidth && grid[(pop.y + 1) * appState.nbCellWidth + pop.x] === toReplace) {
            grid[(pop.y + 1) * appState.nbCellWidth + pop.x] = drawingColor;
            q.push({x: pop.x, y: pop.y + 1});
         }
      }

      ctx.fillStyle = prevFill;
   }

   function draw(event) {
      if (!canvasRef.current)
         return;

      //appState.canvasRef = canvasRef;

      handleCoords(event);
      const ctx = canvasRef.current.getContext("2d");

      let gridX = Math.floor(coords.x / cellWidth);
      let gridY = Math.floor(coords.y / cellWidth);

      let gridColor = drawingColor;

      switch (appState.mode) {
         case 'pen':
            ctx.fillStyle = drawingColor;
            break;
         case 'eraser':
            ctx.fillStyle = appState.backgroundColor;
            gridColor = appState.transparentColor;
            break;
      }

      appState.grid[gridY * appState.nbCellWidth + gridX] = gridColor;

      let drawX = gridX * cellWidth;
      let drawY = gridY * cellWidth;

      ctx?.fillRect(drawX, drawY, cellWidth, cellWidth);
   }

   return (
      <>
         <div>
            <canvas
               id='ui-layer'
               ref={canvasRef}
               width={canvasWidth}
               height={canvasHeight}
               onMouseDown={(event) => {
                  if (appState.mode === 'pen' || appState.mode === 'eraser') {
                     appState.drawing = true;
                     draw(event);
                  }
                  if (appState.mode === 'bucket') {
                     bucketDraw();
                  }
               }}
               onMouseMove={(event) => {
                  if (appState.drawing) {
                     draw(event);
                  }
               }}
               onMouseUp={(event) => {
                  if (appState.drawing) {
                     if (appState.mode !== 'bucket')
                        draw(event);
                     appState.drawing = false;
                  }
               }}
            />
         </div>
      </>
   )
}

Canvas.propTypes = {
   drawingColor: PropTypes.string
}