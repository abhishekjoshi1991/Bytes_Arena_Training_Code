import React, { useState, useEffect } from 'react'
import { Multiselect } from 'multiselect-react-dropdown';
import { Toggle } from 'rsuite';
import Checkbox from '@mui/material/Checkbox';
import './css/toggle.css'

import { MultiSelect } from "react-multi-select-component";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const line_options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },

    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
};

export default function MultiStrikeOIChart() {

  const [expiryDateData, setExpiryDateData] = useState([])
  const [symbolData, setSymbolData] = useState([])
  // const [labelData, setLabelData] = useState([])
  const [dataset, setDataSet] = useState([])
  const [selectedValue, setSelectedValue] = useState([]);
  const [checkedCumulativeExpiry, setCheckedCumulativeExpiry] = useState(false);
  const [checkedCumulativeStrike, setCheckedCumulativeStrike] = useState(false);
  // const [checkedTwo, setCheckedTwo] = useState(false);
  const [options, setOptions] = useState([])
  const [oiChecked, setOiChecked] = useState(true)
  const [oiChangeChecked, setOiChangeChecked] = useState(false)
  const [selectedExpiry, setSelectedExpiry] = useState([])
  const [checkedRedGreen, setCheckedRedGreen] = useState(false)
  const [checkedGreenRed, setCheckedGreenRed] = useState(false)

  async function api_call() {
    const res = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/multi_strike_line_chart')

    const result = await res.json()
    if (result) {
      setExpiryDateData(result)
    }
    const symbol = ["NIFTY"]
    setSymbolData(symbol)
  }

  useEffect(() => {
    api_call();
  }, [])

  // function for getting strike prices based on expiry date selected
  async function expiryHandler(e) {
    console.log(e)
    setSelectedExpiry(e)

    const exp_array = e.map(myFunction)

    function myFunction(value) {
      return value['label'];
    }
    // console.log(selectedExpiry)

    const res1 = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/get_strike_price', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify(e.target.value)
      body: JSON.stringify(exp_array)
    })
    const result1 = await res1.json()
    if (result1) {
      setOptions(result1)
    }
  }

  // handlers for getting selected values from strike price dropdown
  const selectStrikeHandle = (e) => {
    setSelectedValue(e.map((x) => x.Strike))
  };

  const removeStrikeHandle = (e) => {
    setSelectedValue(e.map((x) => x.Strike))
  };

  // handlers for geting cumulative checkboxes value
  const handleCumulativeExpiry = () => {
    setCheckedCumulativeExpiry(!checkedCumulativeExpiry);
  };
  const handleCumulativeStrike = () => {
    setCheckedCumulativeStrike(!checkedCumulativeStrike);
  };

  // handlers for geting cumulative checkboxes value for color choices
  const handleRedGreen = () => {
    setCheckedRedGreen(!checkedRedGreen);
    setCheckedGreenRed(false);
  };
  const handleGreenRed = () => {
    setCheckedGreenRed(!checkedGreenRed);
    setCheckedRedGreen(false);
  };

  // toggle to handle oi and oi change
  const toggleHandle = (e) => {
    if (e === false) {
      setOiChecked(false)
      setOiChangeChecked(true)
    }
    if (e === true) {
      setOiChecked(true)
      setOiChangeChecked(false)
    }
  };


  // form submit handler
  async function selectHandler(e) {
    // console.log(oiChecked)
    // console.log(oiChangeChecked)
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    console.log(formData)

    const expiries = selectedExpiry.map(expFunction)

    function expFunction(value) {
      return value['label'];
    }

    const formJson = Object.fromEntries(formData.entries());
    const data = {
      // expiry: formJson['expiry'],
      expiry: expiries,
      symbol: formJson['symbol'],
      // OI : checkedOne,
      // OICHG : checkedTwo,
      redgreen: checkedRedGreen,
      greenred: checkedGreenRed,
      cumexp: checkedCumulativeExpiry,
      cumstrike: checkedCumulativeStrike,
      OI: oiChecked,
      OICHG: oiChangeChecked,
      strikes: selectedValue
    }
    console.log('data', data)
    console.log('rg', checkedRedGreen)

    if (checkedCumulativeExpiry || checkedCumulativeStrike) {
      console.log('something is true')
      var api_link = 'http://127.0.0.1:7010/tradeapp/api/v1/option_chain/cumulative_oi_chart'
    }
    else {
      var api_link = 'http://127.0.0.1:7010/tradeapp/api/v1/option_chain/multi_strike_line_chart'
      console.log('all false')
    }
    const res2 = await fetch(api_link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const api_result = await res2.json()
    if (api_result) {
      setDataSet(api_result)
    }
  }


  const lineData =
  {
    labels: [],
    datasets: dataset
  }

  return (
    <div className="mt-1">
      <h3 className='mb-4'>Multi Strike Line Chart</h3>

      {/* top row */}
      <div className='row'>
        <div className='col-md-2'></div>
        <div className='col-md-2' style={{ marginLeft: '35px' }}><label>Cumulative Expiry</label>
          <Checkbox
            label="Value 1"
            value={checkedCumulativeExpiry}
            onChange={handleCumulativeExpiry}
          /></div>
        <div className='col-md-2' style={{ marginLeft: '85px' }}><label>Cumulative Strikes</label>
          <Checkbox
            label="Value 1"
            value={checkedCumulativeStrike}
            onChange={handleCumulativeStrike}
          />  </div>
        <div className='col-md-1'></div>
      </div>

      {/* second row */}
      <form method="post" onSubmit={selectHandler}>
        <div className="row mb-5">
          <div style={{ width: '70px' }} className='mt-1'> <strong>Symbol</strong> </div>
          <div className="col-md-1">
            <select
              className="form-control"
              name="symbol"
            >
              {/* <option defaultValue>Select</option> */}
              {symbolData.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>


          <div style={{ width: '115px' }} className='mt-1'> <strong>Expiry Date</strong> </div>
          <div className="col-md-2">
            <MultiSelect
              options={expiryDateData}
              value={selectedExpiry}
              onChange={expiryHandler}
              labelledBy={"Select"}
            />

          </div>

          {/* <div style={{width:'85px'}}> <strong>Expiry Multi</strong> </div>
          <div className="col-md-2">
            <Multiselect
              options={expiryDateData}
              displayValue='Exp'
              placeholder='Select Expiry Dates'
              hidePlaceholder={true}
              // onSelect={selectExpiryHandle}
              // onRemove={removeExpiryHandle}
              onChange={expiryHandler}
              showCheckbox={true}
              closeIcon="cancel"
              // emptyRecordMsg='Select Expiry Date First'
            />
          </div> */}

          {/* section for strike price */}
          <div style={{ width: '85px' }}> <strong>Selected Strikes</strong> </div>
          <div className="col-md-2">
            <Multiselect
              options={options}
              displayValue='Strike'
              placeholder='Select Strike Price'
              hidePlaceholder={true}
              onSelect={selectStrikeHandle}
              onRemove={removeStrikeHandle}
              showCheckbox={true}
              closeIcon="cancel"
              emptyRecordMsg='Select Expiry Date First'
            />
          </div>

          {/* <div style={{ width: '200px' }} className="col-md-2">
            <label>Plot Cumulative</label>
            <Checkbox
              label="Value 1"
              value={checkedCumulative}
              onChange={handleChangeOne}
            />
          </div> */}

          {/* section for color choice for call and put */}
          {/* {(checkedCumulativeExpiry === true || checkedCumulativeStrike === true) ? <div style={{ width: '130px' }} className="col-md-1">
            <label style={{ color: 'red' }}>Call,</label> <label style={{ color: 'green' }}>Put</label>
            <Checkbox
              label="Value 1"
              value={checkedRedGreen}
              onChange={handleRedGreen}
            />
          </div> : ''}

          {(checkedCumulativeExpiry === true || checkedCumulativeStrike === true) ?
            <div style={{ width: '130px' }} className="col-md-1">
              <label style={{ color: 'green' }}>Call,</label> <label style={{ color: 'red' }}>Put</label>
              <Checkbox
                label="Value 1"
                value={checkedGreenRed}
                onChange={handleGreenRed}
              />
            </div> : ''} */}
          
          <div style={{ width: '100px' }} className="col-md-1">
            <Toggle arial-label="Switch" size="lg" checkedChildren="OI" unCheckedChildren="OICHG" onChange={toggleHandle} defaultChecked />
          </div>

          {(checkedCumulativeExpiry === true || checkedCumulativeStrike === true) ? 
          <div className='col-md-2' style={{ width: '150px' }}>
            <div>
              <input type="radio" name="color" value="redgreen" id="redgreen" onChange={handleRedGreen}/>
              <label htmlFor="redgreen"><label style={{ color: 'red' }}>&nbsp;Call,</label> <label style={{ color: 'green' }}>Put</label></label>
            </div>
            <div>
              <input type="radio" name="color" value="greenred" id="greenred" onChange={handleGreenRed}/>
              <label htmlFor="greenred"><label style={{ color: 'green' }}>&nbsp;Call,</label> <label style={{ color: 'red' }}>Put</label></label>
            </div>
          </div> : ''}
          <div className="col-md-1"><button className="btn btn-info" type="submit">Submit</button></div>
        </div>
      </form>
      <Line options={line_options} data={lineData} />
    </div>
  )
}
