import React from "react";

export default function CharacterCard({ name, image }) {
  return (
    <div>
      <h5>{name}</h5>
      <img src={image} alt="img not found" width="250px" height="250px" />
    </div>
  );
}
