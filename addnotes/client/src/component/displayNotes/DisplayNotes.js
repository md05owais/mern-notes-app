import React from "react";
import "./DisplayNotes.css";
import { useGlobalContext } from "../Context";

const DisplayNotes = (props) => {
  const { data, isLoading, removeNote, pinNote, isError } = useGlobalContext();

  if (isLoading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
  if (isError) {
    return (
      <>
        <h2 style={{ color: "red" }}>
          Something went wrong pleas Refresh the page...
        </h2>
      </>
    );
  }
  const AllNotes = data?.map((elem) => {
    const { title, tagline, body, _id } = elem;
    return (
      <div
        className="addNotes allNote"
        key={_id}
        onClick={() => props.prop(elem)}
      >
        {" "}
        <div className="pin" onClick={(e) => e.stopPropagation()}>
          <p className="pinImage" onClick={(e) => pinNote(_id)}>
            📌
          </p>
        </div>
        <div className="Content">
          <h1>{title}</h1>
          <h2>{tagline}</h2>
          <div>{body}</div>
        </div>
        <div className="stopProp" onClick={(e) => e.stopPropagation()}>
          <button className="button" onClick={(e) => removeNote(_id)}>
            remove
          </button>
        </div>
      </div>
    );
  });

  return <div className="allNotes">{AllNotes}</div>;
};

export default DisplayNotes;
