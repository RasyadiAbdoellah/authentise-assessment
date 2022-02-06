import React from "react";

import Loader from "./components/Loader";
import Card from "./components/Card";
import { useGet } from "./utils";

function App() {
  const { data, reqStatus } = useGet("breeds/list");
  const [filter, setFilter] = React.useState("");
  const [collection, setCollection] = React.useState([]);
  console.log(
    `rendered. ReqStatus: ${reqStatus} \n Data: ${data} \n Filter: ${filter} \n Collection: ${collection}`
  );
  const filteredList =
    filter.length > 0
      ? data.filter((item) => item.toLowerCase().includes(filter.toLowerCase()))
      : data;
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
        </div>
        <div className="list-content">
          <Loader status={reqStatus}>
            {filteredList.map((breed, i) => (
              <div
                key={`${breed}_${i}`}
                onClick={() => {
                  // append breed to collection if it doesn't exist, else return same object
                  setCollection((prevState) =>
                    !prevState.includes(breed)
                      ? [...prevState, breed]
                      : prevState
                  );
                }}
              >
                {breed}
              </div>
            ))}
          </Loader>
        </div>
      </div>
      <div id="collection">
        <h1>My Collection</h1>
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
    </>
  );
}

export default App;
