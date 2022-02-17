import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../redux/actions";
import Card from "./Card";
import SearchBar from "./SearchBar";
import styles from "./styles/Home.module.css";

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
      <img
        src="https://occ-0-1068-1723.1.nflxso.net/dnm/api/v6/TsSRXvDuraoJ7apdkH6tsHhf-ZQ/AAAABbtnw6C35mhluezr-K_FiP65TW93xpH0M3S6lKPv50_7eshzc1vosWxE3CxcnJ5-eVYmpcaQyra9yFLzQtsNx4odwYO-GtDDmDU0.png?r=47e"
        alt="logo"
        width="40%"
        height="30%"
      ></img>
      <div className={styles.navBar}>
        <button className={styles.button}>
          <NavLink to="/chapter">Create Chapter</NavLink>
        </button>
        {/* <h1>RICK AND MORTY</h1> */}
        <button
          className={styles.button}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Refresh
        </button>
      </div>
      <div className={styles.navBar}>
        <select className={styles.select} onChange={(e) => changeFilter(e)}>
          <option>-Filter By Status-</option>
          <option value="All">All</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <SearchBar />
        <select className={styles.select} onChange={(e) => changeOrder(e)}>
          <option>-Order By Name-</option>
          <option value="ASC">A-Z</option>
          <option value="DESC">Z-A</option>
        </select>
      </div>
      <div className={styles.conteinerCharacters}>
        {allCharacters?.map((c) => {
          return (
            <fragment>
              <NavLink to={"/home/" + c.id}>
                <Card name={c.name} image={c.image} key={c.id} />
              </NavLink>
            </fragment>
          );
        })}
      </div>
      <div className={styles.cta}>
        <button
          className={styles.ctaButton}
          onClick={(e) => {
            prev(e);
          }}
          disabled={pages <= 0}
        >
          {" "}
          {/* <i class="fas fa-arrow-left"></i> */}
          {"<--Prev"}
        </button>
        <button
          className={styles.ctaButton}
          onClick={(e) => {
            next(e);
          }}
          disabled={allCharacters.length < 6}
        >
          {" "}
          {/* <i class="fas fa-arrow-right"></i> */}
          {"Next-->"}
        </button>
      </div>
    </div>
  );
}
