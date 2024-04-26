import {useContext} from "react";
import {AppContext} from "./App.jsx";

export default function UndoRedo() {
   const appState = useContext(AppContext);

   const tab = appState.tabs[appState.activeTabId];

    return (
        <div className="undo-redo">
            <button className="undo-button" onClick={() => {

            }}>&larr;</button>
            <button className="redo-button">&rarr;</button>
        </div>
    );
}