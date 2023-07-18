import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';


export default function OptionIntradayMultiStrikeLayout(props) {
    const [hiddenColumns, setHiddenColumns] = useState([]);

    const handleChange = (event) => {
        const { value } = event.target;
        setHiddenColumns(value);
    };
    const main_header_show = [
        { id: 'combo', label: 'CE & PE Combined', minWidth: 130, span: 4, color: '#c0004e', top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
    ]

    const main_header_columns = [
        { id: 'time', label: '', minWidth: 130, span: 1, color: '#cc99ff', top: '1px solid grey', bottom: 'none', left: '1px solid grey', right: '1px solid grey' },
        { id: 'ce', label: 'CE', minWidth: 130, span: 3, color: '#c00000', top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        { id: 'pe', label: 'PE', minWidth: 130, span: 3, color: '#008000', top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        ...(props.sameDiffStrike === 'same' || props.isAll==='all' ? main_header_show : '')
    ]

    const header_column_show = [
        { id: 'oi_analysis', label: 'OI Analysis', minWidth: 130, span: 4, color: "#ffccff", top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
    ]

    const header_columns = [
        { id: 'time_int', label: 'Time', minWidth: 130, span: 1, color: '#cc99ff', top: '', bottom: 'none', left: '1px solid grey', right: '1px solid grey' },
        { id: 'open_int', label: 'Open Interest', minWidth: 130, span: 3, color: '#ffcc99', top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        // { id: 'volume', label: 'Volume', minWidth: 130, span: 1, color: '#ffcc99', top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        // { id: 'put_volume', label: 'Volume', minWidth: 130, span: 1, color: "#99ff99", top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        { id: 'put_open_int', label: 'Open Interest', minWidth: 130, span: 3, color: "#99ff99", top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        ...(props.sameDiffStrike === 'same' || props.isAll==='all' ? header_column_show : '')
    ]

    const columns_show = [
        { id: 'pe_oi_minus_ce_oi', label: 'PE OI (-)CE OI', minWidth: 130, color: '#ffccff', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pcr_oi', label: 'PCR (OI)', minWidth: 130, color: '#ffccff', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_oi_change_minus_ce_oi_change', label: 'PE OI Chg (-) CE OI Chg (Previous Time)', minWidth: 130, color: '#ffccff', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_oi_change_minus_ce_oi_change_wrt_previous_day', label: 'PE OI Chg (-) CE OI Chg (Previous Day)', minWidth: 130, color: '#ffccff', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
    ]

    const columns = [
        { id: 'time_interval', label: '', minWidth: 70, color: '#cc99ff', parent: 'time', top: 'none', bottom: '1px solid grey', left: '1px solid grey', right: '1px solid grey' },

        { id: 'ce_open_interest', label: 'OI', minWidth: 130, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'ce_oi_change', label: 'OI Change', minWidth: 130, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'ce_oi_pchange', label: 'OI % Change', minWidth: 130, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_oi_chg_combined', label: 'OI Change (Previous Time)', minWidth: 130, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_oi_chg_with_previous_day_combined', label: 'OI Change (Previous Day)', minWidth: 130, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },

        // { id: 'pe_total_traded_volume', label: 'Volume', minWidth: 130, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'pe_oi_pchange', label: 'OI % Change', minWidth: 130, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'pe_oi_change', label: 'OI Change', minWidth: 130, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_oi_chg_with_previous_day_combined', label: 'OI Change (Previous Day)', minWidth: 130, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_oi_chg_combined', label: 'OI Change (Previous Time)', minWidth: 130, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_open_interest', label: 'OI', minWidth: 130, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },

        ...(props.sameDiffStrike === 'same' || props.isAll==='all' ? columns_show : '')
    ];

    const rows = props.tableData

    return (

        <div sx={{ width: '100%' }}>
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
            <TableContainer className='mt-1' style={{ position: 'fixed', paddingRight: '20px' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {main_header_columns.map((column) => (
                                hiddenColumns.includes(column.id) ? null : (
                                    <TableCell
                                        key={column.id}
                                        align='center'
                                        colSpan={column.span}
                                        sx={{
                                            padding: "2px 2px",
                                            borderTop: column.top,
                                            borderBottom: column.bottom,
                                            borderLeft: column.left,
                                            borderRight: column.right,
                                            fontWeight: "bold",
                                            backgroundColor: column.color,
                                            color: "white"
                                        }}
                                    >
                                        {column.id !== 'strike' ? column.label : ''}
                                    </TableCell>)
                            ))}
                        </TableRow>
                        <TableRow>
                            {header_columns.map((column) => (
                                hiddenColumns.includes(column.id) ? null : (
                                    <TableCell
                                        key={column.id}
                                        align='center'
                                        colSpan={column.span}
                                        style={{ minWidth: column.minWidth, fontSize: 12 }}
                                        sx={{
                                            padding: "2px 2px",
                                            borderTop: column.top,
                                            borderBottom: column.bottom,
                                            borderLeft: column.left,
                                            borderRight: column.right,
                                            fontWeight: "bold",
                                            backgroundColor: column.color,
                                        }}
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
                                        style={{ minWidth: column.minWidth, fontSize: 12 }}
                                        sx={{
                                            padding: "2px 2px",
                                            borderTop: column.top,
                                            borderBottom: column.bottom,
                                            borderLeft: column.left,
                                            borderRight: column.right,
                                            fontWeight: "bold",
                                            backgroundColor: column.color,
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
                                                        height: '35px',
                                                        color: column.id === 'ce_oi_chg_combined' ? row.ce_oi_chg_color : column.id === 'pe_oi_chg_combined' ? row.pe_oi_chg_color : column.id === 'ce_oi_chg_with_previous_day_combined' ? row.ce_oi_chg_color_previous_day : column.id === 'pe_oi_chg_with_previous_day_combined' ? row.pe_oi_chg_color_previous_day : ''
                                                    }}>
                                                        {value}
                                                    </TableCell>)
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

