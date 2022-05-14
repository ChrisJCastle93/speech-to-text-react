import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/PromoContainer.css"

export default function PromoContainer() {
  const [listOfPromo, setListOfPromo] = useState([]);

  React.useEffect(() => {
    const queryString = new URLSearchParams("q=designer+lamps");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/search?${queryString}`)
      .then((response) => {
        setListOfPromo(response.data.slice(0, 6));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
        <section id="promo-box">
      {listOfPromo.slice(0,3).map((x) => {
        return (
          <Link key={x.link} to={`/search/results/${x.asin}`}>
            <img id="promo" src={x.image} alt={x.name}/>
          </Link>
        );
      })}{" "}
      </section>

      <section id="promo-box">
      {listOfPromo.slice(3,6).map((x) => {
        return (
          <Link key={x.link} to={`/search/results/${x.asin}`}>
            <img id="promo" src={x.image} alt={x.name}/>
          </Link>
        );
      })}{" "}
      </section>
    </div>
  );
}
