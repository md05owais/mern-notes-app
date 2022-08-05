import React, { useContext, useEffect, useReducer } from "react";
import reducer from "./Reducer";

let API = `/api/allNotes`;

const initialSate = {
  isLoading: true,
  query: "HTML",
  limit: 6,
  nbPages: 0,
  page: 1,
  data: [],
  isNewNoteAdded: false,
  isPin: false,
  isError: false,
};
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialSate);

  const fetchApiData = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await fetch(url);
      const data = await res.json();
      dispatch({
        type: "GET_NOTES",
        payload: {
          data: data.data,
          nbPages: data.nbPages,
        },
      });
    } catch (err) {
      dispatch({ type: "SET_ERROR" });
    }
  };

  // to remove the notes

  const removeNote = (id) => {
    dispatch({ type: "REMOVE_NOTE", payload: id });
  };

  //pagination

  const getNextPage = () => {
    dispatch({ type: "NEXT_PAGE" });
  };

  const getPrevPage = () => {
    dispatch({ type: "PREV_PAGE" });
  };

  const handleNewNoteAdded = () => {
    dispatch({ type: "NEW_NOTE" });
  };

  const pinNote = (id) => {
    dispatch({
      type: "PIN_NOTE",
      payload: id,
    });
  };
  useEffect(() => {
    fetchApiData(`${API}?page=${state.page}&limit=${state.limit}`);
  }, [state.page, state.isNewNoteAdded, state.limit]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        removeNote,
        getNextPage,
        getPrevPage,
        handleNewNoteAdded,
        pinNote,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//custom hook create

const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider, useGlobalContext };
