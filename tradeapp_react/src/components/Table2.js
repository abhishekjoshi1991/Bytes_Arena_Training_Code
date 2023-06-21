import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Edit from "@mui/icons-material/Edit";
import Close from "@mui/icons-material/Close";
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BadgeGreen from './BadgeGreen';
import BadgeRed from './BadgeRed';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import RefreshIcon from '@mui/icons-material/Refresh';
import Tooltip from '@mui/material/Tooltip';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px transparent #000',
    boxShadow: 24,
    p: 4,
};

export default function Table2(props) {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [modalValue, setModalValue] = useState()
    const [dataIdOnExit, setDataIdOnExit] = useState()
    const [localTableData, setLocalTableData] = useState([]);
    const [strikeStep, setStrikeStep] = useState('50');
    const [expiryDropdown, setExpiryDropdown] = useState([]);
    const [futureExpiryDropdown, setFutureExpiryDropdown] = useState([]);
    const [lotMultiplier, setLotMultiplier] = useState(1);
    const [maxStrike, setMaxStrike] = useState(20000);
    const [minStrike, setMinStrike] = useState(16000);
    const [exitValue, setExitValue] = useState(0);

    useEffect(() => {
        setLocalTableData(props.position);
        setExpiryDropdown(props.expiry);
        setFutureExpiryDropdown(props.futureExpiry)
        setLotMultiplier(1)

    }, [props]);

    // const data1 = props.position
    console.log('=============', localTableData)
    const navigate = useNavigate();

    const theme = createTheme({
        palette: {

            secondary: {
                // This is green.A700 as hex.
                main: '#FFFFFF',
            },
        },
    });

    const exitHandle = (e) => {
        setOpen(true)
        setDataIdOnExit(e.currentTarget.getAttribute("data-id"))
    }

    async function submitHandle() {
        const data = {
            'id': dataIdOnExit,
            'exit_price': modalValue
        }
        const req_update = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/position', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        setOpen(false)
        navigate(0)
    }

    async function closeHandle(e) {
        const data = e.currentTarget.getAttribute("data-id")
        const req_delete_data = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/position', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const res_delete_data = await req_delete_data.json()
        if (res_delete_data) {
            const get_left_data = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/position')
            const left_data = await get_left_data.json()
            props.handleTableCallback(left_data)
        }
    }

    // Strike Cell Increment Decrement Handle
    const handleStrikeDecrement = (id) => {
        console.log(id)
        const updatedData = localTableData.map((row) => {
            if (row.id === id) {
                return { ...row, strike: row.strike - Number(strikeStep) };
            }
            return row;
        });
        setLocalTableData(updatedData);
    };

    const handleStrikeIncrement = (id) => {
        const updatedData = localTableData.map((row) => {

            if (row.id === id) {
                console.log(row.strike)

                return { ...row, strike: row.strike + Number(strikeStep) };
            }
            return row;
        });
        setLocalTableData(updatedData);
    };

    // Lot Cell Increment Decrement Handle
    const handleLotDecrement = (id) => {
        console.log(id)
        const updatedData = localTableData.map((row) => {
            if (row.id === id) {
                return { ...row, quantity: row.quantity - 1 };
            }
            return row;
        });
        setLocalTableData(updatedData);
    };

    const handleLotIncrement = (id) => {
        const updatedData = localTableData.map((row) => {
            if (row.id === id) {
                return { ...row, quantity: row.quantity + 1 };
            }
            return row;
        });
        setLocalTableData(updatedData);
    };

    const handleDropdownChange = (id, value) => {
        console.log(id)
        console.log(value)
        // const updatedData = tableData.map((row) => {
        //   if (row.id === id) {
        //     return { ...row, dropdown: value };
        //   }
        //   return row;
        // });
        // setTableData(updatedData);
    };

    const handleEntryPriceCellChange = (id, value) => {
        console.log(id)
        // const updatedData = tableData.map((row) => {
        //   if (row.id === id) {
        //     return { ...row, editableCell: value };
        //   }
        //   return row;
        // });
        // setTableData(updatedData);
    };

    const handleActionSwitch = (id) => {
        const updatedData = localTableData.map((row) => {
            if (row.id === id) {
                const newContent = row.action === 'BUY' ? 'SELL' : 'BUY';
                return { ...row, action: newContent };
            }
            return row;
        });
        setLocalTableData(updatedData);
    };

    const handleOptionSwitch = (id) => {
        const updatedData = localTableData.map((row) => {
            if (row.id === id) {
                const newContent = row.option_type === 'CE' ? 'PE' : 'CE';
                return { ...row, option_type: newContent };
            }
            return row;
        });
        setLocalTableData(updatedData);
    };

    const handleLotMultiplierDec = () => {
        console.log(lotMultiplier)
        const new_multiplier = lotMultiplier - 1
        setLotMultiplier(new_multiplier)
        const updatedData = localTableData.map((row) => ({
            ...row,
            quantity: row.quantity * new_multiplier
        }));
        setLocalTableData(updatedData);
    };

    const handleLotMultiplierInc = () => {
        console.log(lotMultiplier)
        const new_multiplier = lotMultiplier + 1
        setLotMultiplier(new_multiplier)
        const updatedData = localTableData.map((row) => ({
            ...row,
            quantity: row.quantity * new_multiplier
        }));
        setLocalTableData(updatedData);
    };

    const resetMultiplier = () => {
        console.log(lotMultiplier)
        setLotMultiplier(1)
        const updatedData = localTableData.map((row) => ({
            ...row,
            quantity: row.quantity / lotMultiplier
        }));
        setLocalTableData(updatedData);
    };

    const handleExitInputChange = (event, id) => {
        console.log('=========', event)
        // const { value } = event.target;
        // const updatedData = localTableData.map((row) => {
        //   if (row.id === id) {
        //     return { ...row, exit: value };
        //   }
        //   return row;
        // });
        // setLocalTableData(updatedData);
    };

    const handleExitButtonClick = (id) => {
        const updatedData = localTableData.map((row) => {
            if (row.id === id) {
                console.log('happens')
                return { ...row, show_exit_field: true };
            }
            return row;
        });
        setLocalTableData(updatedData);
    };

    const handleCancelButtonClick = (id) => {
        const updatedData = localTableData.map((row) => {
            if (row.id === id) {
                return { ...row, show_exit_field: false };
            }
            return row;
        });
        setLocalTableData(updatedData);
    };

    const handleSaveButtonClick = (id) => {
        console.log(exitValue)
        const updatedData = localTableData.map((row) => {
            if (row.id === id) {
                if (exitValue === '' || exitValue < 0) {
                    alert('Please Enter Valid Value for Exit Price')
                }
                else {
                    return { ...row, exit_price: exitValue, show_exit_field: false };
                }
            }
            return row;
        });
        setLocalTableData(updatedData);
    };


    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1000 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Option</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Expiry</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Strike</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Lots</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Delta</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Gamma</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Theta</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Vega</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Intrinsic Value</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Extrinsic Value</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Entry Price</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Current Price</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Exit Price</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">P&L</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Status</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {localTableData.map((row) => (
                            <React.Fragment key={row.id}>
                                <TableRow


                                    hover={true}
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {/* <TableCell sx={{ width: 5 }} size="small" component="th" scope="row">
                                {row.name}
                            </TableCell> */}
                                    {/* <TableCell size="small" align="left">+{row.quantity}x</TableCell> */}
                                    {/* <TableCell size="small" align="left">{row.action === 'BUY' ? <Chip sx={{ borderRadius: 1 }} size='small' label='B' color="success" /> : <Chip sx={{ borderRadius: 1 }} size='small' label='S' color="error" />} */}
                                    {/* </TableCell> */}
                                    {/* <div class="position__strike"><button class="sign_btn">-</button><TableCell size="small" align="center">{row.quantity}</TableCell><button class="mr-1">CE</button><button class="sign_btn">+</button></div> */}



                                    <TableCell style={{ minWidth: 20 }} size="small" align="center">
                                        {row.action === 'BUY' ? <div onClick={() => handleActionSwitch(row.id)}>
                                            <Chip style={{ cursor: 'pointer' }} sx={{ borderRadius: 1 }} size='small' label='B' color="success" />
                                        </div> : <div onClick={() => handleActionSwitch(row.id)}>
                                            <Chip style={{ cursor: 'pointer' }} sx={{ borderRadius: 1 }} size='small' label='S' color="error" />
                                        </div>}
                                    </TableCell>



                                    <TableCell size="small" align="center">
                                        <div style={{ cursor: row.segment !== 'futures' ? 'pointer' : '' }} onClick={() => handleOptionSwitch(row.id)}>
                                            {row.segment === 'futures' ? 'Futures' : row.option_type}
                                        </div>
                                    </TableCell>

                                    <TableCell size="small" align="center">
                                        <select
                                            value={row.expiry}
                                            onChange={(e) =>
                                                handleDropdownChange(row.id, e.target.value)
                                            }
                                        >
                                            {JSON.parse(row.expiry_text.replace(/'/g, '"')).map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>))}
                                            {/* {(row.segment === 'options') ? expiryDropdown.map((option) => (
                                            <option key={option.id} value={option.exp}>
                                                {option.exp}
                                            </option>
                                        )) : futureExpiryDropdown.map((option) => (
                                            <option key={option.id} value={option.exp}>
                                                {option.exp}
                                            </option>
                                        ))} */}
                                        </select>
                                    </TableCell>

                                    <TableCell style={{ minWidth: 130 }} size="small" align="center">
                                        <div className="position__strike">
                                            {row.strike !== 0 ? <button disabled={row.strike === row.min_strike} className="sign_btn" onClick={() => handleStrikeDecrement(row.id)}>-</button> : ''}
                                            {row.strike !== 0 ? <span className='m-2'>{row.strike}</span> : '-'}
                                            {row.strike !== 0 ? <button disabled={row.strike === row.max_strike} className="sign_btn" onClick={() => handleStrikeIncrement(row.id)}>+</button> : ''}
                                        </div>
                                    </TableCell>

                                    <TableCell style={{ minWidth: 130 }} size="small" align="center">
                                        <div className="position__strike">
                                            <button className="sign_btn" disabled={row.quantity === 1} onClick={() => handleLotDecrement(row.id)}>-</button>
                                            <span className='m-2'>{row.quantity}</span>
                                            <button className="sign_btn" onClick={() => handleLotIncrement(row.id)}>+</button>
                                        </div>
                                    </TableCell>

                                    <TableCell size="small" align="center">{row.delta}</TableCell>
                                    <TableCell size="small" align="center">{row.segment !== 'futures' ? row.gamma : '-'}</TableCell>
                                    <TableCell size="small" align="center">{row.segment !== 'futures' ? row.theta : '-'}</TableCell>
                                    <TableCell size="small" align="center">{row.segment !== 'futures' ? row.vega : '-'}</TableCell>
                                    <TableCell size="small" align="center">{row.intrinsic_value}</TableCell>
                                    <TableCell size="small" align="center">{row.extrinsic_value}</TableCell>
                                    <TableCell size="small" align="center" >
                                        <input
                                            type="text"
                                            defaultValue={row.entry_price}
                                            style={{ width: '60px', textAlign: 'center' }}
                                            onChange={(e) =>
                                                handleEntryPriceCellChange(row.id, e.target.value)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell size="small" align="center">{row.current_price}</TableCell>
                                    <TableCell size="small" align="center">{row.exit_price}</TableCell>
                                    <TableCell size="small" align="center" style={row.profit_loss > 0 ? { color: 'green' } : { color: 'red' }}>{row.profit_loss}</TableCell>
                                    <TableCell size="small" align="center">{row.is_open === true ? <BadgeGreen /> : <BadgeRed />}</TableCell>
                                    {/* <TableCell size="small" align="left">{row.expiry}</TableCell> */}

                                    <TableCell size="small" align="right">
                                        {/* <a data-id={row.id} data-exp={row.expiry_date} onClick={editHandle}><Edit color="primary" className="icon1" /></a>
                                    <span> </span> */}
                                        <a data-id={row.id} data-exp={row.expiry_date} onClick={closeHandle}>
                                            <Tooltip title="Delete Position">
                                                <DeleteOutlineIcon color="error" className="icon1" />
                                            </Tooltip>
                                        </a>
                                        <span> </span>
                                        <a data-id={row.id} data-exp={row.expiry_date} onClick={() => handleExitButtonClick(row.id)}>
                                            <Tooltip title="Exit Position">
                                                <ExitToAppIcon color="warning" className="icon1" />
                                            </Tooltip>
                                        </a>
                                    </TableCell>
                                    {/* <TableCell size="small" align="left"><a data-id={row.id} data-exp={row.expiry_date} onClick={closeHandle}><Close sx={{ color: "red" }} className="icon1" /></a></TableCell> */}
                                </TableRow>
                                {row.show_exit_field && (
                                    <TableRow hover={true}>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell colSpan={6} className='text-end p-2'>
                                            Exit Price: &nbsp;
                                            <input
                                                defaultValue={row.exit_price}
                                                // className='mx-2'
                                                // placeholder='Exit Price'
                                                // onChange={(event) => handleExitInputChange(event, row.id)}
                                                onChange={(event) => setExitValue(event.target.value)}
                                                
                                            />
                                            <Button onClick={() => handleSaveButtonClick(row.id)} style={{ background: '#f0ad4e' }} size='small' className='mx-1'>
                                                <ThemeProvider theme={theme}>
                                                    <SaveAsIcon fontSize="small" color="secondary" className="icon1" />
                                                </ThemeProvider>
                                                &nbsp; <span style={{ color: 'white', fontWeight: 'bold' }}>Save</span>
                                            </Button>
                                            <Button onClick={() => handleCancelButtonClick(row.id)} style={{ background: '#f88880' }} size='small'>
                                                <ThemeProvider theme={theme}>
                                                    <ClearIcon fontSize="small" color="secondary" className="icon1" />
                                                </ThemeProvider>
                                                &nbsp; <span style={{ color: 'white', fontWeight: 'bold' }}>Cancel</span>
                                            </Button>

                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
                <div className='p-2'>
                    <i className='mx-2'>Lot Multiplier: </i>
                    <button className="sign_btn" disabled={lotMultiplier === 1} onClick={() => handleLotMultiplierDec()}>-</button>
                    <span className='m-2'>{lotMultiplier}</span>
                    <button className="sign_btn" onClick={() => handleLotMultiplierInc()}>+</button>
                    <a style={{ cursor: 'pointer' }} onClick={resetMultiplier}>
                        <Tooltip title="Reset">
                            <RefreshIcon color="info" className="icon1 p-1" />
                        </Tooltip>
                    </a>
                </div>
            </TableContainer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <TextField id="outlined-basic"
                            label="Exit Price" variant="outlined"
                            onChange={(e) => setModalValue(e.target.value)}
                        />
                    </div>
                    <div className='mt-2'>
                        <Button variant="contained" onClick={submitHandle} color='warning'>Exit Position</Button>

                    </div>

                </Box>
            </Modal>
        </div>
    );
}
