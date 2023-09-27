import Canvas from "./Canvas.jsx";
import PropTypes from "prop-types";
import {useContext, useState} from "react";
import {AppContext} from "./App.jsx";
import './Tab.css';

export default function Tab({ drawingColor, hidden, tabKey }) {
   const appState = useContext(AppContext);

   const [grid] = useState((Array(appState.nbCellHeight * appState.nbCellWidth)
      .fill('#ffffff00')));

   return (
      <div key={tabKey}
           className="tab"
           hidden={hidden}>
         <Canvas drawingColor={drawingColor}
                 grid={grid}/>
      </div>
   );
}

Tab.propTypes = {
   tabKey: PropTypes.string,
   tabName: PropTypes.string,
   hidden: PropTypes.bool,
   drawingColor: PropTypes.string,
};

