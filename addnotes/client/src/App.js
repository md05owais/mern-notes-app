import "./App.css";
import AddNotes from "./component/addNotes/AddNotes";
import AddButton from "./component/addButton/AddButton";
import { useState } from "react";
import DisplayNotes from "./component/displayNotes/DisplayNotes";
import Pagination from "./component/pagination/Pagination";
import Model from "./component/model/Model";
function App() {
  const [click, setClick] = useState(false);
  const [isNoteEdited, setIsNoteEdited] = useState(false);
  const [data, setData] = useState();
  const handlePlus = (e) => {
    setClick(true);
  };
  const handleCross = (e) => {
    setClick(false);
  };

  const editNote = (e) => {
    setIsNoteEdited(true);
    setData(e);
  };

  const handleCancle = () => {
    setIsNoteEdited(false);
  };
  return (
    <div>
      {!isNoteEdited ? (
        <div className="App">
          <AddButton onClick={handlePlus} />
          {click && <AddNotes prop={handleCross} />}
          <Pagination />
          <DisplayNotes prop={editNote} />
        </div>
      ) : (
        <Model data={{ data, handleCancle }} />
      )}
    </div>
  );
}

export default App;
