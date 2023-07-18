import React, { useEffect, useState } from 'react'
import Slider from '@mui/material/Slider';
import { format, addMinutes } from 'date-fns';

export default function OptionChainTableTimeSlider(props) {
    const time_array = props.time_array
    console.log('##############', props.live_button_flag)
    useEffect(() => {
        if (props.live_button_flag !== false) {
            setTimeRange(convertTimeToValue(time_array[time_array.length - 1]))
            props.handleSelectedTime(time_array[time_array.length - 1])
        }
    }, [props.live_button_flag]);

    const step = 3; // Step value in minutes

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

    const [timeRange, setTimeRange] = useState(convertTimeToValue(time_array[time_array.length - 1]));

    const formatLabel = (value) => {
        const time = convertValueToTime(value);
        return format(new Date().setHours(time.split(':')[0], time.split(':')[1]), 'HH:mm');
    };

    const handleTimeSlider = (event, newValue) => {
        if (newValue <= convertTimeToValue(time_array[time_array.length - 1])) {
            setTimeRange(newValue);
        }
    };

    const handleOnChangeCommited = (event, finalValue) => {
        if (finalValue <= convertTimeToValue(time_array[time_array.length - 1])) {
            props.handleSelectedTime(convertValueToTime(finalValue))
        }
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
                    min={convertTimeToValue('09:20')}
                    max={convertTimeToValue('15:32')}
                    step={step}
                    value={timeRange}
                    onChange={handleTimeSlider}
                    valueLabelDisplay="on"
                    valueLabelFormat={formatLabel}
                    marks={marks}
                    onChangeCommitted={handleOnChangeCommited}
                />
            </div>
        </div>
    )
}
