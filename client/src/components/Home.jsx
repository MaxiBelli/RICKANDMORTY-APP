import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../redux/actions";
import CharacterCard from "./CharacterCard";
import SearchBar from "./SearchBar";
import './styles/rickAndMorty.css'

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
    <div class="container">
      <NavLink to="/chapter">Create Chapter</NavLink>
      <img
        src="https://occ-0-1068-1723.1.nflxso.net/dnm/api/v6/TsSRXvDuraoJ7apdkH6tsHhf-ZQ/AAAABbtnw6C35mhluezr-K_FiP65TW93xpH0M3S6lKPv50_7eshzc1vosWxE3CxcnJ5-eVYmpcaQyra9yFLzQtsNx4odwYO-GtDDmDU0.png?r=47e"
        alt="logo"
        class="logo"
      ></img>
      {/* <h1>RICK AND MORTY</h1> */}
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
          <option value="Dead">Dead</option>
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
            <NavLink to={"/home/" + c.id}>
              <CharacterCard name={c.name} image={c.image} key={c.id} />
            </NavLink>
          </fragment>
        );
      })}
      <div class="cta">
      <button class="prev" id="prev"
        onClick={(e) => {
          prev(e);
        }}
        disabled={pages <= 0}
      > <i class="fas fa-arrow-left"></i>
        {"<--Prev"}
      </button>
      <button class="next" id="next"
        onClick={(e) => {
          next(e);
        }}
        disabled={allCharacters.length < 6}
      > <i class="fas fa-arrow-right"></i>
        {"Next-->"}
      </button>
      </div>
    </div>
  );
}
