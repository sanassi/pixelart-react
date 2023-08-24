import useMousePosition from "./UseMousePosition.jsx";
import {useRef} from "react";
import PropTypes from "prop-types";

export default function Canvas(props) {
  const canvasRef = useRef(null);
  const [coords, handleCoords] = useMousePosition(true);
  const width = 900;
  const height = 600;

  const cellWidth = 20;

  const drawingColor = props.drawingColor;

  function draw(event) {
    if (!canvasRef.current)
      return;

    handleCoords(event);
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = drawingColor;

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
          onMouseDown={(event) => {
            handleCoords(event);
            draw(event);
          }}/>
      </div>
    </>
  )
}

Canvas.propTypes = {
  drawingColor: PropTypes.string
}