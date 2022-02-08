import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../redux/actions";

export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const myCharacter = useSelector((state) => state.detail);

  return (
    <div>
      {myCharacter.length > 0 ? (
        <div>
          <h1>{myCharacter[0].name}</h1>
          <img src={myCharacter[0].img} alt="no hay imagen" />
          <h2>Status: {myCharacter[0].status}</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <NavLink to="/home">
        <button>Back</button>
      </NavLink>
    </div>
  );
}
