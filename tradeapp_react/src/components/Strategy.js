// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
// import FormLabel from '@mui/material/FormLabel';
import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import StrategyCounter from './StrategyCounter';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

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
import Table from './Table';

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


export default function Strategy() {
    const [expiryDateData, setExpiryDateData] = useState([])
    const [index, setIndex] = useState('nifty');
    const [segment, setSegment] = useState('futures');
    const [expiry, setExpiry] = useState("");
    const [optionStrike, setOptionStrike] = useState([]);
    const [optionStrikeData, setOptionStrikeData] = useState([]);
    const [optionType, setOptionType] = useState('CE');
    const [radioValue, setRadioValue] = useState('BUY');
    const [count, setCount] = useState(0);
    const [dateValue, setDateValue] = useState(dayjs());
    const [dataset, setDataSet] = useState([]);
    const [inputData, setInputData] = useState([])
    const [entryValue, setEntryValue] = useState(0)
    const [tableData, setTableData] = useState([])
    const [tableProps, setTableProps] = useState([])

    // const [dataValue, setDataValue] = useState('')

    async function api_call() {
        const res = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/strategy_planner')

        const result = await res.json()
        if (result) {
            setExpiryDateData(result)
        }

    }

    useEffect(() => {
        api_call();
    }, [])

    const getcount = (qty) => {
        setCount(qty)
    }


    async function handleExpiry(event) {
        setExpiry(event.target.value)
        const get_strike = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/get_option_strike', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event.target.value)
        })
        const opt_strike = await get_strike.json()
        if (opt_strike) {
            setOptionStrikeData(opt_strike)
        }
    }

    async function handleOption(event) {
        const data = {
            'symbol': index,
            'expiry': expiry,
            'segment': segment,
            'strike': event.target.value,
            'type': optionType
        }
        setOptionStrike(event.target.value)
        const get_entry_price = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/get_option_entry_price', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const option_entry_price = await get_entry_price.json()
        if (option_entry_price) {
            setEntryValue(option_entry_price)
        }
    }


    async function handleSubmit() {
        const data = {
            'index': index,
            'segment': segment,
            'expiry': expiry,
            'strike': optionStrike,
            'option_type': optionType,
            'action': radioValue,
            'qty': count,
            'entry_price': entryValue
        }
        setInputData([...inputData, data])
        setTableData([data])
        // console.log(data)
        // const data2 = { 'data': [data] }

        // const res2 = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/expiry-spot', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data2)
        // })

        // const api_result_new = await res2.json()
        // if (api_result_new) {
        //     setDataSet(api_result_new['dataset'])
        // }

    }

    useEffect(() => {
        console.log('==========', inputData)
        if (inputData.length > 0) {
            call_api(inputData)
        }
        console.log('++++++++++', tableData)
        console.log('++++++++++len', tableData.length)
        if (tableData.length > 0) {
            position_table_api(tableData)
        }
    }, [inputData, tableData])

    async function position_table_api(data) {
        // const data_to_pass = { 'data': data }
        const api_response = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/position', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        

        const table_api_result = await api_response.json()
        console.log(']]]]]]',table_api_result)
        if (table_api_result === 'success') {
            const get_table_data = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/position')

            const table_data = await get_table_data.json()
            console.log(table_data)
            if (table_data) {
                setTableProps(table_data)
            }
        }
    }

    async function call_api(data) {
        const data_to_pass = { 'data': data }
        const res2 = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/expiry-spot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_to_pass)
        })

        const api_result_new = await res2.json()
        if (api_result_new) {
            setDataSet(api_result_new['dataset'])
        }
    }

    const spot_price = 'Spot Price:' + 50
    const futures_price = 'Futures Price:' + 50
    const lot_size = 'Lot Size:' + 50
    const iv = 'IV:' + 50
    const iv_percentile = 'IV Percentile:' + 50
    const iv_chart = 'NIFTY IV Chart'
    const dte = 'DTE:' + 50

    const lineData =
    {
        labels: [],
        datasets: dataset
    }

    return (
        <div>
            <Container maxWidth="xl">
                <h2> Strategy Builder</h2>
                <div className='row'>
                    <div className='col-md-6'>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 600 }}>
                            <Select
                                id="index-select"
                                value={index}
                                onChange={(e) => setIndex(e.target.value)}
                            >
                                <MenuItem value="nifty">NIFTY</MenuItem>
                            </Select>
                            <FormHelperText>Select Index/Stock</FormHelperText>
                        </FormControl>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-1'><Chip sx={{ borderRadius: 0 }} label={spot_price} color="primary" /></div>
                    <div className='col-md-1'><Chip sx={{ borderRadius: 0 }} label={futures_price} color="primary" /></div>
                    <div className='col-md-1'><Chip sx={{ borderRadius: 0 }} label={lot_size} color="primary" /></div>
                    <div className='col-md-1'><Chip sx={{ borderRadius: 0 }} label={iv} color="primary" /></div>
                    <div className='col-md-1'><Chip sx={{ borderRadius: 0 }} label={iv_percentile} color="primary" /></div>
                    <div className='col-md-1'><Chip sx={{ borderRadius: 0 }} label={iv_chart} color="primary" /></div>
                    <div className='col-md-1'><Chip sx={{ borderRadius: 0 }} label={dte} color="primary" /></div>
                    <div className='col-md-1'></div>
                    <div className='col-md-4 text-end'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Date"
                                value={dateValue}
                                onChange={(newValue) => setDateValue(newValue)}
                                format="DD-MM-YYYY"
                            />
                        </LocalizationProvider>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-3'>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 350 }}>
                            <Select
                                id="segment-select"
                                value={segment}
                                onChange={(e) => setSegment(e.target.value)}
                            >
                                <MenuItem value="futures">Futures</MenuItem>
                                <MenuItem value="options">Options</MenuItem>
                            </Select>
                            <FormHelperText>Select Segment</FormHelperText>
                        </FormControl>
                    </div>

                    <div className='col-md-3'>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 350 }}>
                            <Select
                                id="expiry-select"
                                value={expiry}
                                // onChange={(e) => setExpiry(e.target.value)}
                                onChange={handleExpiry}
                            >
                                {expiryDateData.map((data) => (
                                    <MenuItem key={data.id} value={data.exp}>{data.exp}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>Select Expiry</FormHelperText>
                        </FormControl>
                    </div>

                    {segment === 'options' ?
                        <div className='col-md-3'>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 350 }}>
                                <Select
                                    id="option-strike-select"
                                    value={optionStrike}
                                    defaultValue=""
                                    // onChange={(e) => setOptionStrike(e.target.value)}
                                    onChange={handleOption}
                                >
                                    {optionStrikeData.map((data) => (
                                        <MenuItem key={data.id} value={data.strike}>{data.strike}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>Select Option Strike</FormHelperText>
                            </FormControl>
                        </div> : ''}

                    {segment === 'options' ?
                        <div className='col-md-3'>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 350 }}>
                                <Select
                                    id="option-type-select"
                                    value={optionType}
                                    onChange={(e) => setOptionType(e.target.value)}
                                >
                                    <MenuItem value='CE'>CE</MenuItem>
                                    <MenuItem value='PE'>PE</MenuItem>
                                </Select>
                                <FormHelperText>Select Option Type</FormHelperText>
                            </FormControl>
                        </div> : ''}
                </div>

                <div className='row mt-3'>
                    <div className='col-md-2 mx-2'>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-form-control-label-placement"
                                name="position"
                                defaultValue="BUY"
                                onChange={(e) => setRadioValue(e.target.value)}
                            >
                                <FormControlLabel value="BUY" control={<Radio />} label="Buy" />
                                <FormControlLabel value="SELL" control={<Radio />} label="Sell" />
                            </RadioGroup>
                        </FormControl>
                    </div>

                    <div className='col-md-3'>
                        <StrategyCounter handleCallback={getcount} />
                    </div>

                    <div className='col-md-3'>
                        <TextField value={entryValue} onChange={(e) => setEntryValue(e.target.value)} id="outlined-basic" label="Entry Price" size='small' variant="outlined" />
                    </div>

                    <div className='col-md-3'>
                        <Button variant="contained" onClick={handleSubmit}>Add Position</Button>
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col-md-4'>
                        <Table position={tableProps}/>
                    </div>
                    <div className='col-md-8'>
                        <Line options={line_options} data={lineData} />
                    </div>
                </div>

            </Container>

        </div>
    );
}
