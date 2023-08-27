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

   /*
   function drawCell(x, y) {
      if (!canvasRef.current)
         return;

      const ctx = canvasRef.current.getContext("2d");
      ctx?.fillRect(x, y, cellWidth, cellWidth);
   }
   */
   /*
   function bucketDraw() {
      let x = Math.floor(coords.x / cellWidth);
      let y = Math.floor(coords.y / cellWidth);

      let grid = appState.grid;

      const toReplace = grid[y * appState.nbCellWidth + x];
      grid[y * appState.nbCellWidth + x] = drawingColor

      let q = [{x, y}];

      let count = 0;

      console.log(drawingColor)
      console.log(toReplace)

      while (q.length !== 0) {
         let pop = q.shift();
         grid[pop.y * appState.nbCellWidth + pop.x] = drawingColor;
         drawCell(pop.x * cellWidth, pop.y * cellWidth);

         for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
               if (i === j && i === 0)
                  continue;

               if (pop.x + i < 0 ||
                  pop.x + i >= appState.nbCellWidth ||
                  pop.y + j < 0 ||
                  pop.y + j >= appState.nbCellWidth ||
                  grid[(pop.y + j) * appState.nbCellWidth + (pop.x + i)] !== toReplace)
                  continue;

               grid[(pop.y + j) * appState.nbCellWidth + (pop.x + i)] = drawingColor;

               console.log(grid[(pop.y + j) * appState.nbCellWidth + (pop.x + i)]);
               console.log({x: pop.x + i, y: pop.y + j});
               //q.push({x: pop.x + i, y: pop.y + j});
               count += 1;
            }
         }
      }

      console.log(count);


      //for (let i = 0; i < appState.nbCellWidth; i++) {
      //   for (let j = 0; j < appState.nbCellWidth; j++) {
      //      console.log(appState.grid[i * appState.nbCellWidth + j]);
      //   }
      //}

   }
   */

   function draw(event) {
      if (!canvasRef.current)
         return;

      appState.canvasRef = canvasRef;

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
         case 'bucket':
            ctx.fillStyle = drawingColor;
            bucketDraw();
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
               ref={canvasRef}
               width={canvasWidth}
               height={canvasHeight}
               onMouseDown={(event) => {
                  if (appState.mode === 'pen' || appState.mode === 'eraser' || appState.mode === 'bucket') {
                     appState.drawing = true;
                     draw(event);
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