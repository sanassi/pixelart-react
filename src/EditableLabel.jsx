import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./EditableLabel.css";

export default function EditableLabel({ initValue, isLabelInit, updateValue }) {
   const [isLabel, setIsLabel] = useState(isLabelInit);
   const [value, setValue] = useState(initValue);
   const [previous, setPrevious] = useState(initValue);
   const inputRef = useRef(null);
   const editableLabelRef = useRef(null);

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (editableLabelRef.current &&
            !editableLabelRef.current.contains(event.target)) {
            setValue(previous);
            setIsLabel(true);
         }
      };

      if (!isLabel) {
         document.addEventListener("click", handleClickOutside);
      } else {
         document.removeEventListener("click", handleClickOutside);
      }

      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, [isLabel, previous]);

   return (
      <div
         className="editable-label"
         ref={editableLabelRef}
         onDoubleClick={() => {
            setIsLabel(!isLabel);
            setPrevious(value);
         }}
         onKeyUp={(event) => {
            if (event.key === 'Escape') {
               setValue(previous);
               updateValue(previous);
               setIsLabel(!isLabel);
            }
            else if (event.key === 'Enter') {
               setIsLabel(!isLabel);
            }
         }}
      >
         {isLabel ? (
            <label>{value}</label>
         ) : (
            <input
               ref={inputRef}
               autoFocus
               type="text"
               value={value.toString()}
               onChange={(event) => {
                  setValue(event.target.value);
                  updateValue(event.target.value);
               }}
            />
         )}
      </div>
   );
}

EditableLabel.propTypes = {
   initValue: PropTypes.string,
   isLabelInit: PropTypes.bool,
   updateValue: PropTypes.func,
};
