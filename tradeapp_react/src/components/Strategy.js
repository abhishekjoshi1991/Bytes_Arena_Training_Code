// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
// import FormLabel from '@mui/material/FormLabel';
import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import StrategyCounter from './StrategyCounter';

export default function Strategy() {
    const [expiryDateData, setExpiryDateData] = useState([])
    const [index, setIndex] = useState('nifty');
    const [segment, setSegment] = useState('futures');
    const [expiry, setExpiry] = useState('');
    const [optionStrike, setOptionStrike] = useState('');
    const [optionType, setOptionType] = useState('CE');
    const [radioValue, setRadioValue] = useState('buy');
    const [count, setCount] = useState(0);

    async function api_call() {
        const res = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/strategy_planner')

        const result = await res.json()
        console.log(result)
        if (result) {
            setExpiryDateData(result)
        }
        // const symbol = ["NIFTY"]
        // setSymbolData(symbol)
    }

    useEffect(() => {
        api_call();
    }, [])
    // console.log(expiryDateData)
    const getcount = (qty) => {
        setCount(qty)
    }

    const handleSubmit = () => {
        const data = {
            'index': index,
            'segment': segment,
            'expiry': expiry,
            'option_strike': optionStrike,
            'option_type': optionType,
            'buy_sell': radioValue,
            'lot_quantity': count,
        }
        console.log(data)
    }

    return (
        <div>
            <Container maxWidth="xl">
                <h2> Strategy Builder</h2>
                <div className='row'>
                    <div className='col-md-6'>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 600 }}>
                            <Select
                                id="index-select"
                                value={index}
                                onChange={(e) => setIndex(e.target.value)}
                            >
                                <MenuItem value="nifty">NIFTY</MenuItem>
                            </Select>
                            <FormHelperText>Select Index/Stock</FormHelperText>
                        </FormControl>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-3'>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 350 }}>
                            <Select
                                id="segment-select"
                                value={segment}
                                onChange={(e) => setSegment(e.target.value)}
                            >
                                <MenuItem value="futures">Futures</MenuItem>
                                <MenuItem value="options">Options</MenuItem>
                            </Select>
                            <FormHelperText>Select Segment</FormHelperText>
                        </FormControl>
                    </div>

                    <div className='col-md-3'>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 350 }}>
                            <Select
                                id="expiry-select"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                            >

                                {expiryDateData.map((data) => (
                                    <MenuItem key={data.id} value={data.exp}>{data.exp}</MenuItem>
                                ))}
                                {/* <MenuItem value="Expiry">Expiry</MenuItem> */}
                            </Select>
                            <FormHelperText>Select Expiry</FormHelperText>
                        </FormControl>
                    </div>


                    {segment === 'options' ?
                        <div className='col-md-3'>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 350 }}>
                                <Select
                                    id="option-strike-select"
                                    value={optionStrike}
                                    onChange={(e) => setOptionStrike(e.target.value)}
                                >
                                    <MenuItem value="strike">Strike</MenuItem>
                                </Select>
                                <FormHelperText>Select Option Strike</FormHelperText>
                            </FormControl>
                        </div> : ''}

                    {segment === 'options' ?
                        <div className='col-md-3'>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 350 }}>
                                <Select
                                    id="option-type-select"
                                    value={optionType}
                                    onChange={(e) => setOptionType(e.target.value)}
                                >
                                    <MenuItem value='CE'>CE</MenuItem>
                                    <MenuItem value='PE'>PE</MenuItem>
                                </Select>
                                <FormHelperText>Select Option Type</FormHelperText>
                            </FormControl>
                        </div> : ''}
                </div>

                <div className='row mt-3'>
                    <div className='col-md-2 mx-2'>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-form-control-label-placement"
                                name="position"
                                defaultValue="buy"
                                onChange={(e) => setRadioValue(e.target.value)}
                            >
                                <FormControlLabel value="buy" control={<Radio />} label="Buy" />
                                <FormControlLabel value="sell" control={<Radio />} label="Sell" />
                            </RadioGroup>
                        </FormControl>
                    </div>

                    <div className='col-md-3'>
                        <StrategyCounter handleCallback={getcount} />
                    </div>

                    <div className='col-md-3'>
                        <Button variant="contained" onClick={handleSubmit}>Add Position</Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}
