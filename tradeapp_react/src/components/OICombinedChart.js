import React, { useEffect, useState, useRef } from 'react'
import 'chart.js/auto';
import CoPoBarChartGraph from './CoPoBarChartGraph';
import CoPoChangeBarChartGraph from './CoPoChangeBarChartGraph';
import TotalOIChart from './TotalOIChart';
import TotalOIChangeChart from './TotalOIChangeChart';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import OICombinedChartTimeSlider from './OICombinedChartTimeSlider';
import FormControl from "@mui/material/FormControl";
import { MultiSelect } from "react-multi-select-component";

export default function OICombinedChart() {
    const [symbol, setSymbol] = useState(['NIFTY'])
    const [expiryDates, setExpiryDates] = useState([])
    const [selectedExpiry, setSelectedExpiry] = useState([])
    const [labelOI, setLabelOI] = useState([])
    const [labelTotalOI, setLabelTotalOI] = useState([])
    const [labelOIChange, setLabelOIChange] = useState([])
    const [labelTotalOIChange, setLabelTotalOIChange] = useState([])
    const [datasetOI, setDataSetOI] = useState([])
    const [datasetTotalOI, setDataSetTotalOI] = useState([])
    const [datasetOIChange, setDataSetOIChange] = useState([])
    const [datasetTotalOIChange, setDataSetTotalOIChange] = useState([])
    const [timeInterval, setTimeInterval] = React.useState('0');
    const [allSelected, setAllSelected] = useState('all')
    const [strikeCount, setStrikeCount] = useState('10')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [timeList, setTimeList] = useState([])

    const OI_chart_ref = useRef(null); // the lifted state
    const OI_change_chart_ref = useRef(null); // the lifted state
    const [dataIndexOI, setDataIndexOI] = useState();
    const [dataIndexOIChange, setDataIndexOIChange] = useState();
    const [indexOI, setIndexOI] = useState();
    const [indexOIChange, setIndexOIChange] = useState();

    const [clearOI, setClearOI] = useState(0)
    const [clearOIChange, setClearOIChange] = useState(0)


    async function api_call() {
        const request_expiry_date = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/oi_stats_chart')

        const result_expiry_dates = await request_expiry_date.json()
        console.log(result_expiry_dates['expiry'][0])
        if (result_expiry_dates) {
            setExpiryDates(result_expiry_dates['expiry'])
            setSelectedExpiry([result_expiry_dates['expiry'][0]])
            setTimeList(result_expiry_dates['time_list'])
            setStartTime(result_expiry_dates['time_list'][0])
            setEndTime(result_expiry_dates['time_list'][result_expiry_dates['time_list'].length - 1])
            get_oi_stats_chart([result_expiry_dates['expiry'][0]], symbol, strikeCount, allSelected, result_expiry_dates['time_list'][0], result_expiry_dates['time_list'][result_expiry_dates['time_list'].length - 1])
        }
    }

    useEffect(() => {
        api_call();
    }, [])

    async function get_oi_stats_chart(expiry, symbol, number_of_strike, all_strikes_selected, start_time, end_time) {
        const data_to_pass = { 'expiry': expiry, 'symbol': symbol, 'number_of_strike': number_of_strike, 'all_strikes_selected': all_strikes_selected, 'start_time': start_time, 'end_time': end_time }
        const request_chart = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/oi_stats_chart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_to_pass)
        })

        const chart_response = await request_chart.json()
        if (chart_response) {
            setLabelOI(chart_response['oi_chart']['strike_price'])
            setDataSetOI(chart_response['oi_chart']['dataset'])

            setLabelTotalOI(chart_response['oi_total_chart']['label'])
            setDataSetTotalOI(chart_response['oi_total_chart']['dataset'])

            setLabelOIChange(chart_response['oi_change_chart']['strike_price'])
            setDataSetOIChange(chart_response['oi_change_chart']['dataset'])

            setLabelTotalOIChange(chart_response['oi_total_change_chart']['label'])
            setDataSetTotalOIChange(chart_response['oi_total_change_chart']['dataset'])

        }
    }

    const lineData =
    {
        labels: labelOI,
        datasets: datasetOI
    }

    const lineDataOITotal =
    {
        labels: labelTotalOI,
        datasets: datasetTotalOI
    }

    const lineDataOIChange =
    {
        labels: labelOIChange,
        datasets: datasetOIChange
    }

    const lineDataTotalOIChange =
    {
        labels: labelTotalOIChange,
        datasets: datasetTotalOIChange
    }

    const handleTimeInterval = (event, value) => {
        if (value !== null) {
            setTimeInterval(value);
            // get_oi_stats_chart(selectedExpiry, symbol, value, strikeCount, allSelected)
        }
    };

    async function handleAllSelectedStrike(e) {
        setAllSelected(e.target.value)
        get_oi_stats_chart(selectedExpiry, symbol, strikeCount, e.target.value, startTime, endTime)
    }

    async function handleStrikeCount(e) {
        if (e.target.value >= 2 && e.target.value <= 25) {
            setStrikeCount(e.target.value)
            get_oi_stats_chart(selectedExpiry, symbol, e.target.value, allSelected, startTime, endTime)
        }
    }

    async function get_data_on_time_change(start_time, end_time, flag) {
        if (flag === true) {
            setTimeInterval(null)
        }
        setStartTime(start_time)
        setEndTime(end_time)
        if (start_time !== startTime || end_time !== endTime) {
            get_oi_stats_chart(selectedExpiry, symbol, strikeCount, allSelected, start_time, end_time)
        }
    }

    async function handleExpiry(e) {
        if (e.length === 0) {
            setSelectedExpiry([expiryDates[0]])
            get_oi_stats_chart([expiryDates[0]], symbol, strikeCount, allSelected, startTime, endTime)
        }
        else {
            setSelectedExpiry(e)
            get_oi_stats_chart(e, symbol, strikeCount, allSelected, startTime, endTime)
        }
    };

    const sendDataToOIChart = (chartRef1, dataIndex, index, clear) => {
        setDataIndexOIChange(dataIndex)
        setIndexOIChange(index)
        setClearOIChange(clear)
    };

    const sendDataToOIChangeChart = (chartRef2, dataIndex, index, clear) => {
        setDataIndexOI(dataIndex)
        setIndexOI(index)
        setClearOI(clear)
    };

    return (
        <div className='mt-2'>
            <h4 className='text-center'>OI Stats (Options)</h4>
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

            <div className='row mt-2'>
                <div className='col-md-2 mt-4'>
                    {datasetTotalOI.length > 0 && <TotalOIChart chartData={lineDataOITotal} />}

                </div>
                <div className='col-md-10'>
                    {datasetOI.length > 0 && <CoPoBarChartGraph chartData={lineData} OI_chart_ref={OI_chart_ref} dataIndex={dataIndexOI} index={indexOI} clear={clearOI} sendDataToOIChart={sendDataToOIChart} />}
                </div>
            </div>
            <div className='row mt-5'>
                <div className='col-md-2'>
                    {datasetTotalOIChange.length > 0 && <TotalOIChangeChart chartData={lineDataTotalOIChange} />}
                </div>
                <div className='col-md-10'>
                    {datasetOIChange.length > 0 && <CoPoChangeBarChartGraph chartData={lineDataOIChange} OI_change_chart_ref={OI_change_chart_ref} dataIndex={dataIndexOIChange} index={indexOIChange} clear={clearOIChange} sendDataToOIChangeChart={sendDataToOIChangeChart} />}
                </div>
            </div>

            {timeList.length > 0 && <div>
                Last: <ToggleButtonGroup
                    color="primary"
                    value={timeInterval}
                    exclusive
                    onChange={handleTimeInterval}
                    aria-label="Platform"
                >
                    <ToggleButton style={{ marginLeft: 2, marginRight: 2, border: '1px solid black', borderRadius: '5px', paddingTop: '1px', paddingBottom: '1px' }} value="3">3</ToggleButton>
                    <ToggleButton style={{ marginLeft: 2, marginRight: 2, border: '1px solid black', borderRadius: '5px', paddingTop: '1px', paddingBottom: '1px' }} value="15">15</ToggleButton>
                    <ToggleButton style={{ marginLeft: 2, marginRight: 2, border: '1px solid black', borderRadius: '5px', paddingTop: '1px', paddingBottom: '1px' }} value="30">30</ToggleButton>
                    <ToggleButton style={{ marginLeft: 2, marginRight: 2, border: '1px solid black', borderRadius: '5px', paddingTop: '1px', paddingBottom: '1px' }} value="45">45</ToggleButton>
                    <ToggleButton style={{ marginLeft: 2, marginRight: 2, border: '1px solid black', borderRadius: '5px', paddingTop: '1px', paddingBottom: '1px' }} value="60">60</ToggleButton>
                    <span>min,&nbsp;</span>
                    <ToggleButton style={{ marginLeft: 2, marginRight: 2, border: '1px solid black', borderRadius: '5px', paddingTop: '1px', paddingBottom: '1px' }} value="120">2</ToggleButton>
                    <ToggleButton style={{ marginLeft: 2, marginRight: 2, border: '1px solid black', borderRadius: '5px', paddingTop: '1px', paddingBottom: '1px' }} value="180">3</ToggleButton>
                    <span>hrs,&nbsp;</span>
                    <ToggleButton style={{ marginLeft: 2, marginRight: 2, border: '1px solid black', borderRadius: '5px', paddingTop: '1px', paddingBottom: '1px' }} value="0">Current</ToggleButton>

                </ToggleButtonGroup>
            </div>}
            {timeList.length > 0 && <OICombinedChartTimeSlider time_array={timeList} time_interval={timeInterval} handleCallBackTime={get_data_on_time_change} />}

        </div>
    )
}
