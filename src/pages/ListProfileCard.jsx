import React from "react";
import "./ListProfileCard.css";

const ListProfileCard = ({ title, items = [] }) => {
  // This logic is essential: It splits the list into chunks of 10.
  const columns = [];
  const chunkSize = 10;
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    columns.push(chunk);
  }

  return (
    <div className="listBox">
      <div className="list-card">
        <div className="list-card-content">
          <h3>{title}</h3>
          
          {/* This part maps over the new chunks to create separate columns */}
          <div className="list-columns-container">
            {columns.map((columnItems, columnIndex) => (
              <ul key={columnIndex} className="list-column">
                {columnItems.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProfileCard;