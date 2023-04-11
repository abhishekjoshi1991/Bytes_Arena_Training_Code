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
import Table2 from './Table2';
import SideTable from './SideTable';

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


export default function Strategy2() {
    const [expiryDateData, setExpiryDateData] = useState([])
    const [index, setIndex] = useState('NIFTY');
    const [segment, setSegment] = useState('options');
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
    const [lotSize, setLotSize] = useState(0)
    const [futurePrice, setFuturePrice] = useState(0)
    const [maxProfitLoss, setMaxProfitLoss] = useState([])

    async function api_call() {
        const req_expiry = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/strategy_planner')

        const res_expiry = await req_expiry.json()
        if (res_expiry) {
            setExpiryDateData(res_expiry)
        }

        const req_lot = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/get_lot')
        const res_lot = await req_lot.json()
        if (res_lot) {
            setLotSize(res_lot)
        }

        const req_fut_price = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/get_future_price')
        const res_fut_price = await req_fut_price.json()
        if (res_fut_price) {
            setFuturePrice(res_fut_price)
        }

        const req_table_display = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/position')
        const res_table_display = await req_table_display.json()
        if (res_table_display) {
            setTableProps(res_table_display)

            const prepared_data = { 'data': res_table_display }
            const req_graph = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/expiry-spot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(prepared_data)
            })

            const res_graph = await req_graph.json()
            if (res_graph) {
                setDataSet(res_graph['dataset'])
            }
        }
    }

    const getcount = (qty) => {
        setCount(qty)
    }

    async function getUpdatedTableData(data) {
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^', data)
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^', data.length)
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^', tableProps)
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^', tableProps)

        setTableProps(data)
        if (data.length > 0) {
            const prepared_data = { 'data': data }
            const req_graph = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/expiry-spot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(prepared_data)
            })

            const res_graph = await req_graph.json()
            if (res_graph) {
                setDataSet(res_graph['dataset'])
            }
        }
        else {
            setDataSet([])
        }
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
            'quantity': count,
            'entry_price': entryValue
        }
        // setInputData([...inputData, data])
        setTableData([data])
    }

    useEffect(() => {
        api_call()
        call_api()
        if (tableData.length > 0) {
            position_table_api(tableData)
        }
    }, [tableData])

    async function position_table_api(data) {
        const api_response = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/position', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const table_api_result = await api_response.json()
        if (table_api_result === 'success') {
            const get_table_data = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/position')

            const table_data = await get_table_data.json()
            if (table_data) {
                setTableProps(table_data)
                setTableData([])
            }
        }
    }

    async function call_api() {
        const get_table_data_for_graph = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/position')
        const table_data_for_graph = await get_table_data_for_graph.json()

        const data_to_pass = { 'data': table_data_for_graph }
        const res2 = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/expiry-spot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_to_pass)
        })

        const api_result_new = await res2.json()
        console.log('abhishek', api_result_new)
        if (api_result_new !== 'No Data') {
            console.log('======================++++++++++++++',api_result_new.length)
            setDataSet(api_result_new['dataset'])
            setMaxProfitLoss(api_result_new['max_p_l'])
        }
    }

    const spot_price = 'Spot Price:' + 50
    const futures_price = 'Futures Price:' + futurePrice
    const lot_size = 'Lot Size:' + lotSize
    const iv = 'IV:' + 50
    const iv_percentile = 'IV Percentile:' + 50
    const iv_chart = 'NIFTY IV Chart'
    const dte = 'DTE:' + 50

    console.log('======================.>',maxProfitLoss)
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
                                <MenuItem value="NIFTY">NIFTY</MenuItem>
                            </Select>
                            <FormHelperText>Select Index/Stock</FormHelperText>
                        </FormControl>
                    </div>
                    <div className='col-md-6 text-end'>
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
                    <div className='col-md-1'><Chip sx={{ borderRadius: 0 }} label={spot_price} color="primary" /></div>
                    <div className='col-md-2'><Chip sx={{ borderRadius: 0 }} label={futures_price} color="primary" /></div>
                    <div className='col-md-1'><Chip sx={{ borderRadius: 0 }} label={lot_size} color="primary" /></div>
                    <div className='col-md-1'><Chip sx={{ borderRadius: 0 }} label={iv} color="primary" /></div>
                    <div className='col-md-1'><Chip sx={{ borderRadius: 0 }} label={iv_percentile} color="primary" /></div>
                    <div className='col-md-1'><Chip sx={{ borderRadius: 0 }} label={iv_chart} color="primary" /></div>
                    <div className='col-md-1'><Chip sx={{ borderRadius: 0 }} label={dte} color="primary" /></div>

                </div>

                <div className='row mt-2'>
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
                    <Table2 position={tableProps} handleTableCallback={getUpdatedTableData} />
                </div>
                <div className='row mt-5'>
                    <div className='col-md-4'>
                        {maxProfitLoss.length > 0 ? <SideTable profitlossdata={maxProfitLoss} /> : ''}
                        {/* <SideTable profitlossdata={maxProfitLoss} /> */}
                    </div>
                    <div className='col-md-8'>
                        <Line options={line_options} data={lineData} />
                    </div>
                </div>
            </Container>
        </div>
    );
}
