import { useState, useEffect, useContext } from "react";
import { finnHub } from '../api/finnHub';
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { WatchListContext } from '../context/watchListContext';
import { useNavigate } from 'react-router-dom';

const StockList = () => {

  const [stocks, setStocks] = useState();
  const { watchList, removeStock } = useContext(WatchListContext);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {

        const responses = await Promise.all(watchList.map(stock => {
          return finnHub.get('/quote', {
            params: {
              symbol: stock
            }
          })
        }))

        const data = responses.map(response => {
          return {
            data: response.data,
            symbol: response.config.params.symbol
          }
        })

        if (isMounted) {
          setStocks(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();

    return () => (isMounted = false)
  }, [watchList]);

  const handleStockClick = (symbol) => {
    navigate(`detail/${symbol}`);
  }

  return (
    <div>
      {stocks &&
        <table className='table table-hover text-center'>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Last</th>
              <th scope='col'>Chg</th>
              <th scope='col'>Chg %</th>
              <th scope='col'>High</th>
              <th scope='col'>Low</th>
              <th scope='col'>Open</th>
              <th scope='col'>PClose</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {
              stocks.map(stock => {
                return (
                  <tr onClick={() => handleStockClick(stock.symbol)} key={stock.symbol} style={{ cursor: 'pointer' }} className='table-row'>
                    <th scope='row'>{stock.symbol}</th>
                    <td>$ {stock.data.c}</td>
                    {stock.data.d < 0 ? <td className='text-danger'>$ {stock.data.d}<AiFillCaretDown /></td> : <td className='text-success'>$ {stock.data.d}<AiFillCaretUp /></td>}
                    {stock.data.dp < 0 ? <td className='text-danger'>{stock.data.dp}<AiFillCaretDown /></td> : <td className='text-success'>{stock.data.dp}<AiFillCaretUp /></td>}
                    <td>$ {stock.data.h}</td>
                    <td>$ {stock.data.l}</td>
                    <td>$ {stock.data.o}</td>
                    <td>$ {stock.data.pc} <button className='btn btn-danger btn-sm delete-button' onClick={(e) => {
                      e.stopPropagation()
                      removeStock(stock.symbol)
                    }}>Remove</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      }
    </div>
  )
}

export { StockList };