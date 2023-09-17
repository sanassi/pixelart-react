import {AppContext} from "./App.jsx";
import {useContext} from "react";

export default function PenSize() {
   const appState = useContext(AppContext);

   return (
      <div>
         <button className="medium-pen-size" onClick={() => appState.penWidth = 1}>&#9724;</button>
         <button className="large-pen-size" onClick={() => appState.penWidth = 3}>&#11036;</button>
      </div>
   );
}