import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';


export default function FutureIntradaySingleStrikeLayout(props) {
    const [hiddenColumns, setHiddenColumns] = useState([]);


    const handleChange = (event) => {
        const { value } = event.target;
        setHiddenColumns(value);
    };

    const header_columns = [
        { id: 'time_inter', label: '', minWidth: 170, span: 1, color: '' },
        { id: 'fut_price', label: 'Price', minWidth: 170, span: 8, color: '#deebf7' },
        { id: 'fut_open_int', label: 'Open Interest', minWidth: 170, span: 4, color: '#deebf7' },
        { id: 'fut_volume', label: 'Volume', minWidth: 170, span: 1, color: '#deebf7' },
    ]

    const columns = [
        { id: 'time_interval', label: 'Time', minWidth: 5, color: '', parent: 'time'},
        { id: 'last_price', label: 'Price', minWidth: 5, color: '#deebf7', parent: 'future'},
        { id: 'price_change', label: 'Price Change', minWidth: 5, color: '#deebf7', parent: 'future'},
        { id: 'price_pchange', label: 'Price % Change', minWidth: 5, color: '#deebf7', parent: 'future'},
        { id: 'atp', label: 'ATP/VWAP', minWidth: 5, color: '#deebf7', parent: 'future'},
        { id: 'day_high', label: 'Day High', minWidth: 5, color: '#deebf7', parent: 'future'},
        { id: 'day_low', label: 'Day Low', minWidth: 5, color: '#deebf7', parent: 'future'},
        { id: 'oh', label: 'OH', minWidth: 5, color: '#deebf7', parent: 'future'},
        { id: 'ol', label: 'OL', minWidth: 5, color: '#deebf7', parent: 'future'},
        { id: 'build_up', label: 'Build-up', minWidth: 5, color: '#deebf7', parent: 'future'},
        { id: 'open_interest', label: 'OI', minWidth: 5, color: '#deebf7', parent: 'future'},
        { id: 'oi_change', label: 'OI Change', minWidth: 5, color: '#deebf7', parent: 'future'},
        { id: 'oi_pchange', label: 'OI % Change', minWidth: 5, color: '#deebf7', parent: 'future'},
        { id: 'num_of_contracts_traded', label: 'Volume', minWidth: 5, color: '#deebf7', parent: 'future'},
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
                {header_columns.map((column) => (
                    <MenuItem key={column.id} value={column.id}>
                        <Checkbox checked={!hiddenColumns.includes(column.id)} />
                        {column.label}
                    </MenuItem>
                ))}
            </Select>
            <TableContainer >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow >
                        <TableCell align="center" colSpan={1} sx={{
                            padding: "2px 2px",
                            border: "1px solid grey",
                            // backgroundColor: "#cc99ff",
                            fontWeight: "bold",
                            color: "white"
                        }}>
                                
                            </TableCell>
                        <TableCell align="center" colSpan={13} sx={{
                            padding: "2px 2px",
                            border: "1px solid grey",
                            backgroundColor: "#002060",
                            fontWeight: "bold",
                            color: "white"
                        }}>
                                Futures
                            </TableCell>
                            
                        </TableRow>
                        <TableRow>
                            {header_columns.map((column) => (
                                hiddenColumns.includes(column.id) ? null : (
                                    <TableCell
                                        key={column.id}
                                        align='center'
                                        colSpan={column.span}
                                        sx={{
                                            padding: "2px 2px",
                                            borderBottom: "1px solid #ffff66 ",
                                            border: column.id !=='strike' ? "1px solid grey" : '',
                                            fontWeight: "bold",
                                            backgroundColor: column.color,
                                            height: '35px'
                                        }}
                                    // style={{ top: 57, minWidth: column.minWidth }}
                                    
                                    >
                                        {column.id !=='strike' ? column.label : ''}
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
                                            border: column.id !=='strike_price' ? "1px solid grey" : '',
                                            fontWeight: "bold",
                                            backgroundColor: column.color,
                                            height:'35px'
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
                                                        height: '25px',
                                                        padding: "0px 0px",
                                                        border: "1px solid #e0e0dc",
                                                        // backgroundColor: column.id === 'ce_build_up' ? row.ce_color : column.id === 'pe_build_up' ? row.pe_color : '',
                                                        backgroundColor: row.ce_moneyness === 'ITM' && column.parent === 'ce' ? '#e7e6e6' : row.pe_moneyness === 'ITM' && column.parent === 'pe' ? '#e7e6e6' : '',
                                                        color: column.id === 'ce_changein_open_interest' && value > 0 ? "#ff0000" : column.id === 'ce_changein_open_interest' && value < 0 ? '#00cc00' : column.id === 'pe_changein_open_interest' && value > 0 ? '#00cc00' : column.id === 'pe_changein_open_interest' && value < 0 ? '#ff0000' : column.label === 'LTP Change' && value > 0 ? '#00cc00' : column.label === 'LTP Change' && value < 0 ? '#ff0000' : ''
                                                    }}><div style={column.id === 'build_up' ? {backgroundColor: row.color} : {backgroundColor: ''}} > {value}</div>
                                                       
                                                    </TableCell>)
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
