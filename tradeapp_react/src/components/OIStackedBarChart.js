import React, { useEffect, useState } from 'react'
import 'chart.js/auto';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from "@mui/material/FormControl";
import { MultiSelect } from "react-multi-select-component";
import OIStackedBarChartGraph from './OIStackedBarChartGraph';
import OIStackedBarChartCombinedGraph from './OIStackedBarChartCombinedGraph';

export default function OIStackedBarChart() {
    const [symbol, setSymbol] = useState(['NIFTY'])
    const [expiryDates, setExpiryDates] = useState([])
    const [selectedExpiry, setSelectedExpiry] = useState([])
    const [label, setLabel] = useState([])
    const [dataset, setDataSet] = useState([])
    const [combinedLabel, setCombinedLabel] = useState([])
    const [combinedDataset, setCombinedDataSet] = useState([])
    const [allSelected, setAllSelected] = useState('all')
    const [strikeCount, setStrikeCount] = useState('10')

    async function api_call() {
        const request_expiry_date = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/oi_stacked_bar_chart')

        const result_expiry_dates = await request_expiry_date.json()
        if (result_expiry_dates) {
            setExpiryDates(result_expiry_dates)
            setSelectedExpiry([result_expiry_dates[0]])
            get_oi_stacked_chart([result_expiry_dates[0]], symbol, strikeCount, allSelected)
        }
    }

    useEffect(() => {
        api_call();
    }, [])

    async function get_oi_stacked_chart(expiry, symbol, number_of_strike, all_strikes_selected) {
        const data_to_pass = { 'expiry': expiry, 'symbol': symbol, 'number_of_strike': number_of_strike, 'all_strikes_selected': all_strikes_selected }
        const request_chart = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/oi_stacked_bar_chart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_to_pass)
        })

        const chart_response = await request_chart.json()
        if (chart_response) {
            setLabel(chart_response['individual_strike']['strike_price'])
            setDataSet(chart_response['individual_strike']['dataset'])

            setCombinedLabel(chart_response['combined_strike']['label'])
            setCombinedDataSet(chart_response['combined_strike']['dataset'])

        }
    }

    async function handleExpiry(e) {
        if (e.length === 0) {
            setSelectedExpiry([expiryDates[0]])
            get_oi_stacked_chart([expiryDates[0]], symbol, strikeCount, allSelected)
        }
        else {
            setSelectedExpiry(e)
            get_oi_stacked_chart(e, symbol, strikeCount, allSelected)
        }
    };

    async function handleAllSelectedStrike(e) {
        setAllSelected(e.target.value)
        get_oi_stacked_chart(selectedExpiry, symbol, strikeCount, e.target.value)
    }

    async function handleStrikeCount(e) {
        if (e.target.value >= 2 && e.target.value <= 25) {
            setStrikeCount(e.target.value)
            get_oi_stacked_chart(selectedExpiry, symbol, e.target.value, allSelected)
        }
        else {
            alert('Please selected value from 2 to 25')
        }
    }

    const barData =
    {
        labels: label,
        datasets: dataset
    }

    const combinedBarData =
    {
        labels: combinedLabel,
        datasets: combinedDataset
    }

    return (
        <div className='mt-2'>
            <h4 className='text-center'>OI Stats (Options- Combined)</h4>
            <div className="row">
                <div style={{ width: '5rem' }} className="col-md-1 mt-1"> <strong>Symbol</strong> </div>
                <div className="col-md-1">
                    <select
                        className="form-control"
                        name="symbol"
                    >
                        {symbol.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ width: '5rem' }} className="col-md-1 mt-1"> <strong>Expiry</strong> </div>
                <div className="col-md-2">
                    <MultiSelect
                        options={expiryDates}
                        value={selectedExpiry}
                        onChange={handleExpiry}
                        labelledBy={"Select"}
                    />
                </div>
                <div style={{ width: '17rem' }} className="col-md-2">
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={allSelected}
                            onChange={handleAllSelectedStrike}
                        >
                            <strong className='mt-1'>Strikes:</strong>
                            <FormControlLabel className='mx-1' value="all" control={<Radio sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 16,
                                },
                            }} />} label="All" />
                            <FormControlLabel className='mx-1' value="selected" control={<Radio sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 16,
                                },
                            }} />} label="Near ATM" />
                        </RadioGroup>
                    </FormControl>
                </div>
                {allSelected === 'selected' &&
                    <div className='col-md-1 mt-1' style={{ marginLeft: '-20px' }}>
                        <input type='number' min='2' max='20' defaultValue={strikeCount} onChange={handleStrikeCount} />
                    </div>}
            </div>
            <div className='row mt-5' >
                <div className='col-md-2 mt-2'>
                    {combinedDataset.length > 0 && <OIStackedBarChartCombinedGraph chartData={combinedBarData} />}
                </div>
                <div className='col-md-10'>
                    {dataset.length > 0 && <OIStackedBarChartGraph chartData={barData}/>}
                </div>
            </div>
        </div>
    )
}