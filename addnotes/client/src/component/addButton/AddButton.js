import React from "react";
import "./AddButton.css";
const AddButton = (props) => {
  return (
    <div>
      <button className="button" onClick={() => props.onClick()}>
        Add Notes
      </button>
    </div>
  );
};

export default AddButton;
