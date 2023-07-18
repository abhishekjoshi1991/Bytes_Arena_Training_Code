import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import FutureIntradaySingleStrikeLayout from './FutureIntradaySingleStrikeLayout';


export default function FutureIntradaySingleStrike() {
    const [expiryDateData, setExpiryDateData] = useState([])
    const [expiry, setExpiry] = useState('')
    const [symbolData, setSymbolData] = useState(['NIFTY'])
    const [tableData, setTableData] = useState([])
    const [time, setTime] = useState('')
    const [timeInterval, setTimeInterval] = useState('3min')

    async function api_call() {
        const res = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/intraday_future_table')

        const result = await res.json()
        if (result) {
            setExpiryDateData(result)
            setExpiry(result[0])
            get_future_table({ 'expiry': result[0], 'symbol': 'NIFTY', 'interval': timeInterval })
        }
    }

    async function get_future_table(data) {
        const request_table_data = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/intraday_future_table', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const table_response = await request_table_data.json()
        if (table_response) {
            setTableData(table_response['data'])
            setTime(table_response['time'])
        }
    }

    async function expiryHandle(e) {
        setExpiry(e.target.value)
        const data = { 'expiry': e.target.value, 'symbol': 'NIFTY', 'interval': timeInterval }
        get_future_table(data)
    }
    async function intervalHandle(e) {
        setTimeInterval(e.target.value)
        const data = { 'expiry': expiry, 'symbol': 'NIFTY', 'interval': e.target.value }
        get_future_table(data)
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
                <div className='col-md-1'>
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
            </div>
            <FutureIntradaySingleStrikeLayout tableData={tableData} />
        </div>
    )
}

