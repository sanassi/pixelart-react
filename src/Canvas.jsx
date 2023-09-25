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

      let grid = props.grid;

      const toReplace = grid[y * appState.nbCellWidth + x];

      if (toReplace === drawingColor)
         return;

      grid[y * appState.nbCellWidth + x] = drawingColor

      let q = [{x, y}];

      while (q.length !== 0) {
         let pop = q.shift();
         drawCell(pop.x * cellWidth, pop.y * cellWidth);

         const directions = [
            { dx: -1, dy: 0 },
            { dx: 1, dy: 0 },
            { dx: 0, dy: -1 },
            { dx: 0, dy: 1 },
         ];

         for (const dir of directions) {
            const newX = pop.x + dir.dx;
            const newY = pop.y + dir.dy;

            const canBeFilled = newX >= 0 &&
               newX < appState.nbCellWidth &&
               newY >= 0 &&
               newY < appState.nbCellWidth &&
               grid[newY * appState.nbCellWidth + newX] === toReplace;

            if (canBeFilled) {
               grid[newY * appState.nbCellWidth + newX] = drawingColor;
               q.push({ x: newX, y: newY });
            }
         }
      }

      ctx.fillStyle = prevFill;
   }

   function drawOnGridAndBoard(x, y, color) {
      let width = Math.floor(appState.penWidth / 2);
      const ctx = canvasRef.current.getContext("2d");

      for (let i = -width; i <= width; i++) {
         for (let j = -width; j <= width; j++) {
            if (x + i >= 0 && x + i < appState.nbCellWidth
               && y + j >= 0 && y + j < appState.nbCellWidth)
            {
               props.grid[(y + j) * appState.nbCellWidth + (x + i)] = color;

               let drawX = (x + i) * cellWidth;
               let drawY = (y + j) * cellWidth;

               ctx?.fillRect(drawX, drawY, cellWidth, cellWidth);
            }
         }
      }
   }

   function draw(event) {
      if (!canvasRef.current)
         return;

      const ctx = canvasRef.current.getContext("2d");

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

      handleCoords(event);

      let gridX = Math.floor(coords.x / cellWidth);
      let gridY = Math.floor(coords.y / cellWidth);

      drawOnGridAndBoard(gridX, gridY, gridColor);

      /*
      props.grid[gridY * appState.nbCellWidth + gridX] = gridColor;

      let drawX = gridX * cellWidth;
      let drawY = gridY * cellWidth;

      ctx?.fillRect(drawX, drawY, cellWidth, cellWidth);

       */
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
                  switch (appState.mode) {
                     case 'pen':
                     case 'eraser':
                        appState.drawing = true;
                        draw(event);
                        break;
                     case 'bucket':
                        bucketDraw();
                        break;
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
   drawingColor: PropTypes.string,
   grid: Array.of(PropTypes.string)
}