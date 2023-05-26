
import React, { useEffect, useState } from 'react'
import OptionChainTableLayout from './OptionChainTableLayout'
import TextField from '@mui/material/TextField';
import OptionIntradayTableStrikeLayout from './OptionIntradayTableStrikeLayout';


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
            setStrikeData(strike_response)
            setCEStrike(strike_response[0])
            setPEStrike(strike_response[0])
            get_table_data(expiry, strike_response[0], strike_response[0], timeInterval)
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

    useEffect(() => {
        api_call();
    }, [])

    const time_interval = ['3min', '6min', '9min', '15min', '30min', '60min', '75min']
    return (
        <div className='mt-3'>
                <div className="row">
                    <div style={{ width: '5rem' }} className="col-md-1 mt-1"> <strong>Symbol</strong> </div>
                    <div className="col-md-2">
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

                    <div style={{ width: '6rem' }} className="col-md-1 mt-1"> <strong>CE Strike</strong> </div>
                    <div className="col-md-2">
                        <select
                            className="form-control"
                            name="expiry"
                            onChange={ceStrikeHandle}

                        >
                            {strikeData.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-1 mt-1 text-end"> <strong>Time Interval</strong> </div>
                    <div className="col-md-2">
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
                    <div className="col-md-1 mt-1 text-end"> <strong>Time</strong> </div>
                    <div className='col-md-2'>
                        <TextField
                            id="standard-read-only-input"
                            value={time}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="standard"
                        />
                    </div>

                </div>
                <div className='row'>
                    <div style={{ width: '5rem' }} className="col-md-1 mt-2"> <strong>Expiry</strong> </div>
                    <div className="col-md-2 mt-2">
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
                    <div style={{ width: '6rem' }} className="col-md-1 mt-2"> <strong>PE Strike</strong> </div>
                    <div className="col-md-2 mt-2">
                        <select
                            className="form-control"
                            name="expiry"
                            onChange={peStrikeHandle}

                        >
                            {strikeData.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            <OptionIntradayTableStrikeLayout tableData={tableData} cestrike={ceStrike} pestrike={peStrike}/>

        </div>
    )
}
