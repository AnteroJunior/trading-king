import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { finnHub } from '../api/finnHub';
import { StockChart } from '../components/StockChart';
import { StockData } from '../components/StockData';

const formatData = (data) => {
  return data.t.map((element, index) => {
    return {
      x: element * 1000,
      y: data.c[index].toFixed(2)
    }
  });
}

const StockDetailPage = () => {
  const { stock } = useParams();
  const [chartData, setChartData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);
      let dayAgo;

      if (date.getDay() === 6) {
        dayAgo = Math.floor(currentTime - 2 * 24 * 60 * 60)
      } else if (date.getDay() === 0) {
        dayAgo = Math.floor(currentTime - 3 * 24 * 60 * 60)
      } else {
        dayAgo = Math.floor(currentTime - (24 * 60 * 60));
      }

      const oneWeek = currentTime - 7 * 24 * 60 * 60;
      const oneYear = currentTime - 365 * 24 * 60 * 60;

      try {
        const responses = await Promise.all([
          finnHub.get('/stock/candle', {
            params: {
              symbol: stock,
              resolution: 30,
              from: dayAgo,
              to: currentTime,
            }
          }),
          finnHub.get('/stock/candle', {
            params: {
              symbol: stock,
              resolution: 60,
              from: oneWeek,
              to: currentTime,
            }
          }),
          finnHub.get('/stock/candle', {
            params: {
              symbol: stock,
              resolution: 'W',
              from: oneYear,
              to: currentTime,
            }
          })]);

        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data)
        })
      } catch (err) {
        console.log(err);
      }
      console.log(chartData)
    }
    fetchData();
  }, [stock]);

  return (
    <div>
      {
        chartData && (
          <div>
            <StockChart chartData={chartData} stock={stock} />
            <StockData symbol={stock}/>
          </div>)
      }
    </div>
  )
}

export { StockDetailPage };