import React from 'react'

const baseUrl = 'https://dog.ceo/api/breeds/'

export function useGet(endpoint) {
  const url = baseUrl + endpoint
  const [reqStatus, setReqStatus] = React.useState('')
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    async function apiCall() {
      try {
        setReqStatus('getting')
        let res = await (await fetch(url)).json() //double await because .json also returns a promise
        setReqStatus('success')
        setData(Object.keys(res.message)) //dog breed is a message object property. Use Object.keys to create an array of dog breeds. 

      } catch (error) {
        setReqStatus('failed')
        console.error(error)

      }
    }

    apiCall()
  },[url])
  return { data, reqStatus }
}

export function useSortData (list, config = null) {
  const [sortConfig, setSortConfig] = React.useState(config)

  function sortBy (key) {
    let order = 'asc'
    if(sortConfig && sortConfig.key === key && sortConfig.order === 'asc') order = 'desc';

    setSortConfig({key, order})
  }

  const sortedList = React.useMemo(() => {
    let sorted = [...list]
    if(sortConfig !== null) {

      //If array of objects, sort by list object keys, else sort by array value
      sorted.sort((a,b) => {
        if(typeof a == "object") {
          if ( a[sortConfig.key] > b[sortConfig.key] ) return sortConfig.order === 'asc' ? 1 : -1;
          if ( a[sortConfig.key] < b[sortConfig.key] ) return sortConfig.order === 'asc' ? -1 : 1;
          return 0
        } else {
          if ( a > b ) return sortConfig.order === 'asc' ? 1 : -1;
          if ( a < b ) return sortConfig.order === 'asc' ? -1 : 1;
          return 0
        }
      })
    }
    return sorted
  }, [list, sortConfig])

  return {sortedList, sortBy, sortConfig}
}