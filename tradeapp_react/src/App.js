// import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import CoPoBarChart from './components/CoPoBarChart';
import CoPoChangeBarChart from './components/CoPoChangeBarChart';
import CumulativeOIChange from './components/CumulativeOIChange';
import MaxPainChart from "./components/MaxPainChart";
import MaxPainIntradayChart from "./components/MaxPainIntradayChart";
import MultiStrikeOIChart from './components/MultiStrikeOIChart';
import Strategy from "./components/Strategy";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/co_po_chart" element={<CoPoBarChart />} />
        <Route path="/co_po_change_chart" element={<CoPoChangeBarChart />} />
        <Route path="/multi_strike_chart" element={<MultiStrikeOIChart />} />
        <Route path="/cumulative_oi_chart" element={<CumulativeOIChange />} />
        <Route path="/max_pain_chart" element={<MaxPainChart/>} />
        <Route path="/max_pain_intraday_chart" element={<MaxPainIntradayChart/>} />
        <Route path="/strategy_planner" element={<Strategy/>} />
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   {/* <CoPoBarChart/> */}
    //   {/* <CoPoChangeBarChart/> */}
    //   {/* <MultiStrikeOIChart/> */}
    //   <CumulativeOIChange/>
    // </div>
  );
}
export default App;
