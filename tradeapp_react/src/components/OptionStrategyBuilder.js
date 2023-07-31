import React, { useState, useEffect } from 'react'
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OptionStrategyBuilderTableTab from './OptionStrategyBuilderTableTab';
import OptionStrategyBuilderOptionChainModal from './OptionStrategyBuilderOptionChainModal';


export default function OptionStrategyBuilder() {
    const [index, setIndex] = useState('NIFTY');
    const [optionExpiry, setOptionExpiry] = useState('');
    const [optionsExpiryDates, setOptionsExpiryDates] = useState([]);
    const [futureExpiryDates, setFutureExpiryDates] = useState([]);
    const [optionChainTable, setOptionChainTable] = useState([]);
    const [futureChainTable, setFutureChainTable] = useState([]);


    async function api_call() {
        const request_expiry = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/get_option_future_expiry')

        const result_expiry = await request_expiry.json()
        if (result_expiry) {
            console.log(result_expiry)
            setOptionsExpiryDates(result_expiry['options_exp'])
            setFutureExpiryDates(result_expiry['future_exp'])
            setOptionExpiry(result_expiry['options_exp'][0]['exp'])

            const prepared_data = {
                'symbol': index,
                'expiry': result_expiry['options_exp'][0]['exp']
            }

            const request_option_chain_table = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/get_option_chain', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(prepared_data)
            })

            const response_option_chain_table = await request_option_chain_table.json()
            if (response_option_chain_table) {
                console.log(response_option_chain_table)
                setOptionChainTable(response_option_chain_table)
                setFutureChainTable([])
            }
        }
    }

    //     const req_lot = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/get_lot')
    //     const res_lot = await req_lot.json()
    //     if (res_lot) {
    //         setLotSize(res_lot)
    //     }

    //     const req_fut_price = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/get_future_price')
    //     const res_fut_price = await req_fut_price.json()
    //     if (res_fut_price) {
    //         setFuturePrice(res_fut_price)
    //         if (segment === 'futures') {
    //             setEntryValue(res_fut_price)
    //         }
    //     }

    //     const req_table_display = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/position')
    //     const res_table_display = await req_table_display.json()
    //     if (res_table_display) {
    //         const dates_array = res_table_display.map((d) => d.expiry)
    //         if (dates_array.length > 0) {
    //             const minDate = new Date(Math.min(...dates_array.map(dateString => new Date(dateString))));

    //             const day = minDate.getDate().toString().padStart(2, '0');
    //             const month = (minDate.getMonth() + 1).toString().padStart(2, '0');
    //             const year = minDate.getFullYear();
    //             const formattedDate = `${day}-${month}-${year}`;
    //             dayjs.extend(customParseFormat);
    //             setDateValue(dayjs(formattedDate, 'DD-MM-YYYY'))

    //             const current_date = new Date()
    //             const timeDiff = minDate.getTime() - current_date.getTime();
    //             const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    //             setSliderDaysCount(daysDiff)
    //         }
    //         else {
    //             setDateValue(dayjs())
    //         }

    //         setTableProps(res_table_display)

    //         const prepared_data = { 'data': res_table_display }
    //         const req_graph = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/expiry-spot', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(prepared_data)
    //         })

    //         const res_graph = await req_graph.json()
    //         if (res_graph) {
    //             setDataSet(res_graph['dataset'])
    //         }
    //     }
    // }
    const handleExpiry = (e) => {
        console.log(e.target.value)
        setOptionExpiry(e.target.value)
    }

    // useEffect(() => {
    //     api_call()
    // }, [])


    return (
        <div className='container-fluid'>
            <div  className='row'>  {/* borderBottom: '1px solid #d6d6d4'  */}
                <h4>Option Strategy Builder</h4>
                
            </div>

            <div className='row'>
                <div className='col-sm-5'>
                    <div className='row'>
                        <div className='col-sm-10'></div>
                        <div className='col-sm-2'>
                            <OptionStrategyBuilderOptionChainModal optionChain={optionChainTable} futureChain={futureChainTable}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-5' style={{ height: '500px' }}>
                    <OptionStrategyBuilderTableTab />
                </div>
            </div>
        </div>
    );
}

