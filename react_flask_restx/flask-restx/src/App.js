import './App.css';
// import Hello from './components/Hello';
import CustomDropdown from './components/CustomDropdown';
// import ProductsQty from './components/ProductsQty';
import SalePerMonth from './components/SalePerMonth';

function App() {
  return (
    <div className="App">
      {/* <Hello/> */}
      <CustomDropdown/>
      <SalePerMonth/>
      {/* <ProductsQty/> */}
    </div>
  );
}

export default App;
