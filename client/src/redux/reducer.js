const initialState = {
    characters: [],
    charactersForm: [],
    detail: [],
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case "GET_CHARACTERS":
        return {
          ...state,
          characters: action.payload,
        };
  
      case "GET_NAME_CHARACTERS":
        return {
          ...state,
          characters: action.payload, //
        };
  
      case "GET_NAME_CHARACTERS_FORM":
        return {
          ...state,
          charactersForm: action.payload, //
        };
  
      case "CLEAR_NAME_CHARACTERS_FORM":
        return {
          ...state,
          charactersForm: [], //
        };
  
      case "GET_DETAILS":
        return {
          ...state,
          detail: action.payload, //
        };
  
      default:
        return state;
    }
  }
  
  export default rootReducer;
  