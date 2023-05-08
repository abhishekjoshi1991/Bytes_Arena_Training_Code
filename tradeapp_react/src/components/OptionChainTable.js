import React, { useEffect, useState } from 'react'
import OptionChainTableLayoutRsuite from './OptionChainTableLayoutRsuite';
import OptionChainTableLayout from './OptionChainTableLayout'

export default function OptionChainTable() {
    const [expiryDateData, setExpiryDateData] = useState([])
    const [symbolData, setSymbolData] = useState([])
    const [expiry, setExpiry] = useState('')
    const [optionTableData, setOptionTableData] = useState([])

    async function api_call() {
        const res = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/option_chain_table')

        const result = await res.json()
        if (result) {
            setExpiryDateData(result)
        }
        get_table_data(result[0])
        const symbol = ["NIFTY"]
        setSymbolData(symbol)
    }

    async function get_table_data(data) {
        const request_table = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/option_chain_table', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const option_table_response = await request_table.json()
        if (option_table_response) {
            setOptionTableData(option_table_response)
        }
    }

    async function selectHandler(e) {
        console.log(e)
    }

    async function expiryHandle(e) {
        // setExpiry(e.target.value)
        get_table_data(e.target.value)
    }

    useEffect(() => {
        api_call();
    }, [])

    return (
        <div>
            <form method="post" onSubmit={selectHandler}>
                <div className="row mb-5">
                    <div className="col-md-1"> <strong>Symbol</strong> </div>
                    <div className="col-md-1"  style={{ marginLeft: '35px' }}>
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
                    <div className="col-md-1"> <strong>Expiry</strong> </div>
                    <div className="col-md-1">
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

                    <div className="col-md-2"><button className="btn btn-info" type="submit">Submit</button></div>
                </div>


            </form>
            {/* <OptionChainTableLayoutRsuite/> */}
            <OptionChainTableLayout tableData={optionTableData} />

        </div>
    )
}
