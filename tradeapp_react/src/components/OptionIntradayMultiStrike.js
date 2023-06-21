import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import OptionIntradayMultiStrikeLayout from './OptionIntradayMultiStrikeLayout';
import { MultiSelect } from "react-multi-select-component";
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function OptionIntradayMultiStrike() {
    const [expiryDateData, setExpiryDateData] = useState([])
    const [expiry, setExpiry] = useState('')
    const [strikeData, setStrikeData] = useState([])
    const [symbolData, setSymbolData] = useState(['NIFTY'])
    const [tableData, setTableData] = useState([])
    const [time, setTime] = useState('')
    const [timeInterval, setTimeInterval] = useState('3min')
    const [selectedCEStrike, setSelectedCEStrike] = useState([])
    const [selectedPEStrike, setSelectedPEStrike] = useState([])
    const [allSelected, setAllSelected] = useState('all')
    const [sameDifferentStrike, setSameDifferentStrike] = useState('')
    const [strikeLabel, setStrikeLabel] = useState('Strike')

    async function api_call() {
        const res = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/intraday_table_multi_strike_options')

        const result = await res.json()
        if (result) {
            setExpiryDateData(result)
            get_strike_data(result[0])
            setExpiry(result[0])
        }
    }

    async function get_strike_data(expiry) {
        const data_to_pass = { 'expiry': expiry, 'multistriketable': true }
        const request_strike = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/get_strike_price', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_to_pass)
        })
        const strike_response = await request_strike.json()
        if (strike_response) {
            setStrikeData(strike_response['strike_price_list'])
            setSelectedCEStrike([{ 'label': String(strike_response['atm_strike']), 'value': String(strike_response['atm_strike']) }])
            setSelectedPEStrike([{ 'label': String(strike_response['atm_strike']), 'value': String(strike_response['atm_strike']) }])

            // call api by passing all ce and pe strikes 
            get_table_data(expiry, strike_response['strike_price_list'], strike_response['strike_price_list'], timeInterval)
        }
    }

    async function get_table_data(expiry, ce_strike, pe_strike, interval) {
        const data_for_post_api = {
            'expiry': expiry,
            'ce_strike': ce_strike.map(obj => obj['value']),
            'pe_strike': pe_strike.map(each => each['value']),
            'symbol': 'NIFTY',
            'interval': interval
        }
        console.log('data_for_post_api', data_for_post_api)
        const request_table = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/intraday_table_multi_strike_options', {
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
        setSelectedCEStrike([])
        setSelectedPEStrike([])
        get_strike_data(e.target.value)
    }

    async function intervalHandle(e) {
        setTimeInterval(e.target.value)
        get_table_data(expiry, selectedCEStrike, selectedPEStrike, e.target.value)
    }

    async function ceStrikeHandle(e) {
        if (e.length === 0) {
            alert('There must be at least one value for CE strike')
        }
        else {
            if (e.length > 10) {
                alert('Please select only upto 10 strikes')
            }
            else {
                setSelectedCEStrike(e)
                if (sameDifferentStrike === 'same') {
                    get_table_data(expiry, e, e, timeInterval)
                }
                else {
                    get_table_data(expiry, e, selectedPEStrike, timeInterval)
                }
            }
        }
    }

    async function peStrikeHandle(e) {
        if (e.length === 0) {
            alert('There must be at least one value for PE strike')
        }
        else {
            if (e.length > 10) {
                alert('Please select only upto 10 strikes')
            }
            else {
                setSelectedPEStrike(e)
                get_table_data(expiry, selectedCEStrike, e, timeInterval)
            }
        }
    }

    async function handleAllSelectedStrike(e) {
        setAllSelected(e.target.value)
        if (e.target.value === 'selected') {
            setSameDifferentStrike('same')
            setStrikeLabel('Strike')
            get_table_data(expiry, selectedCEStrike, selectedCEStrike, timeInterval)
        }
        else {
            setSameDifferentStrike('')
            get_table_data(expiry, strikeData, strikeData, timeInterval)
        }
    }

    async function handleSameDiffStrike(e) {
        setSameDifferentStrike(e.target.value)
        if (e.target.value === 'different') {
            setStrikeLabel('CE Strike')
            get_table_data(expiry, selectedCEStrike, selectedPEStrike, timeInterval)
        }
        else {
            setStrikeLabel('Strike')
            get_table_data(expiry, selectedCEStrike, selectedCEStrike, timeInterval)
        }
    }

    useEffect(() => {
        api_call();
    }, [])

    const time_interval = ['3min', '6min', '9min', '15min', '30min', '60min', '75min']
    return (
        <div className='mt-3' style={{ fontSize: 14 }}>
            <div className="row">
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

                {allSelected === 'selected' ?
                    <div style={{ width: '6rem' }} className="col-md-1 mt-1"> <strong>{strikeLabel}</strong> </div>
                    : ''}
                {allSelected === 'selected' ?
                    <div className="col-md-1">
                        <MultiSelect
                            options={strikeData}
                            value={selectedCEStrike}
                            onChange={ceStrikeHandle}
                            labelledBy={"Select"}
                            hasSelectAll={false}
                        />
                    </div> : ''}

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
                {allSelected === 'all' ?
                    <div style={{ width: '6rem' }} className="col-md-1 mt-1"></div> : ''}
                {allSelected === 'all' ?
                    <div className="col-md-1"></div> : ''}
                <div className="col-md-1 mt-1 text-end"> <strong>Time</strong> </div>
                <div className='col-md-1'>
                    <TextField
                        id="standard-read-only-input"
                        value={time}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{
                            backgroundColor: '#e1e8f2',
                            fontSize: '8'
                        }}
                        variant="standard"
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

                {allSelected === 'selected' && sameDifferentStrike === 'different' ?
                    <div style={{ width: '6rem' }} className="col-md-1 mt-2"> <strong>PE Strike</strong> </div>
                    : sameDifferentStrike === 'same' ? <div style={{ width: '6rem' }} className="col-md-1 mt-2"> </div> : ''}
                {allSelected === 'selected' && sameDifferentStrike === 'different' ?
                    <div className="col-md-1 mt-2">
                        <MultiSelect
                            options={strikeData}
                            value={selectedPEStrike}
                            onChange={peStrikeHandle}
                            labelledBy={"Select"}
                            hasSelectAll={false}
                        />
                    </div> : sameDifferentStrike === 'same' ? <div className="col-md-1 mt-2"></div> : ''}

                <div style={{ width: '12rem' }} className="col-md-1 mt-2 mx-3">
                    <FormControl>
                        <RadioGroup
                            // row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={allSelected}
                            onChange={handleAllSelectedStrike}
                        >
                            <FormControlLabel value="all" control={<Radio sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 16,
                                },
                            }} />} label="All Strikes" />
                            <FormControlLabel value="selected" control={<Radio sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 16,
                                },
                            }} />} label="Selected Strikes" />

                        </RadioGroup>
                    </FormControl>
                </div>
                {allSelected === 'selected' ?
                    <div style={{ width: '12rem' }} className="col-md-1 mt-2">
                        <FormControl>
                            <RadioGroup
                                // row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={sameDifferentStrike}
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
                    </div> : ''}
            </div>
            {allSelected === 'selected' && sameDifferentStrike === 'different' ?
                <h6 style={{ fontSize: 14, fontStyle: 'italic' }}>Selected CE Strikes: {selectedCEStrike.map(obj => obj['value']).join(',')}</h6> : ''}
            {allSelected === 'selected' && sameDifferentStrike === 'different' ?
                <h6 style={{ fontSize: 14, fontStyle: 'italic' }}>Selected PE Strikes: {selectedPEStrike.map(obj => obj['value']).join(',')}</h6> : ''}
            {allSelected === 'selected' && sameDifferentStrike === 'same' ?
                <h6 style={{ fontSize: 14, fontStyle: 'italic' }}>Selected Strikes: {selectedCEStrike.map(obj => obj['value']).join(',')}</h6> : ''}
            <OptionIntradayMultiStrikeLayout tableData={tableData} sameDiffStrike= {sameDifferentStrike} isAll={allSelected}/>
            {/* <OptionIntradayMultiStrikeLayout tableData={tableData} cestrike={selectedCEStrike} pestrike={selectedPEStrike} /> */}


        </div>
    )
}

