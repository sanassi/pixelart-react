import Canvas from "./Canvas.jsx";
import PropTypes from "prop-types";
import {useContext, useRef} from "react";
import {AppContext} from "./App.jsx";
import './Tab.css';

export default function Tab({ grid, drawingColor, hidden, tabKey }) {
   const appState = useContext(AppContext);

   appState.tabs[tabKey].canvasRef = useRef(null);

   return (
      <div key={tabKey}
           className="tab"
           hidden={hidden}>
         <Canvas drawingColor={drawingColor}
                 grid={grid} canvasRef={appState.tabs[tabKey].canvasRef}/>
      </div>
   );
}

Tab.propTypes = {
   grid: PropTypes.array,
   tabKey: PropTypes.string,
   tabName: PropTypes.string,
   hidden: PropTypes.bool,
   drawingColor: PropTypes.string,
};

