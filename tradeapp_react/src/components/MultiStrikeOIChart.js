import React, { useState, useEffect } from 'react'
import { Multiselect } from 'multiselect-react-dropdown';
import { Toggle } from 'rsuite';
import Checkbox from '@mui/material/Checkbox';
import './css/toggle.css'
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { MultiSelect } from "react-multi-select-component";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
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
  scales: {
    x: {
      grid: {
        display: false
      }
    }
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false
  },
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
  const [selectedExpiry, setSelectedExpiry] = useState([])
  const [symbolData, setSymbolData] = useState([])
  const [dataset, setDataSet] = useState([])
  const [selectedValue, setSelectedValue] = useState([]);
  const [options, setOptions] = useState([])
  const [OIToggle, setOIToggle] = useState('oi')
  const [strikeBoolean, setStrikeBoolean] = useState('ind')
  const [atmStrike, setATMStrike] = useState('')


  async function api_call() {
    const symbol = ["NIFTY"]
    setSymbolData(symbol)

    const request_api = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/multi_strike_line_chart')
    const result_api = await request_api.json()

    if (result_api) {
      setExpiryDateData(result_api)
      setSelectedExpiry([result_api[0]])
      const request_strike_price = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/get_strike_price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'expiry': [result_api[0]['label']] })
      })
      const result_strike_price = await request_strike_price.json()
      if (result_strike_price) {
        setOptions(result_strike_price['strike_price_list'])
        setATMStrike(result_strike_price['atm_strike'])
        setSelectedValue(result_strike_price['atm_strike_data'])
      }
    }
  }

  useEffect(() => {
    api_call();
  }, [])

  // function for getting strike prices based on expiry date selected
  async function expiryHandler(e) {
    setSelectedValue([])
    if (e.length === 0) {
      setSelectedExpiry([expiryDateData[0]])
      const request_strike = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/get_strike_price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'expiry': [expiryDateData[0]['label']] })
      })
      const result_strike = await request_strike.json()
      if (result_strike) {
        setOptions(result_strike['strike_price_list'])
      }
    }
    else {
      setSelectedExpiry(e)
      const exp_array = e.map(myFunction)

      function myFunction(value) {
        return value['label'];
      }

      const request_strike = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/get_strike_price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify(e.target.value)
        body: JSON.stringify({ 'expiry': exp_array })
      })
      const result_strike = await request_strike.json()
      if (result_strike) {
        setOptions(result_strike['strike_price_list'])
      }
    }
  }

  // handlers for getting selected values from strike price dropdown
  const selectStrikeHandle = (e) => {
    setSelectedValue(e.map((x) => x.Strike))
  };

  const removeStrikeHandle = (e) => {
    setSelectedValue(e.map((x) => x.Strike))
  };

  const strikeHandle = (e) => {
    if (e.length > 10) {
      alert('Please select upto 10 strikes only!')
    }
    else {
      setSelectedValue(e)
    }
  }

  const handleOIToggle = (event, value) => {
    if (value !== null) {
      setOIToggle(value);
    }
  };

  const handleIndividualAllStrike = (event, value) => {
    setStrikeBoolean(value)
  }

  // form submit handler
  async function selectHandler(e) {
    if (selectedValue.length === 0) {
      alert('Please Select the Strike')
    }
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const expiries = selectedExpiry.map(expFunction)
    const strikes = selectedValue.map(expFunction)
    function expFunction(value) {
      return value['label'];
    }

    const formJson = Object.fromEntries(formData.entries());

    const data = {
      symbol: formJson['symbol'],
      expiry: expiries,
      strike: strikes,
      individual_or_all_strike: formJson['individual_or_all_strike'],
      oi_or_oi_change: OIToggle,
    }
    console.log(data)


    // if (checkedCumulativeExpiry || checkedCumulativeStrike) {
    //   console.log('something is true')
    //   var api_link = 'http://127.0.0.1:7010/tradeapp/api/v1/option_chain/cumulative_oi_chart'
    // }
    // else {
    //   var api_link = 'http://127.0.0.1:7010/tradeapp/api/v1/option_chain/multi_strike_line_chart'
    //   console.log('all false')
    // }
    const request_api = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/multi_strike_line_chart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const result_api = await request_api.json()
    if (result_api) {
      setDataSet(result_api)
    }
  }

  const lineData =
  {
    labels: [],
    datasets: dataset
  }

  return (
    <div className="mt-2 ">
      <h4 className='text-center'>Intraday OI Chart</h4>

      <form method="post" onSubmit={selectHandler}>
        <div className="row">
          <div style={{ width: '5rem' }} className='mt-2'> <strong>Symbol</strong> </div>
          <div className="col-md-1 mt-2">
            <select
              className="form-control"
              name="symbol"
            >
              {symbolData.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div style={{ width: '7.5rem' }} className='mt-2'> <strong>Expiry Date</strong> </div>
          <div className="col-md-2 mt-2">
            <MultiSelect
              options={expiryDateData}
              value={selectedExpiry}
              onChange={expiryHandler}
              labelledBy={"Select"}
            />
          </div>
          
          <div style={{ width: '12rem' }} className='col-md-2'>
            <FormControl>
              <RadioGroup
                aria-labelledby="individual_or_all_strike-label"
                name="individual_or_all_strike"
                value={strikeBoolean}
                onChange={handleIndividualAllStrike}
              >
                <FormControlLabel value="ind" control={<Radio sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: 16,
                  },
                }} />} label="Individual Strike" />
                <FormControlLabel value="all" control={<Radio sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: 16,
                  },
                }} />} label="All Strike" />

              </RadioGroup>
            </FormControl>
          </div>
          
          {/* section for strike price */}
          {strikeBoolean === 'ind' &&
            <div style={{ width: '6rem' }} className='mt-2'> <strong>Selected Strikes</strong> </div>}
          {strikeBoolean === 'ind' &&
            // <div className="col-md-2 mt-2">
            //   <Multiselect
            //     options={options}
            //     displayValue='Strike'
            //     placeholder='Select Strike Price'
            //     hidePlaceholder={true}
            //     onSelect={selectStrikeHandle}
            //     onRemove={removeStrikeHandle}
            //     showCheckbox={true}
            //     closeIcon="cancel"
            //     selectionLimit={10}
            //     emptyRecordMsg='Select Expiry Date First'
            //     ref={multiselectRef}
            //     // selectedValues={selectedValue} 
            //   />
            // </div>
            <div className="col-md-2 mt-2">
              <MultiSelect
                options={options}
                value={selectedValue}
                onChange={strikeHandle}
                labelledBy={"Select"}
                hasSelectAll={false}
              />
            </div>
          }

          

          <div style={{ width: '8rem' }} className="col-md-2 mt-2">
            <ToggleButtonGroup
              color="primary"
              value={OIToggle}
              exclusive
              onChange={handleOIToggle}
              aria-label="Platform"
              size='small'
            >
              <ToggleButton value="oi"><strong className='mx-2' >OI</strong></ToggleButton>
              <ToggleButton value="chg"><strong>OICHG</strong></ToggleButton>
            </ToggleButtonGroup>
          </div>

          {/* {(checkedCumulativeExpiry === true || checkedCumulativeStrike === true) ?
            <div className='col-md-2' style={{ width: '150px' }}>
              <div>
                <input type="radio" name="color" value="redgreen" id="redgreen" onChange={handleRedGreen} />
                <label htmlFor="redgreen"><label style={{ color: 'red' }}>&nbsp;Call,</label> <label style={{ color: 'green' }}>Put</label></label>
              </div>
              <div>
                <input type="radio" name="color" value="greenred" id="greenred" onChange={handleGreenRed} />
                <label htmlFor="greenred"><label style={{ color: 'green' }}>&nbsp;Call,</label> <label style={{ color: 'red' }}>Put</label></label>
              </div>
            </div> : ''} */}
          <div className="col-md-1 mt-2"><button className="btn btn-info" type="submit">Submit</button></div>
        </div>
        {/* {allSelected === 'selected' && sameDifferentStrike === 'different' ? */}
        <div>
          <h6 style={{ fontSize: 14, fontStyle: 'italic' }}>Selected Expiries: {selectedExpiry.map(obj => obj['value']).join(', ')}</h6>
        </div>
      </form>

      <Line options={line_options} data={lineData} />
    </div>
  )
}
