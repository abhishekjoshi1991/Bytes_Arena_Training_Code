import React, { useEffect, useState } from 'react'
import OptionChainTableLayoutRsuite from './OptionChainTableLayoutRsuite';
import OptionChainTableLayout from './OptionChainTableLayout'
import TextField from '@mui/material/TextField';


export default function OptionChainTable() {
    const [expiryDateData, setExpiryDateData] = useState([])
    const [symbolData, setSymbolData] = useState(['NIFTY'])
    const [expiry, setExpiry] = useState('')
    const [optionTableData, setOptionTableData] = useState([])
    const [futureFairPrice, setFutureFairPrice] = useState('')
    const [lot, setLot] = useState('')
    const [time, setTime] = useState('')
    const [iv, setIV] = useState('')
    const [maxPain, setMaxPain] = useState('')

    async function api_call() {
        const res = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/option_chain_table')

        const result = await res.json()
        if (result) {
            setExpiryDateData(result)
        }
        // const symbol = ["NIFTY"]
        // setSymbolData(symbol)
        get_table_data(result[0], symbolData)

    }

    async function get_table_data(data, symbol) {
        const data_to_pass = { 'expiry': data, 'symbol': symbol }
        const request_table = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/option_chain_table', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_to_pass)
        })

        const option_table_response = await request_table.json()
        if (option_table_response) {
            setOptionTableData(option_table_response['data'])
            setFutureFairPrice(option_table_response['future_price'])
            setLot(option_table_response['lot'])
            setTime(option_table_response['time'])
            setIV(option_table_response['iv'])
            setMaxPain(option_table_response['max_pain'])
        }
    }

    async function selectHandler(e) {
        console.log(e)
    }

    async function expiryHandle(e) {
        // setExpiry(e.target.value)
        get_table_data(e.target.value, symbolData)
    }

    useEffect(() => {
        api_call();
    }, [])

    return (
        <div className='mt-3'>
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
                    <div style={{ width: '5rem' }} className="col-md-1 mt-1"> <strong>Expiry</strong> </div>
                    <div className="col-md-2">
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
                    <div className="col-md-1 mt-1"> <strong>Future Fair Price</strong> </div>
                    <div className='col-md-1'>
                        <TextField
                            id="standard-read-only-input"
                            value={futureFairPrice}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="standard"
                        />
                    </div>
                    <div className="col-md-1 mt-1 text-end"> <strong>IV</strong> </div>
                    <div className='col-md-1'>
                        <TextField
                            id="standard-read-only-input"
                            value={iv}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="standard"
                        />
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
                    <div style={{ width: '5rem' }} className="col-md-1 mt-1"></div>
                    <div className="col-md-2 mt-1"></div>
                    <div style={{ width: '5rem' }} className="col-md-1 mt-1"></div>
                    <div className="col-md-1 mt-1"></div>
                    <div className="col-md-1 mt-1"> <strong>Lot Size</strong> </div>
                    <div className='col-md-1'>
                        <TextField
                            id="standard-read-only-input"
                            value={lot}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="standard"
                        />
                    </div>
                    <div className="col-md-1 mt-1 text-end"> <strong>Max Pain</strong> </div>
                    <div className='col-md-1'>
                        <TextField
                            id="standard-read-only-input"
                            value={maxPain}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="standard"
                        />
                    </div>

                </div>
            </form>
            {/* <OptionChainTableLayoutRsuite/> */}
            <OptionChainTableLayout tableData={optionTableData}/>

        </div>
    )
}
