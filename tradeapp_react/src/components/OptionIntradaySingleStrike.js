
import React, { useEffect, useState } from 'react'
import OptionChainTableLayout from './OptionChainTableLayout'
import TextField from '@mui/material/TextField';
import OptionIntradayTableStrikeLayout from './OptionIntradayTableStrikeLayout';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


export default function OptionIntradaySingleStrike() {
    const [expiryDateData, setExpiryDateData] = useState([])
    const [expiry, setExpiry] = useState('')
    const [ceStrike, setCEStrike] = useState('')
    const [peStrike, setPEStrike] = useState('')
    const [strikeData, setStrikeData] = useState([])
    const [symbolData, setSymbolData] = useState(['NIFTY'])
    const [tableData, setTableData] = useState([])
    const [time, setTime] = useState('')
    const [timeInterval, setTimeInterval] = useState('3min')
    const [strikeLabel, setStrikeLabel] = useState('Strike')
    const [strikeBoolean, setStrikeBoolean] = useState('same');


    const sdata = [{ 'id': 15000, 'exp': 15000 }, { 'id': 16000, 'exp': 16000 }]

    async function api_call() {
        const res = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/intraday_table_single_strike_options')

        const result = await res.json()
        if (result) {
            setExpiryDateData(result)
            get_strike_data(result[0])
            setExpiry(result[0])
        }
    }

    async function get_strike_data(expiry) {
        const data_to_pass = { 'expiry': expiry, 'table': true }
        const request_strike = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/get_strike_price', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_to_pass)
        })
        const strike_response = await request_strike.json()
        if (strike_response) {
            setStrikeData(strike_response['strike_prices'])
            setCEStrike(strike_response['atm_strike'])
            setPEStrike(strike_response['atm_strike'])
            get_table_data(expiry, strike_response['atm_strike'], strike_response['atm_strike'], timeInterval)
        }
    }

    async function get_table_data(expiry, ce_strike, pe_strike, interval) {
        const data_for_post_api = {
            'expiry': expiry,
            'ce_strike': ce_strike,
            'pe_strike': pe_strike,
            'symbol': 'NIFTY',
            'interval': interval
        }
        console.log(data_for_post_api)
        const request_table = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/intraday_table_single_strike_options', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_for_post_api)
        })
        const table_response = await request_table.json()
        if (table_response) {
            setTableData(table_response['data'])
            setTime(table_response['time'])
        }
    }

    async function expiryHandle(e) {
        setExpiry(e.target.value)
        setStrikeData([])
        get_strike_data(e.target.value)
    }

    async function ceStrikeHandle(e) {
        setCEStrike(e.target.value)
        get_table_data(expiry, e.target.value, peStrike, timeInterval)
    }

    async function peStrikeHandle(e) {
        setPEStrike(e.target.value)
        get_table_data(expiry, ceStrike, e.target.value, timeInterval)
    }

    async function intervalHandle(e) {
        setTimeInterval(e.target.value)
        get_table_data(expiry, ceStrike, peStrike, e.target.value)
    }

    async function handleSameDiffStrike(e) {
        console.log('============',e.target.value)
        setStrikeBoolean(e.target.value)
        if (e.target.value === 'same') {
            setStrikeLabel('Strike')
            get_table_data(expiry, ceStrike, ceStrike, timeInterval)
        }
        else {
            setStrikeLabel('CE Strike')
            get_table_data(expiry, ceStrike, peStrike, timeInterval)
        }
    }

    useEffect(() => {
        api_call();
    }, [])

    const time_interval = ['3min', '6min', '9min', '15min', '30min', '60min', '75min']
    return (
        <div className='mt-3' style={{ fontSize: 14 }}>
            <div className="row">
                {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 350 }}>
                    <Select
                        id="expiry-select"
                        value={ceStrike}
                    // onChange={(e) => setExpiry(e.target.value)}
                    // onChange={handleExpiry}
                    >
                        {strikeData.map((data) => (
                            <MenuItem key={data.id} value={data.exp}>{data.exp}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Select Strike</FormHelperText>
                </FormControl> */}
                <div style={{ width: '5rem' }} className="col-md-1 mt-1"> <strong>Symbol</strong> </div>
                <div className="col-md-1">
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
                {/* <div style={{ width: '5rem', margin: 0 }} className="col-md-1 mt-1"> <strong>CE ets</strong> </div>
                <div className="col-md-1">
                    <FormControl variant="standard" sx={{ minWidth: 80 }}>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={10}
                        // onChange={handleChange}
                        // label="Age"
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </div> */}

                <div style={{ width: '6rem' }} className="col-md-1 mt-1"> <strong>{strikeLabel}</strong> </div>
                <div className="col-md-1">

                    <select
                        className="form-control"
                        name="expiry"
                        onChange={ceStrikeHandle}
                        value={ceStrike}

                    >
                        {strikeData.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ width: '8rem' }} className="col-md-1 mt-1 text-end"> <strong>Time Interval</strong> </div>
                <div className="col-md-1">
                    <select
                        className="form-control"
                        name="expiry"
                        onChange={intervalHandle}
                                    
                    >
                        {time_interval.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-1"></div>
                <div className="col-md-1"></div>
                <div className="col-md-1"></div>
                <div className="col-md-1 mt-1 text-end"> <strong>Time</strong> </div>
                <div className='col-md-1'>
                    <TextField
                        id="standard-read-only-input"
                        value={time}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                        size='small'
                        sx={{
                            backgroundColor: '#e1e8f2',
                            fontSize: '8'
                        }}
                    />
                </div>
            </div>
            <div className='row'>
                <div style={{ width: '5rem' }} className="col-md-1 mt-2"> <strong>Expiry</strong> </div>
                <div className="col-md-1 mt-2">
                    <select
                        className="form-control"
                        name="expiry"
                        onChange={expiryHandle}

                    >
                        {expiryDateData.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                
                {strikeBoolean === 'different' ? 
                <div style={{ width: '6rem' }} className="col-md-1 mt-2"> <strong>PE Strike</strong> </div> : <div style={{ width: "6rem" }} className="col-md-1 mt-2"></div>}
                
                {strikeBoolean === 'different' ? 
                <div className="col-md-1 mt-2">
                    <select
                        className="form-control"
                        name="expiry"
                        onChange={peStrikeHandle}
                        value={peStrike}
                    >
                        {strikeData.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div> : <div className="col-md-1 mt-2"></div>}
                {/* <div style={{ width: '6rem' }} className="col-md-1 mt-2 text-end"> <strong>Strike1</strong> </div> */}
                <div style={{ width: '11rem' }} className="col-md-1 mt-2 mx-3">
                    <FormControl>
                        <RadioGroup
                            // row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        value={strikeBoolean}
                        onChange={handleSameDiffStrike}
                        >
                            <FormControlLabel value="same" control={<Radio sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 16,
                                },
                            }} />} label="Same Strike" />
                            <FormControlLabel value="different" control={<Radio sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 16,
                                },
                            }} />} label="Different Strike" />

                        </RadioGroup>
                    </FormControl>
                </div>
                {/* <div className="col-md-1 mt-2">
                    <FormControl>
                        <RadioGroup
                            // row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"

                        // value={value}
                        // onChange={handleChange}
                        >
                            <FormControlLabel value="female" control={<Radio sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 16,
                                },
                            }} />} label="Same Strike" />
                            <FormControlLabel value="male" control={<Radio sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 16,
                                },
                            }} />} label="Different Strike" />

                        </RadioGroup>
                    </FormControl>
                </div> */}
            </div>
            <OptionIntradayTableStrikeLayout tableData={tableData} cestrike={ceStrike} pestrike={strikeBoolean === 'same' ? ceStrike : peStrike} />

        </div>
    )
}
