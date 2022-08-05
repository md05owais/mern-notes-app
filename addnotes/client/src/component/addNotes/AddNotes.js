import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../Context";
import "./AddNotes.css";

const AddNotes = (props) => {
  const { handleNewNoteAdded } = useGlobalContext();

  const [isAdded, setIsAdded] = useState(false);
  const [data, setData] = useState({
    title: "",
    tagline: "",
    body: "",
  });
  useEffect(() => {
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  }, [isAdded]);
  const url = "/api/add";
  const postData = async (e) => {
    e.preventDefault();
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await result.json();

    if (res.status === 400) {
      window.alert(res.message);
      return;
    }
    if (res.status === 201) {
      setIsAdded(true);
      handleNewNoteAdded();
    }
  };

  return (
    <>
      <div className="addNotes formField">
        <button className="cross" onClick={props.prop}>
          X
        </button>
        <input
          className="inputField title"
          type="text"
          placeholder="Title"
          defaultValue=""
          onChange={(e) => setData({ ...data, title: e.target.value })}
        ></input>
        <textarea
          className="inputField"
          type="text"
          placeholder="Tagline"
          onChange={(e) => setData({ ...data, tagline: e.target.value })}
        />
        <textarea
          className="inputField"
          type="text"
          placeholder="body"
          defaultValue=""
          onChange={(e) => setData({ ...data, body: e.target.value })}
        />
        <div className="deleteSave">
          <button className="save" onClick={(e) => postData(e)}>
            Save
          </button>
        </div>
      </div>

      <h1 className={isAdded ? "show" : "hidden"}>
        Notes Added successfully!!!
      </h1>
    </>
  );
};

export default AddNotes;
