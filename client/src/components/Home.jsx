import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../redux/actions";
import CharacterCard from "./CharacterCard";

import SearchBar from "./SearchBar";

//COMIENZA EL COMPONENTE
export default function Home() {
  const dispatch = useDispatch();

  //OREDENAMIENTO
  const [pages, setPages] = useState(0);
  const [order, setOrder] = useState("ASC");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(getCharacters(pages, order, filter));
  }, [dispatch, pages, order, filter]); //

  const allCharacters = useSelector((state) => state.characters);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getCharacters(pages, order, filter));
  };

  //PAGINADO
  const prev = (e) => {
    e.preventDefault();
    if (pages <= 0) {
      setPages(0);
    } else {
      setPages(pages - 6);
    }
  };

  const next = (e) => {
    e.preventDefault();
    if (allCharacters.length < 6) {
      return;
    } else {
      setPages(pages + 6);
    }
  };

  //ORDENAMIENTO
  const changeOrder = (e) => {
    e.preventDefault();
    setOrder(e.target.value);
  };

  //FILTRADO
  const changeFilter = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  return (
    <div>
      <NavLink to="/chapter">Create Chapter </NavLink>
      <h1>RICK AND MORTY</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload All Characters
      </button>
      <SearchBar />
      <div>
        <h5>Filter By Status:</h5>
        <select onChange={(e) => changeFilter(e)}>
          <option value="All">All</option>
          <option value="Alive">Alive</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <div>
        <h5>Order By Name:</h5>
        <select onChange={(e) => changeOrder(e)}>
          <option value="ASC">A-Z</option>
          <option value="DESC">Z-A</option>
        </select>
      </div>
      {/* <select onChange={(e) => handleFilterCreated(e)}>
          <option value="All">Todos</option>
          <option value="created">Creados</option>
          <option value="api">Existente</option>
        </select>
        <Paged
          charactersPerPage={charactesPerPage}
          allCharacters={allCharacters.length}
          page={page}
        /> */}

      {allCharacters?.map((c) => {
        return (
          <fragment>
            <NavLink to={"/details/" + c.id}>
              <CharacterCard name={c.name} image={c.image} key={c.id} />
            </NavLink>
          </fragment>
        );
      })}
      <button
        onClick={(e) => {
          prev(e);
        }}
        disabled={pages <= 0}
      >
        {"<--Prev"}
      </button>
      <button
        onClick={(e) => {
          next(e);
        }}
        disabled={pages <= 6}
      >
        {"Next-->"}
      </button>
    </div>
  );
}
