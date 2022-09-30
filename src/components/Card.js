import React from "react";

const Card = (props) => {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <li style={{ listStyleType: "none" }}>
      <div className="card" onClick={handleClick}>
        <img
          className="card__image"
          src={props.card.avatar}
          alt={props.card.first_name}
        />
        <div className="card__description">
          <h2 className="card__title">{props.card.first_name}</h2>
          <h2 className="card__title">{props.card.last_name}</h2>
        </div>
      </div>
    </li>
  );
};

export default Card;
