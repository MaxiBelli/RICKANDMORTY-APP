import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCharacters } from "../redux/actions";
import styles from "./styles/SearchBar.module.css";


export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getNameCharacters(name));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Character..."
        onChange={(e) => handleInputChange(e)}
      />
      <button className={styles.button} type="submit" onClick={(e) => handleClick(e)}>
        Search
      </button>
    </div>
  );
}
