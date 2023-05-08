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
import customParseFormat from 'dayjs/plugin/customParseFormat';
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
import PositionSlider from './PositionSlider';

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
    elements: {
        point: {
            radius: 0
        }
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
    const [segment, setSegment] = useState('futures');
    const [expiry, setExpiry] = useState("");
    const [optionStrike, setOptionStrike] = useState([]);
    const [optionStrikeData, setOptionStrikeData] = useState([]);
    const [optionType, setOptionType] = useState('CE');
    const [radioValue, setRadioValue] = useState('BUY');
    const [count, setCount] = useState(0);
    const [dateValue, setDateValue] = useState(dayjs());
    const [dataset, setDataSet] = useState([]);
    // const [inputData, setInputData] = useState([])
    const [entryValue, setEntryValue] = useState(0)
    const [tableData, setTableData] = useState([])
    const [tableProps, setTableProps] = useState([])
    const [lotSize, setLotSize] = useState(0)
    const [futurePrice, setFuturePrice] = useState(0)
    const [maxProfitLoss, setMaxProfitLoss] = useState([])
    const [sliderDaysCount, setSliderDaysCount] = useState(0)

    async function api_call() {
        const req_expiry = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/strategy_planner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'segment':segment})
        })

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
            if (segment === 'futures') {
                setEntryValue(res_fut_price)
            }
        }

        const req_table_display = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/position')
        const res_table_display = await req_table_display.json()
        if (res_table_display) {
            const dates_array = res_table_display.map((d) => d.expiry)
            if (dates_array.length > 0) {
                const minDate = new Date(Math.min(...dates_array.map(dateString => new Date(dateString))));

                const day = minDate.getDate().toString().padStart(2, '0');
                const month = (minDate.getMonth() + 1).toString().padStart(2, '0');
                const year = minDate.getFullYear();
                const formattedDate = `${day}-${month}-${year}`;
                dayjs.extend(customParseFormat);
                setDateValue(dayjs(formattedDate, 'DD-MM-YYYY'))

                const current_date = new Date()
                const timeDiff = minDate.getTime() - current_date.getTime();
                const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                setSliderDaysCount(daysDiff)
            }
            else {
                setDateValue(dayjs())
            }

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
                setMaxProfitLoss(res_graph['max_p_l'])
            }
        }
        else {
            setDataSet([])
            setMaxProfitLoss([])
        }
    }

    async function getSliderValues(data) {
        if (data['positionsliderchange'] === true) {
            const req_position_data = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/position')
            const res_position_data = await req_position_data.json()
            let updatedArray = res_position_data.map(obj => Object.assign(obj, data))
            if (updatedArray.length > 0) {
                const prepared_data = { 'data': updatedArray }
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
                    setMaxProfitLoss(res_graph['max_p_l'])
                }
            }
            else {
                setDataSet([])
                setMaxProfitLoss([])
            }
        }
    }

    async function handleSegment(event) {
        setSegment(event.target.value)
        const req_expiry = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/strategy_planner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'segment':event.target.value})
        })

        const res_expiry = await req_expiry.json()
        if (res_expiry) {
            setExpiryDateData(res_expiry)
        }
        if (event.target.value === 'futures') {
            setEntryValue(futurePrice)
        }
        else {
            const data = {
                'symbol': index,
                'expiry': expiry,
                'segment': event.target.value,
                'strike': optionStrike,
                'type': optionType
            }
            const get_entry_price_for_seg_change = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/get_option_entry_price', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const ent_price = await get_entry_price_for_seg_change.json()
            setEntryValue(ent_price)
        }
    }

    async function handleExpiry(event) {
        const data = {
            'symbol': index,
            'expiry': event.target.value,
            'segment': segment,
            'strike': optionStrike,
            'type': optionType
        }
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

        const get_entry_price_based_expiry = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/get_option_entry_price', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const option_entry_price_based_exp = await get_entry_price_based_expiry.json()
        if (option_entry_price_based_exp) {
            setEntryValue(option_entry_price_based_exp)
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

    async function handleOptionType(event) {
        const data = {
            'symbol': index,
            'expiry': expiry,
            'segment': segment,
            'strike': optionStrike,
            'type': event.target.value
        }
        setOptionType(event.target.value)
        const get_entry_price_based_type = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/get_option_entry_price', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const option_entry_price_based_type = await get_entry_price_based_type.json()
        if (option_entry_price_based_type) {
            setEntryValue(option_entry_price_based_type)
        }
    }

    async function resetSubmit() {
        const req_position_reset = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/position', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(0)
        })

        const res_position_reset = await req_position_reset.json()
        if (res_position_reset === 'success') {
            setDataSet([])
            setMaxProfitLoss([])
            setTableData([])
        }
    }

    async function handleSubmit() {
        const data = (segment === 'options') ?
            {
                'index': index,
                'segment': segment,
                'expiry': expiry,
                'strike': optionStrike,
                'option_type': optionType,
                'action': radioValue,
                'quantity': count,
                'entry_price': entryValue
            }
            :
            {
                'index': index,
                'segment': segment,
                'expiry': expiry,
                'action': radioValue,
                'quantity': count,
                'entry_price': entryValue

            }
        // setInputData([...inputData, data])
        setTableData([data])
    }

    useEffect(() => {
        api_call()
        if (tableData.length > 0) {
            position_table_api(tableData)
        }
        call_api()
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
        if (api_result_new !== 'No Data') {
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
                                label="Payoff Date"
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
                                onChange={handleSegment}
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
                                    onChange={handleOptionType}
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
                <div className='row text-end mt-2'>
                    <div className='col-md-11'></div>
                    <div className='coll-md-1'>
                        <Button variant="outlined" onClick={resetSubmit}>Reset</Button>
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col-md-4'>
                        {maxProfitLoss.length > 0 ? <SideTable profitlossdata={maxProfitLoss} /> : ''}
                        {/* <SideTable profitlossdata={maxProfitLoss} /> */}
                    </div>
                    <div className='col-md-8'>
                        {maxProfitLoss.length > 0 ? <Line options={line_options} data={lineData} /> : ''}
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col-md-4'>
                    </div>
                    <div className='col-md-8'>
                        {maxProfitLoss.length > 0 ? <PositionSlider dateProps={sliderDaysCount} handleSliderCallback={getSliderValues} /> : ''}
                    </div>
                </div>
            </Container>
        </div>
    );
}
