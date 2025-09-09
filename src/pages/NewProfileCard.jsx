import React from "react";
import "./NewProfileCard.css";

const NewProfileCard = ({ name, title, description, imageUrl }) => {
  return (
    <div className="cardBox">
      <div className="card">
        <img src={imageUrl} alt={name} />
        <div className="content">
          <h3>{name}</h3>
          <h4 className="text-lg font-semibold">{title}</h4>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default NewProfileCard;