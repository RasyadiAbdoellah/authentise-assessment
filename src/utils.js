import React from "react";

const baseUrl = "https://dog.ceo/api/";

export function useGet(endpoint) {
  const url = baseUrl + endpoint;
  const [response, setResponse] = React.useState({
    reqStatus: "awaiting",
    data: [],
  });

  const fetchData = React.useCallback(async () => {
    try {
      setResponse({ reqStatus: "getting", data: [] });
      let res = await fetch(url);
      if (!res.ok) {
        throw `${res.status} ${res.statusText}`;
      }

      res = await res.json();

      setResponse({ reqStatus: "success", data: res.message }); //API always sends an object with message and status. We only want the message
    } catch (error) {
      setResponse({ reqStatus: "failed", data: [error] });
      console.error(error);
    }
  }, [url]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...response, fetchData }; //return state and fetch function so component can force refetch data if needed
}

export function useSortData(list, config = null) {
  const [sortConfig, setSortConfig] = React.useState(config);

  function sortBy(key) {
    let order = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.order === "asc")
      order = "desc";

    setSortConfig({ key, order });
  }

  const sortedList = React.useMemo(() => {
    let sorted = [...list];
    if (sortConfig !== null) {
      //If array of objects, sort by list object keys, else sort by array value
      sorted.sort((a, b) => {
        if (typeof a == "object") {
          if (a[sortConfig.key] > b[sortConfig.key])
            return sortConfig.order === "asc" ? 1 : -1;
          if (a[sortConfig.key] < b[sortConfig.key])
            return sortConfig.order === "asc" ? -1 : 1;
          return 0;
        } else {
          if (a > b) return sortConfig.order === "asc" ? 1 : -1;
          if (a < b) return sortConfig.order === "asc" ? -1 : 1;
          return 0;
        }
      });
    }
    return sorted;
  }, [list, sortConfig]);

  return { sortedList, sortBy, sortConfig };
}
