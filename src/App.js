import React from "react";

import Loader from "./components/Loader";
import Card from "./components/Card";
import { useGet } from "./utils";

function App() {
  const { data, reqStatus } = useGet("breeds/list");
  const [filter, setFilter] = React.useState("");
  const [collection, setCollection] = React.useState([]);

  const filteredList =
    filter.length > 0
      ? data.filter((item) => item.toLowerCase().includes(filter.toLowerCase()))
      : data;

  function addToCollection(breed) {
    // append breed to collection if it doesn't exist, else return same object
    setCollection((prevState) =>
      !prevState.includes(breed) ? [...prevState, breed] : prevState
    );
  }

  return (
    <>
      <div id="list">
        <div className="list-search">
          <label htmlFor="searchInput">Search by breed</label>
          <input
            id="searchInput"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Dog breed"
          />
          <button
            onClick={() => {
              const i = Math.floor(Math.random() * data.length);
              addToCollection(data[i]);
            }}
          >
            Add random breed
          </button>
        </div>
        <div className="list-content">
          <Loader status={reqStatus}>
            {filteredList.map((breed, i) => (
              <div key={`${breed}_${i}`} onClick={() => addToCollection(breed)}>
                {breed}
              </div>
            ))}
          </Loader>
        </div>
      </div>
      <div id="collection">
        <h1>My Collection</h1>
        <div className="collection-content">
          {collection.map((breed, i) => (
            <Card
              breed={breed}
              remover={() => {
                setCollection((prevState) => {
                  const newState = [...prevState];
                  newState.splice(i, 1);
                  return newState;
                });
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
