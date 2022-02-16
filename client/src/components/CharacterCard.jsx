import React from "react";
import './styles/rickAndMorty.css'

export default function CharacterCard({ name, image }) {
  return (
    <div class="character"> 
      <img src={image} alt="img not found" width="250px" height="250px" />
    <div  class = 'character-info'>
      <h5 >{name}</h5>
      </div>
    </div>
  );
}
