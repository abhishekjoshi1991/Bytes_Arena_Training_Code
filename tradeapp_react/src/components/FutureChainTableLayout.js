import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';

export default function FutureChainTableLayout(props) {
    const [hiddenColumns, setHiddenColumns] = useState([]);


    const handleChange = (event) => {
        const { value } = event.target;
        setHiddenColumns(value);
    };

    const columns1 = [
        { id: 'expiry', label: '', minWidth: 170, span: 1, color: '#deebf7' },
        { id: 'lot_size', label: '', minWidth: 170, span: 1, color: '#deebf7' },
        { id: 'price', label: 'Price', minWidth: 170, span: 8, color: '#deebf7' },
        { id: 'open_int', label: 'Open Interest', minWidth: 100, span: 5, color: '#deebf7' },
    ]

    const columns = [
        { id: 'expiry_date', label: 'Expiry', minWidth: 5, color: '#deebf7' },
        { id: 'market_lot', label: 'Lot Size', minWidth: 5, color: '#deebf7' },
        { id: 'last_price', label: 'Price', minWidth: 5, color: '#deebf7' },
        { id: 'price_change', label: 'Price Change', minWidth: 5, color: '#deebf7' },
        { id: 'price_pchange', label: 'Price % Change', minWidth: 5, color: '#deebf7' },
        { id: 'atp', label: 'ATP/VWAP', minWidth: 5, color: '#deebf7' },
        { id: 'day_high_price', label: 'Day High', minWidth: 5, color: '#deebf7' },
        { id: 'day_low_price', label: 'Day Low', minWidth: 5, color: '#deebf7' },
        { id: 'oh', label: 'OH', minWidth: 5, color: '#deebf7' },
        { id: 'ol', label: 'OL', minWidth: 5, color: '#deebf7' },
        { id: 'build_up', label: 'Build-up', minWidth: 5, color: '#deebf7' },
        { id: 'open_interest', label: 'OI', minWidth: 5, color: '#deebf7' },
        { id: 'change_in_open_interest', label: 'OI Change', minWidth: 5, color: '#deebf7' },
        { id: 'pchange_open_interest', label: 'OI % Change', minWidth: 5, color: '#deebf7' },
        { id: 'num_of_contracts_traded', label: 'Volume', minWidth: 5, color: '#deebf7' },
    ];

    console.log(props.tableData)
    const rows = props.tableData

    return (

        <Paper sx={{ width: '100%' }}>
            <Select
                multiple
                value={hiddenColumns}
                onChange={handleChange}
                renderValue={(selected) => selected.join(', ')}
            >
                {columns1.map((column) => (
                    <MenuItem key={column.id} value={column.id}>
                        <Checkbox checked={!hiddenColumns.includes(column.id)} />
                        {column.label}
                    </MenuItem>
                ))}
            </Select>
            <TableContainer >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns1.map((column) => (
                                hiddenColumns.includes(column.id) ? null : (
                                    <TableCell
                                        key={column.id}
                                        align='center'
                                        colSpan={column.span}
                                        sx={{
                                            padding: "2px 2px",
                                            borderBottom: "1px solid #ffff66 ",
                                            border: column.id !== 'strike' ? "1px solid grey" : '',
                                            fontWeight: "bold",
                                            backgroundColor: column.color,
                                        }}
                                    // style={{ top: 57, minWidth: column.minWidth }}

                                    >
                                        {column.id !== 'strike' ? column.label : ''}
                                    </TableCell>)
                            ))}
                        </TableRow>
                        <TableRow>
                            {columns.map((column) => (
                                hiddenColumns.includes(column.id) ? null : (
                                    <TableCell
                                        key={column.id}
                                        align='center'
                                        // style={{ top: 57, minWidth: column.minWidth }}
                                        sx={{
                                            padding: "2px 2px",
                                            border: column.id !== 'strike_price' ? "1px solid grey" : '',
                                            fontWeight: "bold",
                                            backgroundColor: column.color,
                                            // align: 'center'
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>)
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                hiddenColumns.includes(column.id) ? null : (
                                                    <TableCell key={column.id} align='center' size='small' sx={{
                                                        padding: "0px 0px",
                                                        border: "1px solid #e0e0dc",
                                                        backgroundColor: column.id === 'build_up' ? row.build_up_color : '',
                                                    }}>
                                                        {value}
                                                    </TableCell>)
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                    {/* <TableFooter>
                        <TableRow>
                            <TableCell>Total</TableCell>
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
                            <TableCell align='center'>10000</TableCell>
                        </TableRow>
                    </TableFooter> */}
                </Table>
            </TableContainer>
        </Paper>
    );
}

