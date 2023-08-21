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
import Strategy2 from "./components/Strategy2";
import OptionChainTable from "./components/OptionChainTable";
import FutureChainTable from "./components/FutureChainTable";
import OptionIntradaySingleStrike from "./components/OptionIntradaySingleStrike";
import FutureIntradaySingleStrike from "./components/FutureIntradaySingleStrike";
import OptionIntradayMultiStrike from "./components/OptionIntradayMultiStrike";

import MyComponent from "./components/demo";
import OICombinedChart from "./components/OICombinedChart";
import OIStackedBarChart from "./components/OIStackedBarChart";
import OptionStrategyBuilder from "./components/OptionStrategyBuilder";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/co_po_chart" element={<CoPoBarChart />} />
        <Route path="/co_po_change_chart" element={<CoPoChangeBarChart />} />
        <Route path="/intraday_oi_chart" element={<MultiStrikeOIChart />} />
        <Route path="/cumulative_oi_chart" element={<CumulativeOIChange />} />
        <Route path="/max_pain_chart" element={<MaxPainChart/>} />
        <Route path="/max_pain_intraday_chart" element={<MaxPainIntradayChart/>} />
        <Route path="/strategy_planner" element={<Strategy/>} />
        <Route path="/strategy_planner2" element={<Strategy2/>} />
        <Route path="/option_chain_table" element={<OptionChainTable/>} />
        <Route path="/future_chain_table" element={<FutureChainTable/>} />
        <Route path="/intraday_single_strike_option" element={<OptionIntradaySingleStrike/>} />
        <Route path="/intraday_future_table" element={<FutureIntradaySingleStrike/>} />
        <Route path="/intraday_multi_strike_option" element={<OptionIntradayMultiStrike/>} />
        <Route path="/oi_stats_options" element={<OICombinedChart/>} />
        <Route path="/oi_stacked_chart" element={<OIStackedBarChart/>} />
        <Route path="/options_strategy_builder" element={<OptionStrategyBuilder/>} />
        <Route path="/demo" element={<MyComponent/>} />
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
