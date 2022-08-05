const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_NOTES":
      return {
        ...state,
        isNewNoteAdded: false,
        isLoading: false,
        data: action.payload.data,
        nbPages: action.payload.nbPages,
      };
    case "SET_ERROR": {
      return {
        ...state,
        isError: true,
      };
    }
    case "REMOVE_NOTE":
      return {
        ...state,
        data: state.data.filter((element) => {
          return element._id !== action.payload;
        }),
      };
    case "NEXT_PAGE": {
      let pageNumInc = state.page + 1;
      if (pageNumInc > state.nbPages) {
        pageNumInc = 1;
      }
      return {
        ...state,
        page: pageNumInc,
      };
    }
    case "PREV_PAGE": {
      let pageNumber = state.page;
      if (pageNumber <= 1) {
        pageNumber = 1;
      } else {
        pageNumber = pageNumber - 1;
      }
      return {
        ...state,
        page: pageNumber,
      };
    }
    case "NEW_NOTE": {
      return {
        ...state,
        isNewNoteAdded: true,
      };
    }
    case "PIN_NOTE": {
      let newData = [];
      for (let i = 0; i < state.data.length; i++) {
        if (state.data[i]._id === action.payload) {
          newData.unshift(state.data[i]);
        } else {
          newData.push(state.data[i]);
        }
      }

      return {
        ...state,
        data: newData,
      };
    }
    default: {
      return state
    }
  }
};

export default reducer;
