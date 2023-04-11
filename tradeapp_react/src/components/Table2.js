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


    const data1 = props.position
    const navigate = useNavigate();


    const editHandle = (e) => {
    }

    const exitHandle = (e) => {
        setOpen(true)
        setDataIdOnExit(e.currentTarget.getAttribute("data-id"))
    }

    async function submitHandle() {
        console.log('----------------',modalValue)
        console.log('----------------',dataIdOnExit)
        const data = {
            'id': dataIdOnExit,
            'exit_price': modalValue
        }
        const req_update = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/position',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        setOpen(false)
        navigate(0)

        // console.log(e.currentTarget.getAttribute("data-id"))
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

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 50 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Symbol</TableCell>
                            <TableCell align="center">Delta</TableCell>
                            <TableCell align="center">Gamma</TableCell>
                            <TableCell align="center">Theta</TableCell>
                            <TableCell align="center">Vega</TableCell>
                            <TableCell align="center">Intrinsic Value</TableCell>
                            <TableCell align="center">Extrinsic Value</TableCell>
                            <TableCell align="center">Entry Price</TableCell>
                            <TableCell align="center">Current Price</TableCell>
                            <TableCell align="center">Exit Price</TableCell>
                            <TableCell align="center">P&L</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data1.map((row) => (
                            <TableRow
                                hover={true}
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {/* <TableCell sx={{ width: 5 }} size="small" component="th" scope="row">
                                {row.name}
                            </TableCell> */}
                                {/* <TableCell size="small" align="left">+{row.quantity}x</TableCell> */}
                                <TableCell size="small" align="left">{row.action === 'BUY' ? <Chip sx={{ borderRadius: 1 }} size='small' label='B' color="success" /> : <Chip sx={{ borderRadius: 1 }} size='small' label='S' color="error" />}
                                    <span> </span>{row.index}-{row.strike}{row.option_type}-{row.expiry}</TableCell>
                                <TableCell size="small" align="center">{row.delta}</TableCell>
                                <TableCell size="small" align="center">{row.gamma}</TableCell>
                                <TableCell size="small" align="center">{row.theta}</TableCell>
                                <TableCell size="small" align="center">{row.vega}</TableCell>
                                <TableCell size="small" align="center">{row.intrinsic_value}</TableCell>
                                <TableCell size="small" align="center">{row.extrinsic_value}</TableCell>
                                <TableCell size="small" align="center">{row.entry_price}</TableCell>
                                <TableCell size="small" align="center">{row.current_price}</TableCell>
                                <TableCell size="small" align="center">{row.exit_price}</TableCell>
                                <TableCell size="small" align="center" style={row.profit_loss > 0 ? { color: 'green' } : { color: 'red' }}>{row.profit_loss}</TableCell>
                                <TableCell size="small" align="center">{row.is_open === true ? <BadgeGreen /> : <BadgeRed />}</TableCell>
                                {/* <TableCell size="small" align="left">{row.expiry}</TableCell> */}

                                <TableCell size="small" align="right">
                                    <a data-id={row.id} data-exp={row.expiry_date} onClick={editHandle}><Edit color="primary" className="icon1" /></a>
                                    <a data-id={row.id} data-exp={row.expiry_date} onClick={closeHandle}><DeleteIcon color="error" className="icon1" /></a>
                                    <a data-id={row.id} data-exp={row.expiry_date} onClick={exitHandle}><ExitToAppIcon color="warning" className="icon1" /></a>
                                </TableCell>
                                {/* <TableCell size="small" align="left"><a data-id={row.id} data-exp={row.expiry_date} onClick={closeHandle}><Close sx={{ color: "red" }} className="icon1" /></a></TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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
