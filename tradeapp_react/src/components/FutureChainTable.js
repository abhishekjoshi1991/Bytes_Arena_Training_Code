import React, { useEffect, useState } from 'react'
import FutureChainTableLayout from './FutureChainTableLayout'
import TextField from '@mui/material/TextField';

export default function FutureChainTable() {
    const [symbolData, setSymbolData] = useState([])
    const [futureTableData, setFutureTableData] = useState([])
    const [time, setTime] = useState('')

    async function api_call() {
        const symbol = ["NIFTY"]
        setSymbolData(symbol)

        const res = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/future_chain_table', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(symbol)
        })

        const result = await res.json()
        if (result) {
            setFutureTableData(result['data'])
            setTime(result['time'])
        }

    }

    // async function get_table_data(data) {
    //     const request_table = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/future_chain_table', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     })

    //     const option_table_response = await request_table.json()
    //     if (option_table_response) {
    //         setFutureTableData(option_table_response)
    //     }
    // }

    async function selectHandler(e) {
        console.log(e)
    }

    // async function expiryHandle(e) {
    //     // setExpiry(e.target.value)
    //     get_table_data(e.target.value)
    // }

    useEffect(() => {
        api_call();
    }, [])

    return (
        <div>
            <form method="post" onSubmit={selectHandler}>
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

            </form>
            <FutureChainTableLayout tableData={futureTableData} />
        </div>
    )
}

