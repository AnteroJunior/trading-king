import Chart from 'react-apexcharts';
import { useState } from 'react';


const StockChart = ({ chartData, stock }) => {

  const { day, week, year } = chartData;
  const [dateFormat, setDateFormat] = useState(day);
  const color = dateFormat[dateFormat.length - 1].y - dateFormat[0].y > 0 ? '#26C281' : '#ED3419';

  const options = {
    colors: [color],
    title: {
      text: stock,
      align: 'center',
      style: {
        fontSize: '24px',
      }
    },
    chart: {
      id: 'Stock data',
      animations: {
        speed: 1300,
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false
      }
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM"
      }
    }
  }

  const series = [{
    name: stock,
    data: dateFormat,
  }];

  return (
    <div className='mt-1 p-1 shadow-sm bg-white' style={{ height: '90vh' }}>
      <Chart options={options} series={series} type='area' width='90%' height='80%' />
      <div className='d-flex gap-2 pt-3'>
        <button onClick={() => setDateFormat(day)} className={`btn ${dateFormat === day ? 'btn-primary' : 'btn-outline-primary'}`}>1d</button>
        <button onClick={() => setDateFormat(week)} className={`btn ${dateFormat === week ? 'btn-primary' : 'btn-outline-primary'}`}>1w</button>
        <button onClick={() => setDateFormat(year)} className={`btn ${dateFormat === year ? 'btn-primary' : 'btn-outline-primary'}`}>1y</button>
      </div>
    </div>
  )
}

export { StockChart };