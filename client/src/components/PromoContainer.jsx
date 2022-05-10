import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import promocontainer from '../css/PromoContainer.css'

export default function PromoContainer() {
  const [listOfPromo, setListOfPromo] = useState([]);

  React.useEffect(() => {
    // How do I add fixed Search Term? -> Lamps

    const queryString = new URLSearchParams("q=designer+lamps");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/search?${queryString}`)
      .then((response) => {
        setListOfPromo(response.data.slice(0, 6));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div >
      {listOfPromo.slice(0,3).map((x) => {
        return (
          <Link  key={x.link} to={`/search/results/${x.asin}`}>
            <img  src={x.image} />
          </Link>
        );
      })}{" "};

{listOfPromo.slice(3,6).map((x) => {
        return (
          <Link  key={x.link} to={`/search/results/${x.asin}`}>
            <img  src={x.image} />
          </Link>
        );
      })}{" "}

    </div>

  );
}
