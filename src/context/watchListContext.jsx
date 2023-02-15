import { createContext, useState, useEffect } from "react";

const WatchListContext = createContext();

const WatchListContextProvider = ({ children }) => {

  const [watchList, setWatchList] = useState(
    localStorage.getItem('watchList')?.split(',') || 
    ['GOOGL', 'AMZN', 'MSFT']);

  useEffect(() => {
    localStorage.setItem('watchList', watchList);
  }, [watchList])
  
  const addStock = (stock) => {
    if(!watchList.includes(stock)){
      setWatchList([...watchList, stock]);
    }
  }

  const removeStock = (stockName) => {
    const filteredWatchList = watchList.filter(stock => {
      if(stock !== stockName){
        return stock;
      }
    });
    setWatchList(filteredWatchList);
  }
  
  return (
    <WatchListContext.Provider value={{ watchList, addStock, removeStock }}>
      {children}
    </WatchListContext.Provider>
  )

}

export { WatchListContext, WatchListContextProvider };