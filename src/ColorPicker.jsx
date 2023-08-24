import './ColorPicker.css'
import PropTypes from "prop-types";

export default function ColorPicker(props) {
   let input = props.input;
   let colorsDiv = props.colorsDiv;
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

ColorPicker.propTypes = {
   input: PropTypes.object,
   colorsDiv: PropTypes.arrayOf(PropTypes.element)
}