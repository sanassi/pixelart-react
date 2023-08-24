import useMousePosition from "./UseMousePosition.jsx";
import {useRef} from "react";

export default function Canvas() {
  const canvasRef = useRef(null);
  const [coords, handleCoords] = useMousePosition(true);
  const width = 900;
  const height = 600;

  const cellWidth = 20;

  function draw(event) {
    if (!canvasRef.current)
      return;

    handleCoords(event);
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = 'green';

    let drawX = Math.floor(coords.x / cellWidth) * cellWidth;
    let drawY = Math.floor(coords.y / cellWidth) * cellWidth;

    ctx?.fillRect(drawX, drawY, cellWidth, cellWidth);
  }

  return (
    <>
      <div>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onClick={(event) => {
            handleCoords(event);
            draw(event);
          }}/>
      </div>
    </>
  )
}