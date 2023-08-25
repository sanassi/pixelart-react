import './ColorPicker.css'
import PropTypes from "prop-types";
import {useContext} from "react";
import {AppContext} from "./App.jsx";

export default function ColorPicker(props) {

   const [color, setColor] = props.colorState;
   const [history, setHistory] = props.historyState;

   const appState = useContext(AppContext);

   let input = (<input type='color' value={color} onChange={
      (e) => {
         setHistory([...history, color]);
         setColor(e.target.value);
         appState.penColor = color;
      }}/>)

   let colorsDiv = history.map((c) =>
      <button key={c.toString()}
              style={{backgroundColor: c}}
              onClick={() => {
                 setColor(c);
              }}
      />)

   const clearHistoryButton = (<button className='clearHistoryButton' onClick={() => {
      setHistory([]);
   }}>
      Clear
   </button>)

   return (
      <div className="color-picker">
         <label>Color</label>
         {input}
         <div className="color-history">
            {colorsDiv}
         </div>
         {clearHistoryButton}
      </div>
   )
}

ColorPicker.propTypes = {
   colorState: PropTypes.array,
   historyState: PropTypes.array
}