import React from 'react'

import Loader from './components/Loader'
import { useGet } from './utils'

function App() {
  const { data, reqStatus } = useGet('list/all')
  const [filter, setFilter] = React.useState('')

  const filteredList = filter.length > 0 ? data.filter( item => item.toLowerCase().includes(filter.toLowerCase())) : data
  return (
    <div className="App">
      <div className='search'>
        <label htmlFor='searchInput'>Search by breed</label>
        <input id='searchInput' value={filter} onChange={e => setFilter(e.target.value)} placeholder='Dog breed'/>
      </div>
      <Loader status={reqStatus}>
        {filteredList.map(breed => (
          <div>
            {breed}
          </div>
        ))}
      </Loader>
    </div>
  );
}

export default App;