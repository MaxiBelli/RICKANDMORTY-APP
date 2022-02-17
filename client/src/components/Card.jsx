import React from "react";
import styles from "./styles/Card.module.css";

export default function Card({ name, image }) {
  return (
    <div className={styles.conteinerCharacter}>
      <img src={image} alt="img not found" width="100%" height="100%" />
      <div className={styles.conteinerCharacterInfo}>
        <h1>{name}</h1>
      </div>
    </div>
  );
}
