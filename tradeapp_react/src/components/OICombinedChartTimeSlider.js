import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import { format, addMinutes } from 'date-fns';

export default function OICombinedChartTimeSlider(props) {
    const time_array = props.time_array
    const time_interval_button = props.time_interval

    // const [startTime, setStartTime] = useState(time_array[0]);
    // const [endTime, setEndTime] = useState(time_array[time_array.length - 1]);

    useEffect(() => {
        const flag = false
        if (time_interval_button === '0') {
            setTimeRange([convertTimeToValue(time_array[0]), convertTimeToValue(time_array[time_array.length - 1])])
            // setStartTime(time_array[0])
            // setEndTime(time_array[time_array.length - 1])
            props.handleCallBackTime(time_array[0], time_array[time_array.length - 1], flag)
        }
        else {
            if (props.time_interval !== null) {
                setTimeRange([timeRange[1] - time_interval_button, timeRange[1]])
                // setEndTime(convertValueToTime(timeRange[1]))
                if ((timeRange[1] - time_interval_button) < convertTimeToValue(time_array[0])) {
                    // setStartTime(time_array[0])
                    props.handleCallBackTime(time_array[0], convertValueToTime(timeRange[1]), flag)
                }
                else {
                    // setStartTime(convertValueToTime(timeRange[1] - time_interval_button))
                    props.handleCallBackTime(convertValueToTime(timeRange[1] - time_interval_button), convertValueToTime(timeRange[1]), flag)
                }
            }
        }
    }, [props.time_interval]);

    const convertTimeToValue = (time) => {
        const [hours, minutes] = time.split(':');
        return parseInt(hours) * 60 + parseInt(minutes);
    };

    const convertValueToTime = (value) => {
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        const time = format(new Date().setHours(hours, minutes), 'HH:mm');
        return time;
    };

    const [timeRange, setTimeRange] = useState([convertTimeToValue(time_array[0]), convertTimeToValue(time_array[time_array.length - 1])]);

    const step = 3; // Step value in minutes

    const handleChange = (event, newValue) => {
        console.log('newvalue', newValue[1])
        console.log('newvalue', convertTimeToValue(time_array[time_array.length - 1]))
        // const flag = true
        if (newValue[1] <= convertTimeToValue(time_array[time_array.length - 1])) {
            setTimeRange(newValue);

        }
        // setStartTime(convertValueToTime(newValue[0]));
        // setEndTime(convertValueToTime(newValue[1]));
        // // console.log('--------from onchange', newValue)
        // props.handleCallBackTime(convertValueToTime(newValue[0]), convertValueToTime(newValue[1]), flag)

    };

    const handleOnChangeCommited = (event, finalValue) => {
        // console.log('commited called')
        const flag = true
        // console.log('from commited', finalValue)
        // if (finalValue[0] !== finalValue[1]) {
        //     setTimeRange(finalValue);

        // }
        // setStartTime(convertValueToTime(finalValue[0]));
        // setEndTime(convertValueToTime(finalValue[1]));
        if (finalValue[1] <= convertTimeToValue(time_array[time_array.length - 1])) {
            props.handleCallBackTime(convertValueToTime(finalValue[0]), convertValueToTime(finalValue[1]), flag)

        }
        
    };

    const formatLabel = (value) => {
        const time = convertValueToTime(value);
        return format(new Date().setHours(time.split(':')[0], time.split(':')[1]), 'HH:mm');
    };

    const marks = [
        {
            value: 612,
            label: '10:10'
        },
        {
            value: 666,
            label: '11:07'
        },
        {
            value: 720,
            label: '12:00'
        },
        {
            value: 774,
            label: '12:55'
        },
        {
            value: 828,
            label: '13:47'
        },
        {
            value: 882,
            label: '14:40'
        }
    ]

    return (
        <div>
            <div className='mt-5 mx-2'>
                <Slider
                    min={convertTimeToValue('09:17')}
                    max={convertTimeToValue('15:29')}
                    step={step}
                    value={timeRange}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                    valueLabelFormat={formatLabel}
                    marks={marks}
                    disableSwap
                    onChangeCommitted={handleOnChangeCommited}
                />
            </div>
        </div>
    )
}