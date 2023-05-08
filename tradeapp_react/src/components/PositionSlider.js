import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


export default function PositionSlider(props) {

    const [spotPercent, setSpotPercent] = useState(0)
    const [ivPercent, setIvPercent] = useState(0)
    const [nextNDays, setNextNDays] = useState('')
    const [positionSliderValueChange, setPositionSliderValueChange] = useState(false)

    let daysCount = props.dateProps

    function valuetext(value) {
        return `${value}°C`;
    }

    const handleSlider = (e) => {
        if (e.target.name === 'spot') {
            setSpotPercent(e.target.value)
        }
        if (e.target.name === 'iv') {
            setIvPercent(e.target.value)
        }
        if (e.target.name === 'days') {
            setNextNDays(e.target.value)
        }
        setPositionSliderValueChange(true)
    }

    const slider_data = {
        'spotPercent': spotPercent,
        'ivPercent': ivPercent,
        'nextNDays': nextNDays,
        'positionsliderchange': positionSliderValueChange
    }
    useEffect(() => {
        props.handleSliderCallback(slider_data)
    }, [spotPercent, ivPercent, nextNDays, positionSliderValueChange])

    return (
        <Box sx={{ width: 1000 }}>
            <strong>Spot (%)</strong>
            <Slider
                aria-label="Small steps"
                defaultValue={0}
                getAriaValueText={valuetext}
                step={0.5}
                marks
                min={-30}
                max={30}
                name='spot'
                valueLabelDisplay="on"
                onChange={handleSlider}
                color="secondary"
            />
            <strong className='mt-5'>IV (%)</strong>
            <Slider
                aria-label="Small steps"
                defaultValue={0}
                getAriaValueText={valuetext}
                step={5}
                marks
                min={-50}
                max={50}
                name='iv'
                valueLabelDisplay="on"
                onChange={handleSlider}
                color="warning"
            />
            <strong className='mt-5'>Next n Days</strong>
            <Slider
                key={`slider-${daysCount}`}
                aria-label="Small steps"
                defaultValue={daysCount}
                getAriaValueText={valuetext}
                step={1}
                marks
                min={0}
                name='days'
                max={daysCount}
                valueLabelDisplay="on"
                onChange={handleSlider}
            />
        </Box>
    )
}