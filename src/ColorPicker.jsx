import './ColorPicker.css'
import {useState} from "react";
import useColorState from "./UseColorState.jsx";
export default function ColorPicker() {
  let [color, setColor] = useColorState('#ff00ff');
  let [colors, setColors] = useState([])

  let input = (<input type='color' value={color} onChange={
    (e) => {
      setColors([...colors, color]);
      setColor(e.target.value);
    }}/>)

  let colorsDiv = colors.map((c) =>
    <button key={c.toString()}
            style={{backgroundColor : c}}
            onClick={() => {
              setColor(c);
            }}
    />)

  return (
    <div className="color-picker">
      <label>Color</label>
      {input}
      <div className="color-history">
        {colorsDiv}
      </div>
    </div>
  )
}