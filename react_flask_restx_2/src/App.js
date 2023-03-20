import './App.css';
import SalePie from './components/SalePie';
import Hello from './components/Hello';
import CustomDropdown from './components/CustomDropdown';
// import ProductsQty from './components/ProductsQty';
import SalePerMonth from './components/SalePerMonth';
import CustomerDropdown from './components/SaleAllMonth';
import CategProductCount from './components/CategProductCount';
import CustCategWiseUnitSold from './components/CustCategWiseUnitSold';
import BarSaleAllYear from './components/BarSaleAllYear';
// import Test from './components/Test';

function App() {
  return (
    <div className="App">
      <Hello/>
      <CustomDropdown/>
      <SalePerMonth/>
      {/* <Test/> */}
      {/* <ProductsQty/> */}
      <CustomerDropdown/>
      <SalePie/>
      <CategProductCount/>
      <CustCategWiseUnitSold/>
      <BarSaleAllYear/>
    </div>
  );
}

export default App;
