import { AutoComplete } from '../components/AutoComplete';
import { StockList } from '../components/StockList';
import Logo from '../images/logo.png';

const StockOverviewPage = () => {
  return (
    <div>
      <div className='d-flex justify-content-center'>
        <img src={Logo} alt='Trading King' className='' />
      </div>
      <AutoComplete />
      <StockList />
    </div>
  )
}

export { StockOverviewPage };