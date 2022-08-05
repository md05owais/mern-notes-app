import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../Context";
import "./Model.css";
let API_EDIT = "/api/updateNotes";

const Model = (props) => {
  const { data, handleCancle } = props.data;
  const { handleNewNoteAdded } = useGlobalContext();
  const [message, setMessage] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [editedData, setEditedData] = useState({
    title: data?.title,
    tagline: data?.tagline,
    body: data?.body,
  });

  useEffect(() => {
    setTimeout(() => {
      setIsEdited(false);
    }, 2000);
  }, [isEdited]);

  const editNote = async (e) => {
    editedData._id = data?._id;

    e.preventDefault();
    const res = await fetch(API_EDIT, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    });
    const result = await res.json();
    if (result.status === 201) {
      setIsEdited(true);
      setMessage(result.message);
      setTimeout(() => {
        handleCancle();
        handleNewNoteAdded();
      }, 2000);
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div className="modelBackground">
      <div className="Model addNotes">
        <h2>Edit Your Note</h2>
        <input
          className="inputField title"
          type="text"
          defaultValue={data.title}
          onChange={(e) =>
            setEditedData({ ...editedData, title: e.target.value })
          }
        ></input>
        <textarea
          className="inputField title"
          type="text"
          defaultValue={data.tagline}
          onChange={(e) =>
            setEditedData({ ...editedData, tagline: e.target.value })
          }
        />
        <textarea
          className="inputField title"
          type="text"
          defaultValue={data.body}
          onChange={(e) =>
            setEditedData({ ...editedData, body: e.target.value })
          }
        />
        <div className="save_cancle">
          <button className="Edit" onClick={(e) => editNote(e)}>
            save
          </button>
          <button className="Edit" onClick={handleCancle}>
            cancle
          </button>
        </div>
      </div>
      <h1 className={isEdited ? "show" : "hidden"}>{message}</h1>
    </div>
  );
};

export default Model;
