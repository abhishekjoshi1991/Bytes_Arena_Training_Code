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
        { id: 'ce', label: 'CE', minWidth: 130, span: 4, color: '#c00000', top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        { id: 'pe', label: 'PE', minWidth: 130, span: 4, color: '#008000', top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        ...(props.sameDiffStrike === 'same' || props.isAll==='all' ? main_header_show : '')
    ]

    const header_column_show = [
        { id: 'oi_analysis', label: 'OI Analysis', minWidth: 130, span: 4, color: "#ffccff", top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
    ]

    const header_columns = [
        { id: 'time_int', label: 'Time', minWidth: 130, span: 1, color: '#cc99ff', top: '', bottom: 'none', left: '1px solid grey', right: '1px solid grey' },
        { id: 'open_int', label: 'Open Interest', minWidth: 130, span: 3, color: '#ffcc99', top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        { id: 'volume', label: 'Volume', minWidth: 130, span: 1, color: '#ffcc99', top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        { id: 'put_volume', label: 'Volume', minWidth: 130, span: 1, color: "#99ff99", top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        { id: 'put_open_int', label: 'Open Interest', minWidth: 130, span: 3, color: "#99ff99", top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        ...(props.sameDiffStrike === 'same' || props.isAll==='all' ? header_column_show : '')
    ]

    const columns_show = [
        { id: 'pe_oi_minus_ce_oi', label: 'PE OI (-)CE OI', minWidth: 130, color: '#ffccff', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pcr_oi', label: 'PCR (OI)', minWidth: 130, color: '#ffccff', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_oi_change_minus_ce_oi_change', label: 'PE OI Chg (-) CE OI Chg', minWidth: 130, color: '#ffccff', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'oi_change_trend', label: 'PE OI & CE OI Chg Trend', minWidth: 130, color: '#ffccff', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
    ]

    const columns = [
        { id: 'time_interval', label: '', minWidth: 130, color: '#cc99ff', parent: 'time', top: 'none', bottom: '1px solid grey', left: '1px solid grey', right: '1px solid grey' },

        { id: 'ce_open_interest', label: 'OI', minWidth: 130, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_oi_change', label: 'OI Change', minWidth: 130, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_oi_pchange', label: 'OI % Change', minWidth: 130, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_total_traded_volume', label: 'Volume', minWidth: 130, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },

        { id: 'pe_total_traded_volume', label: 'Volume', minWidth: 130, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_oi_pchange', label: 'OI % Change', minWidth: 130, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_oi_change', label: 'OI Change', minWidth: 130, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
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
                        {/* <TableRow >
                            <TableCell align="center" colSpan={1} sx={{
                                padding: "2px 2px",
                                border: "1px solid grey",
                                backgroundColor: "#cc99ff",
                                fontWeight: "bold",
                                color: "white"
                            }}>

                            </TableCell>
                            <TableCell align="center" colSpan={4} sx={{
                                padding: "2px 2px",
                                border: "1px solid grey",
                                backgroundColor: "#c00000",
                                fontWeight: "bold",
                                color: "white"
                            }}>
                                CE
                            </TableCell>
                            <TableCell align="center" width={10} colSpan={4} sx={{
                                padding: "2px 2px",
                                border: "1px solid grey",
                                fontWeight: "bold",
                                backgroundColor: "#008000",
                                color: "white",
                            }}>
                                PE
                            </TableCell>
                            <TableCell align="center" colSpan={4} sx={{
                                padding: "2px 2px",
                                border: "1px solid grey",
                                fontWeight: "bold",
                                backgroundColor: "#c0004e",
                                color: "white"
                            }}>
                                CE & PE Combined
                            </TableCell>
                        </TableRow> */}
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
                                            // borderBottom: "1px solid #ffff66 ",
                                            // border: column.id !== 'strike' ? "1px solid grey" : '',
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
                                            // borderBottom: "1px solid #ffff66 ",
                                            // border: column.id !== 'strike' ? "1px solid grey" : '',
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
                                            // border: column.id !== 'strike_price' ? "1px solid grey" : '',
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
                                                        height: '35px',

                                                        // backgroundColor: column.id === 'ce_build_up' ? row.ce_color : column.id === 'pe_build_up' ? row.pe_color : '',
                                                        backgroundColor: row.ce_moneyness === 'ITM' && column.parent === 'ce' ? '#e7e6e6' : row.pe_moneyness === 'ITM' && column.parent === 'pe' ? '#e7e6e6' : '',
                                                        color: column.id === 'ce_changein_open_interest' && value > 0 ? "#ff0000" : column.id === 'ce_changein_open_interest' && value < 0 ? '#00cc00' : column.id === 'pe_changein_open_interest' && value > 0 ? '#00cc00' : column.id === 'pe_changein_open_interest' && value < 0 ? '#ff0000' : column.label === 'LTP Change' && value > 0 ? '#00cc00' : column.label === 'LTP Change' && value < 0 ? '#ff0000' : ''
                                                    }}><div style={column.id === 'ce_build_up' ? { backgroundColor: row.ce_color } : column.id === 'pe_build_up' ? { backgroundColor: row.pe_color } : { backgroundColor: '' }} > {value}</div>

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

