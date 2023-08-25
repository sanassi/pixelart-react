import './App.css'
import Canvas from "./Canvas.jsx";
import ColorPicker from "./ColorPicker.jsx";
import useColorState from "./UseColorState.jsx";
import {useState} from "react";

function App() {
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
    <>
      <div className="app">
        <Canvas drawingColor={color}/>
        <ColorPicker colorsDiv={colorsDiv}
                     input={input}/>
      </div>
    </>
  )
}

export default App
