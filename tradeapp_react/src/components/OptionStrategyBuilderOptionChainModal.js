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

export default function OptionStrategyBuilderOptionChainModal(props) {
    const [index, setIndex] = useState('NIFTY');
    const [optionExpiry, setOptionExpiry] = useState('');
    const [optionsExpiryDates, setOptionsExpiryDates] = useState([]);
    const [futureExpiryDates, setFutureExpiryDates] = useState([]);
    const [optionChainTable, setOptionChainTable] = useState([]);
    const [futureChainTable, setFutureChainTable] = useState([]);
    const [optionStrikeList, setOptionStrikeList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false)
    const [showActionId, setShowActionId] = useState(-1);
    const [optFutToggle, setOptFutToggle] = useState('opt');
    const [callSelectedOptions, setCallSelectedOptions] = useState([]);
    const [putSelectedOptions, setPutSelectedOptions] = useState([]);
    const [futureSelectedOptions, setFutureSelectedOptions] = useState([]);

    const [allSelectedOptions, setAllSelectedOptions] = useState([]);

    const [allExpiryStrikeList, setAllExpiryStrikeList] = useState([]);
    const [expiryStrikeIdDict, setExpiryStrikeIdDict] = useState({});
    const [expiryIdDict, setExpiryIdDict] = useState({});
    const [atmstrike, setATMStrike] = useState([]);

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

    // useEffect(() => {
    //     api_call()
    //     console.log('page reload called')
    //     const merged_array = [...callSelectedOptions, ...putSelectedOptions, ...futureSelectedOptions]
    //     console.log('merged_array', merged_array)
    //     manage_position(merged_array)

    // }, [callSelectedOptions, putSelectedOptions, futureSelectedOptions])

    useEffect(() => {
        console.log('first use effecrt called')
        api_call();
    }, []);

    useEffect(() => {
          setAllSelectedOptions(props.selectedOptionsModal);
    }, [props.selectedOptionsModal]);

    useEffect(() => {
        props.handleDrawerCallback(allSelectedOptions)
    }, [allSelectedOptions]);

    async function manage_position(data) {
        const request_position_add = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/manage_position', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const response_position_add = await request_position_add.json()
        return response_position_add
    }

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
            if (response_option_chain_table['option_chain'].length > 0) {
                setOptionChainTable(response_option_chain_table['option_chain'])
                setATMStrike(response_option_chain_table['atm_strike'])
                setOptionStrikeList(response_option_chain_table['option_strikes'])
                setAllExpiryStrikeList(response_option_chain_table['all_strikes'])
                setExpiryStrikeIdDict(response_option_chain_table['expiry_strike_id_dict'])
            }
            if (response_option_chain_table['future_chain'].length > 0) {
                setFutureChainTable(response_option_chain_table['future_chain'])
                setExpiryIdDict(response_option_chain_table['expiry_id_dict'])
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
                get_option_chain_table(index, optionExpiry, value)
            }
        }
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    // const handleButtonSelect = (id, rowIndex, option, type, expiry, strike, segment, entry_price, option_type, stock, expiryList, delta, gamma, theta, vega, int_val, ext_val, iv, strike_list, expiry_strike_list) => {
    //     if (type === 'call') {
    //         setCallSelectedOptions((prevSelectedOptions) => {
    //             const updatedOptions = prevSelectedOptions.filter(
    //                 (selectedOption) => !(selectedOption.index === rowIndex && selectedOption.expiry === expiry && selectedOption.segment === segment)
    //             );
    //             updatedOptions.push({ row_id: id, index: rowIndex, option, lot: 1, expiry: expiry, strike: strike, strike_copy: strike, segment: segment, type: type, entry_price: entry_price, option_type: option_type, stock: stock, expiryList: expiryList, delta: delta, gamma: gamma, theta: theta, vega: vega, int_val: int_val, ext_val: ext_val, iv: iv, strike_list: strike_list, expiry_strike_list: expiry_strike_list });
    //             return updatedOptions;
    //         });
    //     } else if (type === 'put') {
    //         setPutSelectedOptions((prevSelectedOptions) => {
    //             const updatedOptions = prevSelectedOptions.filter(
    //                 (selectedOption) => !(selectedOption.index === rowIndex && selectedOption.expiry === expiry && selectedOption.segment === segment)
    //             );
    //             updatedOptions.push({ row_id: id, index: rowIndex, option, lot: 1, expiry: expiry, strike: strike, strike_copy: strike, segment: segment, type: type, entry_price: entry_price, option_type: option_type, stock: stock, expiryList: expiryList, delta: delta, gamma: gamma, theta: theta, vega: vega, int_val: int_val, ext_val: ext_val, iv: iv, strike_list: strike_list, expiry_strike_list: expiry_strike_list });
    //             return updatedOptions;
    //         });
    //     }
    // };

    const handleButtonSelect = (id, action, option_type, expiry, segment, strike, entry_price, stock, expiryList, delta, gamma, theta, vega, int_val, ext_val, iv, strike_list, expiry_strike_list, expiry_strike_id_dict) => {
        setAllSelectedOptions((prevSelectedOptions) => {
            const updatedOptions = prevSelectedOptions.filter(
                (selectedOption) => !(selectedOption.id === id && selectedOption.option_type === option_type && selectedOption.expiry === expiry && selectedOption.segment === segment)
            );
            updatedOptions.push({
                id: id,
                action: action,
                option_type: option_type,
                expiry: expiry,
                segment: segment,
                strike: strike,
                strike_copy: strike,
                entry_price: entry_price,
                stock: stock,
                expiryList: expiryList,
                delta: delta,
                gamma: gamma,
                theta: theta,
                vega: vega,
                int_val: int_val,
                ext_val: ext_val,
                iv: iv,
                strike_list: strike_list,
                expiry_strike_list: expiry_strike_list,
                expiry_strike_id_dict: expiry_strike_id_dict,
                lot: 1
            });
            return updatedOptions;
        });
    };


    const handleButtonClick = (id, action, option_type, expiry, segment, strike, entry_price, stock, expiryList, delta, gamma, theta, vega, int_val, ext_val, iv, strike_list, expiry_strike_list, expiry_strike_id_dict) => {
        const isSelected = allSelectedOptions.some(
            (selectedOption) => selectedOption.id === id && selectedOption.action === action && selectedOption.option_type === option_type && selectedOption.expiry === expiry && selectedOption.segment === segment
        );
        console.log('isselected', isSelected)
        if (isSelected) {
            handleButtonUnselect(id, action, option_type, expiry, segment);
        } else {
            handleButtonSelect(id, action, option_type, expiry, segment, strike, entry_price, stock, expiryList, delta, gamma, theta, vega, int_val, ext_val, iv, strike_list, expiry_strike_list, expiry_strike_id_dict);
        }
    }

    const handleButtonUnselect = (id, action, option_type, expiry, segment) => {
        setAllSelectedOptions((prevSelectedOptions) => {
            const updatedOptions = prevSelectedOptions.filter(
                (selectedOption) => !(selectedOption.id === id && selectedOption.action === action && selectedOption.option_type === option_type && selectedOption.expiry === expiry && selectedOption.segment === segment)
            );
            return updatedOptions;
        });
    };

    // const handleButtonClick = (id, rowIndex, option, type, expiry, strike, segment, entry_price, stock, expiryList, delta, gamma, theta, vega, int_val, ext_val, iv, strike_list, expiry_strike_list) => {
    //     if (type === 'call') {
    //         const isSelected = callSelectedOptions.some(
    //             (selectedOption) => selectedOption.index === rowIndex && selectedOption.option === option && selectedOption.expiry === expiry && selectedOption.segment === segment
    //         );
    //         if (isSelected) {
    //             handleButtonUnselect(rowIndex, option, type, expiry);
    //         } else {
    //             handleButtonSelect(id, rowIndex, option, type, expiry, strike, segment, entry_price, 'CE', stock, expiryList, delta, gamma, theta, vega, int_val, ext_val, iv, strike_list, expiry_strike_list);
    //         }
    //     } else if (type === 'put') {
    //         const isSelected = putSelectedOptions.some(
    //             (selectedOption) => selectedOption.index === rowIndex && selectedOption.option === option && selectedOption.expiry === expiry && selectedOption.segment === segment
    //         );

    //         if (isSelected) {
    //             handleButtonUnselect(rowIndex, option, type, expiry);
    //         } else {
    //             handleButtonSelect(id, rowIndex, option, type, expiry, strike, segment, entry_price, 'PE', stock, expiryList, delta, gamma, theta, vega, int_val, ext_val, iv, strike_list, expiry_strike_list);
    //         }
    //     }
    // }

    // const handleButtonUnselect = (rowIndex, action, type, expiry) => {
    //     if (type === 'call') {
    //         setCallSelectedOptions((prevSelectedOptions) => {
    //             const updatedOptions = prevSelectedOptions.filter(
    //                 (selectedOption) => !(selectedOption.index === rowIndex && selectedOption.option === option && selectedOption.expiry === expiry)
    //             );
    //             return updatedOptions;
    //         });
    //     } else if (type === 'put') {
    //         setPutSelectedOptions((prevSelectedOptions) => {
    //             const updatedOptions = prevSelectedOptions.filter(
    //                 (selectedOption) => !(selectedOption.index === rowIndex && selectedOption.option === option && selectedOption.expiry === expiry)
    //             );
    //             return updatedOptions;
    //         });
    //     }
    // };

    // const handleFutureButtonSelect = (id, rowIndex, option, segment, expiry, entry_price, stock, futExpList) => {
    //     setFutureSelectedOptions((prevSelectedOptions) => {
    //         const updatedOptions = prevSelectedOptions.filter(
    //             (selectedOption) => !(selectedOption.index === rowIndex && selectedOption.expiry === expiry)
    //         );
    //         updatedOptions.push({ row_id: id, index: rowIndex, option: option, lot: 1, expiry: expiry, segment: segment, entry_price: entry_price, stock: stock, futExpList: futExpList });
    //         return updatedOptions;
    //     });
    // };

    const handleFutureButtonSelect = (id, action, option_type, expiry, segment, entry_price, stock, futExpList, expiry_id_dict) => {
        setAllSelectedOptions((prevSelectedOptions) => {
            const updatedOptions = prevSelectedOptions.filter(
                (selectedOption) => !(selectedOption.id === id && selectedOption.option_type === option_type && selectedOption.expiry === expiry && selectedOption.segment === segment)
            );
            updatedOptions.push({id: id, action: action, option_type: option_type, lot: 1, expiry: expiry, segment: segment, entry_price: entry_price, stock: stock, futExpList: futExpList, expiry_id_dict: expiry_id_dict });
            return updatedOptions;
        });
    };

    // handleFutureButtonClick(row.id, rowIndex, 'BUY', 'fut', row.expiry_date, row.last_price, index, futureExpiryDates.map((entry) => entry.exp))
    const handleFutureButtonClick = (id, action, option_type, expiry, segment, entry_price, stock, futExpList, expiry_id_dict) => {
        const isSelected = allSelectedOptions.some(
            (selectedOption) => selectedOption.id === id && selectedOption.action === action && selectedOption.option_type === option_type && selectedOption.expiry === expiry && selectedOption.segment === segment
        );
        if (isSelected) {
            handleFutureButtonUnselect(id, action, option_type, expiry, segment);
        } else {
            handleFutureButtonSelect(id, action, option_type, expiry, segment, entry_price, stock, futExpList, expiry_id_dict);
        }
    }

    const handleFutureButtonUnselect = (id, action, option_type, expiry, segment) => {
        setAllSelectedOptions((prevSelectedOptions) => {
            const updatedOptions = prevSelectedOptions.filter(
                (selectedOption) => !(selectedOption.id === id && selectedOption.action === action && selectedOption.option_type === option_type && selectedOption.expiry === expiry && selectedOption.segment === segment)
            );
            return updatedOptions;
        });
    };
    // const handleFutureButtonClick = (id, rowIndex, option, segment, expiry, entry_price, stock, futExpList) => {
    //     const isSelected = futureSelectedOptions.some(
    //         (selectedOption) => selectedOption.index === rowIndex && selectedOption.option === option && selectedOption.expiry === expiry
    //     );
    //     if (isSelected) {
    //         handleFutureButtonUnselect(rowIndex, option, segment, expiry);
    //     } else {
    //         handleFutureButtonSelect(id, rowIndex, option, segment, expiry, entry_price, stock, futExpList);
    //     }
    // }

    // const handleFutureButtonUnselect = (rowIndex, option, segment, expiry) => {
    //     setFutureSelectedOptions((prevSelectedOptions) => {
    //         const updatedOptions = prevSelectedOptions.filter(
    //             (selectedOption) => !(selectedOption.index === rowIndex && selectedOption.expiry === expiry)
    //         );
    //         return updatedOptions;
    //     });
    // };


    // row.id, e.target.value, 'call', optionExpiry, optFutToggle
    const handleNumberChange = (id, value, option_type, expiry, segment) => {
        console.log(id, value,option_type,expiry, segment )
        setAllSelectedOptions((prevSelectedOptions) => {
            const updatedOptions = prevSelectedOptions.map((selectedOption) => {
                if (selectedOption.id === id && selectedOption.expiry === expiry && selectedOption.option_type === option_type && selectedOption.segment === segment) {
                    return { ...selectedOption, lot: value };
                }
                return selectedOption;
            });
            return updatedOptions;
        });
    };

    // const handleNumberChange = (rowIndex, value, type, expiry) => {
    //     if (type === 'call') {
    //         setCallSelectedOptions((prevSelectedOptions) => {
    //             const updatedOptions = prevSelectedOptions.map((selectedOption) => {
    //                 if (selectedOption.index === rowIndex && selectedOption.expiry === expiry) {
    //                     return { ...selectedOption, lot: value };
    //                 }
    //                 return selectedOption;
    //             });
    //             return updatedOptions;
    //         });
    //     } else if (type === 'put') {
    //         setPutSelectedOptions((prevSelectedOptions) => {
    //             const updatedOptions = prevSelectedOptions.map((selectedOption) => {
    //                 if (selectedOption.index === rowIndex && selectedOption.expiry === expiry) {
    //                     return { ...selectedOption, lot: value };
    //                 }
    //                 return selectedOption;
    //             });
    //             return updatedOptions;
    //         });
    //     }
    // };

    // const handleFutureNumberChange = (rowIndex, value, segment, expiry) => {
    //     setFutureSelectedOptions((prevSelectedOptions) => {
    //         const updatedOptions = prevSelectedOptions.map((selectedOption) => {
    //             if (selectedOption.index === rowIndex && selectedOption.expiry === expiry) {
    //                 return { ...selectedOption, lot: value };
    //             }
    //             return selectedOption;
    //         });
    //         return updatedOptions;
    //     });
    // };

    // const isOptionSelected = (rowIndex, option, type, expiry) => {
    //     if (type === 'call') {
    //         return callSelectedOptions.some(
    //             (selectedOption) => selectedOption.index === rowIndex && selectedOption.option === option && selectedOption.expiry === expiry
    //         );
    //     } else if (type === 'put') {
    //         return putSelectedOptions.some(
    //             (selectedOption) => selectedOption.index === rowIndex && selectedOption.option === option && selectedOption.expiry === expiry
    //         );
    //     }
    //     return false;
    // };
    const isOptionSelected = (id, action, option_type, expiry, segment) => {
        return allSelectedOptions.some(
            (selectedOption) => selectedOption.id === id && selectedOption.action === action && selectedOption.option_type === option_type && selectedOption.expiry === expiry && selectedOption.segment === segment
        );
    };

    const isFutureSelected = (rowIndex, option, segment, expiry) => {
        return futureSelectedOptions.some(
            (selectedOption) => selectedOption.index === rowIndex && selectedOption.option === option && selectedOption.expiry === expiry
        );
    };



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
                                    style={{ minWidth: column.minWidth, fontSize: 12 }}
                                    sx={{
                                        padding: "2px 2px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {column.label}
                                </TableCell>)
                            )}
                        </TableRow>
                    </TableHead>
                    {optFutToggle === 'opt' ?
                        <TableBody>
                            {optionChainTable
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
                                                            height: '35px',
                                                            backgroundColor: row.strike_price < atmstrike && column.parent === 'ce' ? '#e7e6e6' : row.strike_price > atmstrike && column.parent === 'pe' ? '#e7e6e6' : row.strike_price === atmstrike || column.id === 'strike_price' ? '#f7f7a3' : '',
                                                        }}>
                                                        <div className='m-1 rounded' style={column.id === 'ce_build_up' ? { backgroundColor: row.ce_color } : column.id === 'pe_build_up' ? { backgroundColor: row.pe_color } : { backgroundColor: '' }} >
                                                            {/* {value} */}
                                                            {column.id === 'ce_oi_bar' ? '' : column.id === 'pe_oi_bar' ? '' : (column.id === 'ce_action') ? (
                                                                <div >
                                                                    <Button
                                                                        // variant={isOptionSelected(rowIndex, 'BUY', 'call', optionExpiry) ? 'contained' : 'outlined'}
                                                                        // (id, action, option_type, expiry, segment)
                                                                        variant={isOptionSelected(row.id, 'BUY', 'CE', optionExpiry, 'opt') ? 'contained' : 'outlined'}

                                                                        color='success'
                                                                        style={{ maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px', marginRight: '1px' }}
                                                                        // onClick={() => handleButtonClick(row.id, rowIndex, 'BUY', 'call', optionExpiry, row.strike_price, optFutToggle, row.ce_last_price, index, optionsExpiryDates.map((entry) => entry.exp), row.ce_delta, row.ce_gamma, row.ce_theta, row.ce_vega, row.ce_intrinsic_value, row.ce_time_value, row.ce_iv_calculated, optionStrikeList, allExpiryStrikeList)}
                                                                        onClick={() => handleButtonClick(row.id, 'BUY', 'CE', optionExpiry, optFutToggle, row.strike_price, row.ce_last_price, index, optionsExpiryDates.map((entry) => entry.exp), row.ce_delta, row.ce_gamma, row.ce_theta, row.ce_vega, row.ce_intrinsic_value, row.ce_time_value, row.ce_iv_calculated, optionStrikeList, allExpiryStrikeList, expiryStrikeIdDict)}
                                                                    >
                                                                        B
                                                                    </Button>
                                                                    <Button
                                                                        // variant={isOptionSelected(rowIndex, 'SELL', 'call', optionExpiry) ? 'contained' : 'outlined'}
                                                                        variant={isOptionSelected(row.id, 'SELL', 'CE', optionExpiry, 'opt') ? 'contained' : 'outlined'}
                                                                        color='error'
                                                                        style={{ maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px' }}
                                                                        // onClick={() => handleButtonClick(row.id, rowIndex, 'SELL', 'call', optionExpiry, row.strike_price, optFutToggle, row.ce_last_price, index, optionsExpiryDates.map((entry) => entry.exp), row.ce_delta, row.ce_gamma, row.ce_theta, row.ce_vega, row.ce_intrinsic_value, row.ce_time_value, row.ce_iv_calculated, optionStrikeList, allExpiryStrikeList)}
                                                                        onClick={() => handleButtonClick(row.id, 'SELL', 'CE', optionExpiry, optFutToggle, row.strike_price, row.ce_last_price, index, optionsExpiryDates.map((entry) => entry.exp), row.ce_delta, row.ce_gamma, row.ce_theta, row.ce_vega, row.ce_intrinsic_value, row.ce_time_value, row.ce_iv_calculated, optionStrikeList, allExpiryStrikeList, expiryStrikeIdDict)}

                                                                    >
                                                                        S
                                                                    </Button>
                                                                    {isOptionSelected(row.id, 'BUY', 'CE', optionExpiry, 'opt') || isOptionSelected(row.id, 'SELL', 'CE', optionExpiry, 'opt') ? (
                                                                        <div className='mt-2 mb-2'>
                                                                            <strong>Lot: &nbsp;</strong>
                                                                            <Select
                                                                                sx={{ fontSize: '10px' }}
                                                                                // value={
                                                                                //     callSelectedOptions.find((selectedOption) => selectedOption.index === rowIndex && selectedOption.expiry === optionExpiry)
                                                                                //         ?.lot || 1
                                                                                // }
                                                                                value={
                                                                                    allSelectedOptions.find((selectedOption) => selectedOption.id === row.id && selectedOption.expiry === optionExpiry && selectedOption.option_type === 'CE' && selectedOption.segment === optFutToggle)
                                                                                        ?.lot || 1
                                                                                }
                                                                                style={{ maxWidth: '70px', maxHeight: '20px', minWidth: '70px', minHeight: '20px' }}
                                                                                // onChange={(e) => handleNumberChange(rowIndex, e.target.value, 'call', optionExpiry)}
                                                                                onChange={(e) => handleNumberChange(row.id, e.target.value, 'CE', optionExpiry, optFutToggle)}
                                                                            >
                                                                                {Array.from({ length: 150 }, (_, index) => index + 1).map((number) => (
                                                                                    <MenuItem key={number} value={number} sx={{ fontSize: '10px' }}>
                                                                                        {number}
                                                                                    </MenuItem>
                                                                                ))}
                                                                            </Select>
                                                                        </div>
                                                                    ) : null}
                                                                </div>) : (column.id === 'pe_action') ? (
                                                                    <div >
                                                                        <Button
                                                                            // variant={isOptionSelected(rowIndex, 'BUY', 'put', optionExpiry) ? 'contained' : 'outlined'}
                                                                            // variant={isOptionSelected(rowIndex, 'BUY', 'put', optionExpiry) ? 'contained' : 'outlined'}
                                                                            variant={isOptionSelected(row.id, 'BUY', 'PE', optionExpiry, 'opt') ? 'contained' : 'outlined'}
                                                                            color='success'
                                                                            style={{ maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px', marginRight: '1px' }}
                                                                            // onClick={() => handleButtonClick(row.id, rowIndex, 'BUY', 'put', optionExpiry, row.strike_price, optFutToggle, row.pe_last_price, index, optionsExpiryDates.map((entry) => entry.exp), row.pe_delta, row.pe_gamma, row.pe_theta, row.pe_vega, row.pe_intrinsic_value, row.pe_time_value, row.pe_iv_calculated, optionStrikeList, allExpiryStrikeList)}
                                                                            // onClick={() => handleButtonClick(row.id, rowIndex, 'BUY', 'put', optionExpiry, row.strike_price, optFutToggle, row.pe_last_price, index, optionsExpiryDates.map((entry) => entry.exp), row.pe_delta, row.pe_gamma, row.pe_theta, row.pe_vega, row.pe_intrinsic_value, row.pe_time_value, row.pe_iv_calculated, optionStrikeList, allExpiryStrikeList)}
                                                                            onClick={() => handleButtonClick(row.id, 'BUY', 'PE', optionExpiry, optFutToggle, row.strike_price, row.pe_last_price, index, optionsExpiryDates.map((entry) => entry.exp), row.pe_delta, row.pe_gamma, row.pe_theta, row.pe_vega, row.pe_intrinsic_value, row.pe_time_value, row.pe_iv_calculated, optionStrikeList, allExpiryStrikeList, expiryStrikeIdDict)}

                                                                        >
                                                                            B
                                                                        </Button>
                                                                        <Button
                                                                            // variant={isOptionSelected(rowIndex, 'SELL', 'put', optionExpiry) ? 'contained' : 'outlined'}
                                                                            // variant={isOptionSelected(rowIndex, 'SELL', 'put', optionExpiry) ? 'contained' : 'outlined'}
                                                                            variant={isOptionSelected(row.id, 'SELL', 'PE', optionExpiry, 'opt') ? 'contained' : 'outlined'}
                                                                            color='error'
                                                                            style={{ maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px' }}
                                                                            // onClick={() => handleButtonClick(row.id, rowIndex, 'SELL', 'put', optionExpiry, row.strike_price, optFutToggle, row.pe_last_price, index, optionsExpiryDates.map((entry) => entry.exp), row.pe_delta, row.pe_gamma, row.pe_theta, row.pe_vega, row.pe_intrinsic_value, row.pe_time_value, row.pe_iv_calculated, optionStrikeList, allExpiryStrikeList)}
                                                                            // onClick={() => handleButtonClick(row.id, rowIndex, 'SELL', 'put', optionExpiry, row.strike_price, optFutToggle, row.pe_last_price, index, optionsExpiryDates.map((entry) => entry.exp), row.pe_delta, row.pe_gamma, row.pe_theta, row.pe_vega, row.pe_intrinsic_value, row.pe_time_value, row.pe_iv_calculated, optionStrikeList, allExpiryStrikeList)}
                                                                            onClick={() => handleButtonClick(row.id, 'SELL', 'PE', optionExpiry, optFutToggle, row.strike_price, row.pe_last_price, index, optionsExpiryDates.map((entry) => entry.exp), row.pe_delta, row.pe_gamma, row.pe_theta, row.pe_vega, row.pe_intrinsic_value, row.pe_time_value, row.pe_iv_calculated, optionStrikeList, allExpiryStrikeList, expiryStrikeIdDict)}

                                                                        >
                                                                            S
                                                                        </Button>
                                                                        {isOptionSelected(row.id, 'BUY', 'PE', optionExpiry, 'opt') || isOptionSelected(row.id, 'SELL', 'PE', optionExpiry, 'opt') ? (
                                                                            <div className='mt-2 mb-2'>
                                                                                <strong>Lot: &nbsp;</strong>
                                                                                <Select
                                                                                    sx={{ fontSize: '10px' }}
                                                                                    // value={
                                                                                    //     putSelectedOptions.find((selectedOption) => selectedOption.index === rowIndex && selectedOption.expiry === optionExpiry)
                                                                                    //         ?.lot || 1
                                                                                    // }
                                                                                    value={
                                                                                        allSelectedOptions.find((selectedOption) => selectedOption.id === row.id && selectedOption.expiry === optionExpiry && selectedOption.option_type === 'PE' && selectedOption.segment === optFutToggle)
                                                                                            ?.lot || 1
                                                                                    }
                                                                                    style={{ maxWidth: '70px', maxHeight: '20px', minWidth: '70px', minHeight: '20px' }}
                                                                                    // onChange={(e) => handleNumberChange(rowIndex, e.target.value, 'put', optionExpiry)}
                                                                                    onChange={(e) => handleNumberChange(row.id, e.target.value, 'PE', optionExpiry, optFutToggle)}

                                                                                >
                                                                                    {Array.from({ length: 150 }, (_, index) => index + 1).map((number) => (
                                                                                        <MenuItem key={number} value={number} sx={{ fontSize: '10px' }}>
                                                                                            {number}
                                                                                        </MenuItem>
                                                                                    ))}
                                                                                </Select>
                                                                            </div>
                                                                        ) : null}
                                                                    </div>) : value}

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
                        </TableBody> :
                        <TableBody>
                            {futureChainTable
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
                                                            height: '35px',
                                                        }}>
                                                        <div className='m-1 rounded'>
                                                            {/* {value} */}
                                                            {column.id === 'ce_action' ? (
                                                                <div >
                                                                    <Button
                                                                        // variant={isFutureSelected(rowIndex, 'BUY', 'fut', row.expiry_date) ? 'contained' : 'outlined'}
                                                                        variant={isOptionSelected(row.id, 'BUY', 'futures', row.expiry_date , 'fut') ? 'contained' : 'outlined'}
                                                                        color='success'
                                                                        style={{ maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px', marginRight: '1px' }}
                                                                        // id, action, option_type, expiry, segment, entry_price, stock, futExpList
                                                                        // onClick={() => handleFutureButtonClick(row.id, rowIndex, 'BUY', 'fut', row.expiry_date, row.last_price, index, futureExpiryDates.map((entry) => entry.exp))}
                                                                        onClick={() => handleFutureButtonClick(row.id, 'BUY', 'futures', row.expiry_date, optFutToggle, row.last_price, index, futureExpiryDates.map((entry) => entry.exp), expiryIdDict)}
                                                                    >
                                                                        B
                                                                    </Button>
                                                                    <Button
                                                                        // variant={isFutureSelected(rowIndex, 'SELL', 'fut', row.expiry_date) ? 'contained' : 'outlined'}
                                                                        variant={isOptionSelected(row.id, 'SELL', 'futures', row.expiry_date , 'fut') ? 'contained' : 'outlined'}
                                                                        color='error'
                                                                        style={{ maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px' }}
                                                                        // onClick={() => handleFutureButtonClick(row.id, rowIndex, 'SELL', 'fut', row.expiry_date, row.last_price, index, futureExpiryDates.map((entry) => entry.exp))}
                                                                        onClick={() => handleFutureButtonClick(row.id, 'SELL', 'futures', row.expiry_date, optFutToggle, row.last_price, index, futureExpiryDates.map((entry) => entry.exp), expiryIdDict)}

                                                                    >
                                                                        S
                                                                    </Button>
                                                                    {isOptionSelected(row.id, 'BUY', 'futures', row.expiry_date , 'fut') || isOptionSelected(row.id, 'SELL', 'futures', row.expiry_date , 'fut') ? (
                                                                        <div className='mt-2 mb-2'>
                                                                            <strong>Lot: &nbsp;</strong>
                                                                            <Select
                                                                                sx={{ fontSize: '10px' }}
                                                                                // value={
                                                                                //     futureSelectedOptions.find((selectedOption) => selectedOption.index === rowIndex && selectedOption.expiry === row.expiry_date)
                                                                                //         ?.lot || 1
                                                                                // }
                                                                                // allSelectedOptions.find((selectedOption) => selectedOption.id === row.id && selectedOption.expiry === optionExpiry && selectedOption.option_type === 'put' && selectedOption.segment === optFutToggle)
                                                                                value={
                                                                                    allSelectedOptions.find((selectedOption) => selectedOption.id === row.id && selectedOption.expiry === row.expiry_date && selectedOption.option_type === 'futures' && selectedOption.segment === optFutToggle)
                                                                                        ?.lot || 1
                                                                                }
                                                                                style={{ maxWidth: '70px', maxHeight: '20px', minWidth: '70px', minHeight: '20px' }}
                                                                                // onChange={(e) => handleFutureNumberChange(rowIndex, e.target.value, 'fut', row.expiry_date)}
                                                                                onChange={(e) => handleNumberChange(row.id, e.target.value, 'futures', row.expiry_date, optFutToggle)}

                                                                            >
                                                                                {Array.from({ length: 150 }, (_, index) => index + 1).map((number) => (
                                                                                    <MenuItem key={number} value={number} sx={{ fontSize: '10px' }}>
                                                                                        {number}
                                                                                    </MenuItem>
                                                                                ))}
                                                                            </Select>
                                                                        </div>
                                                                    ) : null}
                                                                </div>) : value}
                                                        </div>
                                                    </TableCell>)
                                            })}
                                        </TableRow>
                                    )
                                })}
                        </TableBody>}
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
