import React from "react";
// import "../index.css"

const ServiceCard = (props) => {
  return (
    <div className="card">
      <div className="card-img">
        <img src="images/design.png" alt="our service info" width="500" />
      </div>
      <div className="card-details">
        <div className="grid grid-two-cols">
          <p>{props.provider}</p>
          <p>{props.price}</p>
        </div>
        <h2>{props.service}</h2>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
