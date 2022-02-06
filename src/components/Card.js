import React from "react";

import Loader from "./Loader";
import { useGet } from "../utils";

export default function Card({ breed, remover = () => {} }) {
  const { data: img, reqStatus, fetchData } = useGet(`breed/${breed}/images/random/1`);
  return (
    <div className="card">
      <h1>{breed}</h1>
      <button onClick={() => fetchData()}>Get new image</button>
      <button onClick={() => remover()}>Remove</button>
      <Loader status={reqStatus}>
        <img src={img} />
      </Loader>
    </div>
  );
}
