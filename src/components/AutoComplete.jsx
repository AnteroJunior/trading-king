import { useState, useEffect, useContext } from 'react';
import { finnHub } from '../api/finnHub';
import { WatchListContext } from '../context/watchListContext';

const styleDropdown = {
  height: '500px',
  cursor: 'pointer',
  overflowY: 'scroll',
  overflowX: 'hidden'
}

const AutoComplete = () => {

  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const { addStock } = useContext(WatchListContext);

  const handleAddStock = (stock) => {
    addStock(stock);
    setSearch('');
  }

  const renderDropdown = () => {
    const dropDown = search ? 'show' : '';
    return (
      <ul className={`dropdown-menu ${dropDown}`} style={styleDropdown}>
        {
          results.map(result => {
            return (
              <li className='dropdown-item' key={result.symbol} onClick={() => handleAddStock(result.symbol)}>{result.description} ({result.symbol})</li>
            )
          })
        }
      </ul>
    )
  }

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get('/search', {
          params: {
            q: search
          }
        });

        if (isMounted) {
          setResults(response.data.result);
        }

      } catch (err) {
        console.log(err.message);
      }
    }

    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }

    return () => (isMounted = false);
  }, [search]);

  return (
    <div className='w-50 p-3 rounded mx-auto my-3'>
      <div className='form-floating'>
        <input id="search" className='form-control' type='text' placeholder='Search' autoComplete='off' value={search} onChange={(e) => setSearch(e.target.value)} />
        <label htmlFor='search' className='text-secondary'>Search</label>
        {renderDropdown()}
      </div>
    </div >
  )
}

export { AutoComplete };