import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LinearProgress from "@mui/material/LinearProgress"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const theme = createTheme({
    palette: {
        color_ce: {
            main: '#f77560',
        },
        color_pe: {
            main: '#94eb78',
        },
    },
});

export default function OptionStrategyBuilderOptionChainModal() {
    const [index, setIndex] = useState('NIFTY');
    const [optionExpiry, setOptionExpiry] = useState('');
    const [optionsExpiryDates, setOptionsExpiryDates] = useState([]);
    const [futureExpiryDates, setFutureExpiryDates] = useState([]);
    const [optionChainTable, setOptionChainTable] = useState([]);
    const [futureChainTable, setFutureChainTable] = useState([]);
    const [modalOpen, setModalOpen] = useState(false)
    const [showActionId, setShowActionId] = useState(-1);
    const [optFutToggle, setOptFutToggle] = useState('opt');
    const [callSelectedOptions, setCallSelectedOptions] = useState([]);
    const [putSelectedOptions, setPutSelectedOptions] = useState([]);

    async function api_call() {
        const request_expiry = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/get_option_future_expiry')

        const result_expiry = await request_expiry.json()
        if (result_expiry) {
            setOptionsExpiryDates(result_expiry['options_exp'])
            setFutureExpiryDates(result_expiry['future_exp'])
            setOptionExpiry(result_expiry['options_exp'][0]['exp'])
            get_option_chain_table(index, result_expiry['options_exp'][0]['exp'], optFutToggle)
        }
    }

    useEffect(() => {
        api_call()
    }, [])

    async function get_option_chain_table(symbol, expiry, segment) {
        const data = {
            'symbol': symbol,
            'expiry': expiry,
            'segment': segment
        }
        const request_option_chain_table = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/get_option_chain', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const response_option_chain_table = await request_option_chain_table.json()
        if (response_option_chain_table) {
            console.log('response_option_chain_table', response_option_chain_table)
            if (response_option_chain_table['option_chain'].length > 0) {
                setOptionChainTable(response_option_chain_table['option_chain'])
            }
            if (response_option_chain_table['future_chain'].length > 0) {
                setFutureChainTable(response_option_chain_table['future_chain'])
            }
        }
    }

    const handleAddEditButton = () => {
        setModalOpen(true)
    }

    const handleDone = () => {
        setModalOpen(false);
    };

    const handleCancel = () => {
        setModalOpen(false);
    };

    const handleExpiry = (e) => {
        setOptionExpiry(e.target.value)
        get_option_chain_table(index, e.target.value, optFutToggle)
    }

    const handleSegmentChange = (event, value) => {
        if (value !== null) {
            setOptFutToggle(value);
            if (futureChainTable.length === 0 || optionChainTable.length === 0) {
                console.log('call apiiiiiiii')
                get_option_chain_table(index, optionExpiry, value)
            }
        }
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    const handleButtonSelect = (rowIndex, option, type, expiry) => {
        console.log(rowIndex, option, type, expiry)

        if (type === 'call') {
            setCallSelectedOptions((prevSelectedOptions) => {
                const updatedOptions = prevSelectedOptions.filter(
                    (selectedOption) => !(selectedOption.index === rowIndex && selectedOption.expiry === expiry)
                );
                updatedOptions.push({ index: rowIndex, option, lot: 10, expiry: expiry });
                return updatedOptions;
            });
        } else if (type === 'put') {
            setPutSelectedOptions((prevSelectedOptions) => {
                const updatedOptions = prevSelectedOptions.filter(
                    (selectedOption) => !(selectedOption.index === rowIndex && selectedOption.expiry === expiry)
                );
                updatedOptions.push({ index: rowIndex, option, lot: 10, expiry: expiry });
                return updatedOptions;
            });
        }
    };

    const handleButtonClick = (rowIndex, option, type, expiry) => {
        if (type === 'call') {
            const isSelected = callSelectedOptions.some(
                (selectedOption) => selectedOption.index === rowIndex && selectedOption.option === option && selectedOption.expiry === expiry
            );
            if (isSelected) {
                // handleButtonUnselect(rowIndex, option, type);
            } else {
                handleButtonSelect(rowIndex, option, type, expiry);
            }
        } else if (type === 'put') {
            const isSelected = putSelectedOptions.some(
                (selectedOption) => selectedOption.index === rowIndex && selectedOption.option === option && selectedOption.expiry === expiry
            );

            if (isSelected) {
                // handleButtonUnselect(rowIndex, option, type);
            } else {
                handleButtonSelect(rowIndex, option, type, expiry);
            }
        }
    }

    const isOptionSelected = (rowIndex, option, type, expiry) => {
        if (type === 'call') {
            return callSelectedOptions.some(
                (selectedOption) => selectedOption.index === rowIndex && selectedOption.option === option
            );
        } else if (type === 'put') {
            return putSelectedOptions.some(
                (selectedOption) => selectedOption.index === rowIndex && selectedOption.option === option
            );
        }
        return false;
    };

    console.log(callSelectedOptions)

    // const style = {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: 1000,
    //     bgcolor: 'background.paper',
    //     border: '1px solid #000',
    //     boxShadow: 24,
    //     p: 4,
    // };

    const columns = optFutToggle === 'opt' ? [
        { id: 'ce_action', label: '', minWidth: 40, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_delta', label: 'Delta', minWidth: 40, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_iv_calculated', label: 'IV', minWidth: 40, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_oi_bar', label: 'OI', minWidth: 80, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_last_price', label: 'LTP', minWidth: 40, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },

        { id: 'strike_price', label: 'Strike', minWidth: 80, color: '#f7f7a3', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },

        { id: 'pe_last_price', label: 'LTP', minWidth: 40, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_oi_bar', label: 'OI', minWidth: 80, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_iv_calculated', label: 'IV', minWidth: 40, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_delta', label: 'Delta', minWidth: 40, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_action', label: '', minWidth: 40, color: '#ffcc99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },

    ] :
        [
            { id: 'ce_action', label: '', minWidth: 10, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
            { id: 'expiry_date', label: 'Expiry', minWidth: 100, color: '#f7f7a3', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
            { id: 'open_interest', label: 'OI', minWidth: 100, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
            { id: 'last_price', label: 'LTP', minWidth: 100, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },


        ];

    const drawerContent = (
        <div style={{ width: '700px' }}>
            {/* <Button onClick={toggleModal}>
                <ChevronLeftIcon />
                Close
            </Button> */}
            <div>
                <div className='row mt-2'>
                    <div className='col-sm-8'></div>
                    <div className='col-sm-2' style={{ marginLeft: '4rem', width: '4.5rem' }}>
                        <Button size='small' variant='outlined' onClick={handleDone}>Done</Button>
                    </div>
                    <div className='col-sm-2' style={{ width: '4.5rem' }}>
                        <Button size='small' variant='outlined' onClick={handleCancel}>Cancel</Button>
                    </div>

                </div>
                <div className='row mx-2'>
                    <div className='col-sm-2' style={{ width: '6rem' }}>
                        <FormControl>
                            <FormHelperText style={{ marginLeft: '0.2rem' }}>Segment</FormHelperText>
                            <ToggleButtonGroup
                                color="primary"
                                value={optFutToggle}
                                exclusive
                                onChange={handleSegmentChange}
                                aria-label="option"
                                size='small'
                                style={{ marginTop: '2px' }}
                            >
                                <ToggleButton value="opt">OPT</ToggleButton>
                                <ToggleButton value="fut">FUT</ToggleButton>
                            </ToggleButtonGroup>
                        </FormControl>
                    </div>
                    <div className='col-sm-2'>
                        <FormControl variant="outlined" size='small' sx={{ minWidth: 100 }}>
                            <FormHelperText style={{ marginLeft: '0.2rem' }}>Index</FormHelperText>

                            <Select
                                id="index-select"
                                value={index}
                                onChange={(e) => setIndex(e.target.value)}
                            >
                                <MenuItem value="NIFTY">NIFTY</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    {optFutToggle === 'opt' &&
                        <div className='col-sm-2'>
                            <FormControl variant="outlined" size='small' sx={{ minWidth: 100 }} >
                                <FormHelperText style={{ marginLeft: '0.2rem' }}>Expiry</FormHelperText>
                                <Select
                                    id="expiry-select"
                                    value={optionExpiry}
                                    onChange={handleExpiry}
                                >
                                    {optionsExpiryDates.map((data) => (
                                        <MenuItem key={data.id} value={data.exp}>{data.exp}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>}
                </div>
            </div>
            <TableContainer className='mt-2' >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        {optFutToggle === 'opt' &&
                            <TableRow style={{ margin: '1px', padding: '1px' }}>
                                <TableCell sx={{ borderBottom: '1px solid red' }} align="center" colSpan={5}>
                                    Call
                                </TableCell>
                                <TableCell align="center" colSpan={1} sx={{ borderBottom: 'none' }}>
                                </TableCell>
                                <TableCell sx={{ borderBottom: '1px solid green' }} align="center" colSpan={5}>
                                    Put
                                </TableCell>
                            </TableRow>}
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align='center'
                                    // style={{ maxWidth: column.minWidth }}
                                    style={{ minWidth: column.minWidth, fontSize: 12 }}
                                    sx={{
                                        padding: "2px 2px",
                                        // border: column.id !== 'strike_price' ? "1px solid grey" : '',
                                        // borderTop: column.top,
                                        // borderBottom: column.bottom,
                                        // borderLeft: column.left,
                                        // borderRight: column.right,
                                        fontWeight: "bold",
                                        // width: 150,
                                        // align: 'center'
                                    }}
                                >
                                    {column.label}
                                </TableCell>)
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(optFutToggle === 'opt' ? optionChainTable : futureChainTable)
                            .map((row, rowIndex) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.ce_id} 
                                    onMouseEnter={() => {
                                        setShowActionId(row.ce_id);
                                    }}
                                        onMouseLeave={() => setShowActionId(-1)}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (

                                                <TableCell key={column.id} align='center' size='small'
                                                    style={{ fontSize: 11 }}
                                                    sx={{
                                                        padding: "0px 0px",
                                                        // border: "1px solid #F8F8F8",
                                                        height: '35px',
                                                        // backgroundColor: row.ce_moneyness === 'ITM' && column.parent === 'ce' ? '#e7e6e6' : row.pe_moneyness === 'ITM' && column.parent === 'pe' ? '#e7e6e6' : row.ce_moneyness === 'ATM' || column.id === 'strike_price' ? '#f7f7a3' : '',
                                                        // backgroundColor: row.strike_price < atmstrike && column.parent === 'ce' ? '#e7e6e6' : row.strike_price > atmstrike && column.parent === 'pe' ? '#e7e6e6' : row.strike_price === atmstrike || column.id === 'strike_price' ? '#f7f7a3' : '',
                                                        // color: column.id === 'ce_oi_chg_combined' ? row.ce_oi_chg_color : column.id === 'pe_oi_chg_combined' ? row.pe_oi_chg_color : column.id === 'ce_ltp_chg_combined' ? row.ce_ltp_chg_color : column.id === 'pe_ltp_chg_combined' ? row.pe_ltp_chg_color : ''
                                                    }}>
                                                    <div className='m-1 rounded' style={column.id === 'ce_build_up' ? { backgroundColor: row.ce_color } : column.id === 'pe_build_up' ? { backgroundColor: row.pe_color } : { backgroundColor: '' }} >
                                                        {/* {value} */}
                                                        {column.id === 'ce_oi_bar' ? '' : column.id === 'pe_oi_bar' ? '' : (column.id === 'ce_action') ? (row.ce_id === showActionId ?
                                                            <div >
                                                                <Button
                                                                    variant={isOptionSelected(rowIndex, 'buy', 'call', optionExpiry) ? 'contained' : 'outlined'}
                                                                    color='success'
                                                                    style={{ maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px', marginRight: '1px' }}
                                                                    onClick={() => handleButtonClick(rowIndex, 'buy', 'call', optionExpiry)}
                                                                >
                                                                    B
                                                                </Button>
                                                                <Button
                                                                    variant='outlined'
                                                                    color='error'
                                                                    style={{ maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px' }}
                                                                    onClick={() => handleButtonClick(rowIndex, 'sell', 'call', optionExpiry)}
                                                                >
                                                                    S
                                                                </Button>
                                                            </div> : '') : (column.id === 'pe_action') ? (row.ce_id === showActionId ?
                                                                <div >
                                                                    <Button
                                                                        variant='contained'
                                                                        color='success'
                                                                        style={{ maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px', marginRight: '1px' }}
                                                                    // onClick={() => handleButtonClick(rowIndex, 'sell', 'right')}
                                                                    >
                                                                        B
                                                                    </Button>
                                                                    <Button
                                                                        variant='contained'
                                                                        color='error'
                                                                        style={{ maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px' }}
                                                                    // onClick={() => handleButtonClick(rowIndex, 'sell', 'right')}
                                                                    >
                                                                        S
                                                                    </Button>
                                                                </div> : '') : value}

                                                        {/* {lotorqty === 'qty' && (column.id === 'ce_open_interest' || column.id === 'ce_changein_open_interest' || column.id === 'ce_total_traded_volume' || column.id === 'pe_open_interest' || column.id === 'pe_changein_open_interest' || column.id === 'pe_total_traded_volume') ? value * 50 : (row.ce_not_traded === true && column.show_ce_dash === true) ? '-' : (row.pe_not_traded === true && column.show_pe_dash === true) ? '-' : (row.ce_total_traded_volume === 0 && column.show_ce_not_traded_dash === true) ? '-' : (row.pe_total_traded_volume === 0 && column.show_pe_not_traded_dash === true) ? '-' : (row.ce_open_interest === 0 && column.show_ce_oi_greater_zero === true) ? '-' : (row.pe_open_interest === 0 && column.show_pe_oi_greater_zero === true) ? '-' : column.id == 'ce_oi_bar' ? '' : column.id === 'pe_oi_bar' ? '' : value} */}

                                                    </div>
                                                    {(column.id === 'ce_oi_bar' || column.id === 'pe_oi_bar') &&
                                                        <div>
                                                            <ThemeProvider theme={theme}>
                                                                <div style={{ position: 'relative' }}>
                                                                    <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: '1' }} > {column.id === 'ce_oi_bar' ? row['ce_open_interest'] : row['pe_open_interest']} </div>
                                                                    <div style={{ zIndex: '1', opacity: '0.5' }}>
                                                                        <LinearProgress
                                                                            color={column.id === 'ce_oi_bar' ? 'color_ce' : 'color_pe'}
                                                                            sx={{
                                                                                'height': 20,
                                                                                background: 'transparent',
                                                                                transform: column.id === 'ce_oi_bar' && 'rotate(180deg)',
                                                                                '& .MuiLinearProgress-bar': {
                                                                                    transform: 'rotate(180deg)',
                                                                                }
                                                                            }}
                                                                            variant="determinate"
                                                                            value={value}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </ThemeProvider>
                                                        </div>}
                                                </TableCell>)
                                        })}
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>


            {/* </Box> */}
        </div>
        // </div >
    );


    return (
        <div className='mt-2'>
            <Button variant="contained" onClick={handleAddEditButton}>Add/Edit</Button>
            <Drawer
                anchor="left"
                open={modalOpen}
                onClose={toggleModal}
                BackdropProps={{
                    // Set the backdrop to be fully transparent
                    invisible: true,
                }}
            >
                {drawerContent}
            </Drawer>
            {/* <Modal open={modalOpen}>
                
            </Modal> */}
        </div>



    )
}
