import React, { useEffect, useState } from 'react'
import OptionChainTableLayoutRsuite from './OptionChainTableLayoutRsuite';
import OptionChainTableLayout from './OptionChainTableLayout'
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import OptionChainTableTimeSlider from './OptionChainTableTimeSlider';
import Button from '@mui/material/Button';
import CircleIcon from '@mui/icons-material/Circle';

export default function OptionChainTable() {
    const [expiryDateData, setExpiryDateData] = useState([])
    const [symbolData, setSymbolData] = useState(['NIFTY'])
    const [selectedExpiry, setSelectedExpiry] = useState('')
    const [optionTableData, setOptionTableData] = useState([])
    const [futureFairPrice, setFutureFairPrice] = useState('')
    const [spotPrice, setSpotPrice] = useState('')
    const [lot, setLot] = useState('')
    const [time, setTime] = useState('')
    const [iv, setIV] = useState('')
    const [maxPain, setMaxPain] = useState('')
    const [atmStrike, setATMStrike] = useState('')
    const [lotQty, setLotQty] = useState('lot');
    const [timeList, setTimeList] = useState([])
    const [selectedTime, setSelectedTime] = useState('')
    const [liveButtonFLag, setLiveButtonFlag] = useState(false)

    async function api_call() {
        const res = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/option_chain_table')

        const result = await res.json()
        if (result) {
            setExpiryDateData(result['expiry'])
            setSelectedExpiry(result['expiry'][0])
            setTimeList(result['time_list'])
            setSelectedTime(result['time_list'][result['time_list'].length - 1])
        }
        // const symbol = ["NIFTY"]
        // setSymbolData(symbol)
        get_table_data(result['expiry'][0], symbolData, result['time_list'][result['time_list'].length - 1])

    }

    async function get_table_data(expiry, symbol, selected_time) {
        const data_to_pass = { 'expiry': expiry, 'symbol': symbol, 'selected_time': selected_time }
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
            setFutureFairPrice(option_table_response['future_fair_price'])
            setSpotPrice(option_table_response['future_price_spot'])
            setLot(option_table_response['lot'])
            setTime(option_table_response['time'])
            setIV(option_table_response['iv'])
            setMaxPain(option_table_response['max_pain'])
            setATMStrike(option_table_response['atm_strike'])
        }
    }

    async function selectHandler(e) {

    }

    async function expiryHandle(e) {
        setSelectedExpiry(e.target.value)
        get_table_data(e.target.value, symbolData, selectedTime)
    }

    const handleLotQty = (event, value) => {
        if (value !== null) {
            setLotQty(value);
        }
    };

    async function get_data_on_selected_time(start_time) {
        console.log('***************', start_time)
        setSelectedTime(start_time)
        setLiveButtonFlag(false)
        if (start_time !== selectedTime) {
            get_table_data(selectedExpiry, symbolData, start_time)
        }
    }

    async function handleLiveButton() {
        console.log(timeList[timeList.length - 1])
        setLiveButtonFlag(true)
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
                    <div className="col-md-1 mt-1"> <strong>Spot Price</strong> </div>
                    <div className='col-md-1'>
                        <TextField
                            id="standard-read-only-input"
                            value={spotPrice}
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
                    <div className="col-md-2 mt-2">
                        <ToggleButtonGroup
                            color="primary"
                            value={lotQty}
                            exclusive
                            onChange={handleLotQty}
                            aria-label="Platform"
                            size='small'

                        >
                            <ToggleButton value="lot"><strong>Lot</strong></ToggleButton>
                            <ToggleButton value="qty"><strong>Qty</strong></ToggleButton>
                        </ToggleButtonGroup>
                    </div>
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
                    <div className="col-md-1 mt-1 text-end"> <strong>Future Fair Price</strong> </div>
                    <div className='col-md-2'>
                        <TextField
                            id="standard-read-only-input"
                            value={futureFairPrice}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="standard"
                        />
                    </div>

                </div>
            </form>
            {/* <OptionChainTableLayoutRsuite/> */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className='mx-1' style={{ width: '95%' }}>
                    {timeList.length > 0 && <OptionChainTableTimeSlider time_array={timeList} handleSelectedTime={get_data_on_selected_time} live_button_flag={liveButtonFLag}/>}
                </div>
                {timeList.length > 0 &&
                <div style={{ width: '5%' }} className='mt-3'>
                    <Button size='small' variant="outlined" color="error" onClick={handleLiveButton} disabled={selectedTime === timeList[timeList.length - 1] ? true : false}>
                        <CircleIcon fontSize="14px" color="error" className='mx-1' />
                        Live
                    </Button>
                </div>}
            </div>
            <OptionChainTableLayout tableData={optionTableData} lotqty={lotQty} atmStrike={atmStrike}/>
        </div>
    )
}
