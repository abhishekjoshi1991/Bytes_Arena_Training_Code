
import React, { useState, useEffect } from 'react'
import { Multiselect } from 'multiselect-react-dropdown';
import { Toggle } from 'rsuite';
// import Checkbox from '@mui/material/Checkbox';
import './css/toggle.css'


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
import Loader from './Loader';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// const line_options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart',
//     },
//   },
// };

export default function CumulativeOIChange() {

    const [expiryDateData, setExpiryDateData] = useState([])
    const [symbolData, setSymbolData] = useState([])
    // const [labelData, setLabelData] = useState([])
    const [dataset, setDataSet] = useState([])
    const [selectedValue, setSelectedValue] = useState([]);
    // const [checkedOne, setCheckedOne] = useState(false);
    // const [checkedTwo, setCheckedTwo] = useState(false);
    const [options, setOptions] = useState([])
    const [oiChecked, setOiChecked] = useState(true)
    const [oiChangeChecked, setOiChangeChecked] = useState(false)
    const [chartTitle, setChartTitle] = useState('')
    const [loader, setLoader] = useState(false)

    const line_options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: chartTitle,
            },
        },
    };

    async function api_call() {
        const res = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/cumulative_oi_chart')

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
        const res1 = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/get_strike_price', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(e.target.value)
        })
        const result1 = await res1.json()
        if (result1) {
            setOptions(result1)
        }
    }

    // handlers for getting selected values from strike price dropdown
    const selectHandle = (e) => {
        setSelectedValue(e.map((x) => x.Strike))
    };

    const removeHandle = (e) => {
        setSelectedValue(e.map((x) => x.Strike))
    };

    // handlers for geting checkboxes value
    // const handleChangeOne = () => {
    //   setCheckedOne(!checkedOne);
    // };

    // const handleChangeTwo = () => {
    //   setCheckedTwo(!checkedTwo);
    // };


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
        setLoader(true)
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const data = {
            expiry: formJson['expiry'],
            symbol: formJson['symbol'],
            // OI : checkedOne,
            // OICHG : checkedTwo,
            OI: oiChecked,
            OICHG: oiChangeChecked,
            strikes: selectedValue
        }

        if (oiChecked === true) {
            setChartTitle('Cumulative OI Chart')
        }
        else {
            setChartTitle('Cumulative OI Change Chart')
        }

        console.log(data)
        const res2 = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/cumulative_oi_chart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const api_result = await res2.json()
        console.log(api_result)
        if (api_result) {
            setLoader(false)
            setDataSet(api_result)
        }
    }



    const lineData =
    {
        labels: [],
        datasets: dataset
    }


    
        return (
            <div className="mt-5">
                <h2>Cumulative OI/OI Change Chart</h2>

                <form method="post" onSubmit={selectHandler}>
                    <div className="row mb-5 mt-5">
                        <div className="col-md-1"> <strong>Symbol</strong> </div>
                        <div className="col-md-2">
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

                        <div className="col-md-1"> <strong>Expiry Date</strong> </div>
                        <div className="col-md-2">
                            <select
                                className="form-control"
                                name="expiry"
                                onChange={e => expiryHandler(e)}
                            >
                                <option defaultValue>Select</option>

                                {expiryDateData.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-1"> <strong>Selected Strikes</strong> </div>
                        <div className="col-md-2">
                            <Multiselect
                                options={options}
                                displayValue='Strike'
                                placeholder='Select Strike Price'
                                hidePlaceholder={true}
                                onSelect={selectHandle}
                                onRemove={removeHandle}
                                showCheckbox={true}
                                closeIcon="cancel"
                                emptyRecordMsg='Select Expiry Date First'
                            />
                        </div>

                        {/* <div className="col-md-2">
            OI<Checkbox
              label="Value 1"
              value={checkedOne}
              onChange={handleChangeOne}
            />
            OI CHG<Checkbox
              label="Value 2"
              value={checkedTwo}
              onChange={handleChangeTwo}
            />
          </div> */}
                        <div className="col-md-2">
                            <Toggle arial-label="Switch" size="lg" checkedChildren="OI" unCheckedChildren="OICHG" onChange={toggleHandle} defaultChecked />
                        </div>
                        <div className="col-md-1"><button className="btn btn-info" type="submit">Submit</button></div>
                    </div>
                </form>
                {loader === true ? <Loader/> : <Line options={line_options} data={lineData} />}
            </div>
        )
}

