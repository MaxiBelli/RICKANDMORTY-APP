import axios from "axios";

export function getCharacters(page, order, filter) {
  return async function (dispatch) {
    var json = await axios(
      "http://localhost:3001/character?page=" +
        page +
        "&order=" +
        order +
        "&filter=" +
        filter
    );
    return dispatch({
      type: "GET_CHARACTERS",
      payload: json.data,
    });
  };
}
export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/character/" + id);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getNameCharactersForm(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/characters?name=" + name
      );
      return dispatch({
        type: "GET_NAME_CHARACTERS_FORM",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function clearNameCharactersForm() {
  return function (dispatch) {
    return dispatch({
      type: "CLEAR_NAME_CHARACTERS_FORM",
    });
  };
}

export function postChapter(name, charid) {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/episode",
      name,
      charid
    );
    console.log(response);
    return {
      type: "POST_CHAPTER",
      response,
    };
  };
}
