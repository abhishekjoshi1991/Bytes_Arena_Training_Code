// import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Edit from "@mui/icons-material/Edit";
import Close from "@mui/icons-material/Close";

export default function Table1(props) {
    const data1 = props.position

    const editHandle = (e) => {
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
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 50 }} size="small" aria-label="a dense table">
                <TableBody>
                    {data1.map((row) => (
                        <TableRow
                            hover={true}
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell sx={{ width: 5 }} size="small" component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell sx={{ width: 5 }} size="small" align="left">+{row.quantity}x</TableCell>
                            <TableCell sx={{ width: 100, padding: 0, margin: 0 }} size="small" align="left">{row.expiry}</TableCell>
                            <TableCell sx={{ width: 100, padding: 0, margin: 0 }} size="small" align="left">{row.strike}{row.option_type}</TableCell>
                            <TableCell size="small" align="left">{row.entry_price}</TableCell>
                            
                            <TableCell size="small" align="left"><a data-id={row.id} data-exp={row.expiry_date} onClick={editHandle}><Edit color="primary" className="icon1" /></a></TableCell>
                            <TableCell size="small" align="left"><a data-id={row.id} data-exp={row.expiry_date} onClick={closeHandle}><Close sx={{ color: "red" }} className="icon1" /></a></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
