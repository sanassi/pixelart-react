import Canvas from "./Canvas.jsx";
import PropTypes from "prop-types";
import {useContext, useRef, useState} from "react";
import {AppContext} from "./App.jsx";
import './Tab.css';

export default function Tab({ grid, drawingColor, hidden, tabKey }) {
   const appState = useContext(AppContext);

   appState.tabs[tabKey].canvasRef = useRef(null);

   const [strokes, setStrokes] = useState([]);
   appState.tabs[tabKey].strokes = strokes;

   return (
      <div key={tabKey}
           className="tab"
           hidden={hidden}>
         <Canvas drawingColor={drawingColor}
                 grid={grid}
                 canvasRef={appState.tabs[tabKey].canvasRef}
                 strokes={strokes}
                 setStrokes={setStrokes}
         />
      </div>
   );
}

Tab.propTypes = {
   grid: PropTypes.array,
   tabKey: PropTypes.string,
   tabName: PropTypes.string,
   hidden: PropTypes.bool,
   drawingColor: PropTypes.string,
   strokes: PropTypes.array,
};

