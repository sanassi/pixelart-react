import Canvas from "./Canvas.jsx";
import PropTypes from "prop-types";
import {useContext, useState} from "react";
import {AppContext} from "./App.jsx";

export default function Tab(props) {
   const appState = useContext(AppContext);

   const [grid] = useState((Array(appState.nbCellHeight * appState.nbCellWidth)
      .fill('#ffffff00')));

   return (
      <div className="tab"
           hidden={props.hidden}>
         <Canvas drawingColor={props.drawingColor}
                 grid={grid}/>
      </div>
   );
}

Tab.propTypes = {
   tabName: PropTypes.string,
   hidden: PropTypes.bool,
   drawingColor: PropTypes.string,
};

