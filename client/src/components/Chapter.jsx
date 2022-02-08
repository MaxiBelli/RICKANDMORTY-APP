import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postChapter,
  getNameCharactersForm,
  clearNameCharactersForm,
} from "../redux/actions";

export default function Chapter(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  console.log("PROPS", props);

  const characters = useSelector((state) => state.charactersForm);
  const [name, setName] = useState("");
  const [charid, setCharid] = useState([]);
  const [charName, setCharName] = useState("");
  const [charObj, setCharObj] = useState([]);

  useEffect(() => {
    setCharObj([...charObj, ...characters]);
    setCharObj([...new Set(charObj.map((c) => c.id))]);
  }, [dispatch, characters]);

  useEffect(() => {
    setCharid([...new Set(charObj.map((c) => c.id))]);
  }, [dispatch, charObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postChapter(name, charid));
    alert("The episode has been created");
    dispatch(clearNameCharactersForm());
    history.push("/home");
  };
  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleCharName = (e) => {
    e.preventDefault();
    setCharName(e.target.value);
  };

  const handleGetCharName = async (e) => {
    e.preventDefault();
    dispatch(getNameCharactersForm(charName));
  };
  const handleDeleteChar = async (e, id) => {
    e.preventDefault();
    setCharObj(charObj.filter((c) => c.id !== id));
    setCharid([...new Set(charObj.map((c) => c.id))]);
  };

  return (
    <div>
      <h1>Chapter</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          placeholder="Name..."
          onChange={(e) => {
            handleName(e);
          }}
        />
        <input
          type="Search Character"
          onChange={(e) => {
            handleCharName(e);
          }}
        />
        <button
          onClick={(e) => {
            handleGetCharName(e);
          }}
        >
          Search
        </button>

        <div>
          {charObj?.map((c) => (
            <div>
              <button
                onClick={(e) => {
                  handleDeleteChar(e, c.id);
                }}
              >
                X
              </button>
              <img src={c.image} alt="image not found" />
              <h5>{c.name}</h5>
            </div>
          ))}
        </div>
        <input type="submit" />
      </form>
      <NavLink to="/home">
        <button>Back</button>
      </NavLink>
    </div>
  );
}
