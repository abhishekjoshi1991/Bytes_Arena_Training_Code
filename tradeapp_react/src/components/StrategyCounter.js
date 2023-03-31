import React, { useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';

export default function StrategyCounter(props) {
    const [count, setCount] = useState(1);
    const IncNum = () => {
        setCount(count + 1);
    };
    const DecNum = () => {
        if (count > 1) {
            setCount(count - 1);
        }
        else {
            setCount(1);
        }
    };

    useEffect(() => {
        props.handleCallback(count);
      }, [count, props])

    return (
        <div>
            <span className='mx-2'>Lot Qty.</span>
            <Button variant="outlined" onClick={DecNum}><Remove /></Button>
            <label className='mx-3'>{count}</label>
            <Button variant="outlined" onClick={IncNum}><Add /></Button>
        </div>
    )
}
