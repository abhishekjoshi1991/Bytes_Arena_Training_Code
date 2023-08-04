import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {/* {value === index && ( */}
      <Box sx={{ p: 3 }}>
        {children}
      </Box>
      {/* )} */}
    </div>
  );
}

export default function OptionStrategyBuilderTableTab(props) {
  const [tabValue, setTabValue] = useState(0);
  const [positionTableData, setPositionTableData] = useState([]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  async function get_position_table_data() {
    const request_position_table_data = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/manage_position')
    const response_position_table_data = await request_position_table_data.json()
    if (response_position_table_data) {
      setPositionTableData(response_position_table_data)
    }
  }

  // onblur handlers for strike and lot
  const handleStrikeApi = (event, id, option_type, strike_list) => {
    const { value } = event.target;
    const input = Number(value)
    if (input) {
      if (!strike_list.includes(input)) {
        const updatedData = positionTableData.map((row) => {
          if (row.row_id === id && row.option_type === option_type) {
            return { ...row, strike: row.strike_copy };
          }
          return row;
        });
        setPositionTableData(updatedData);
      }
      else {
        const updatedData = positionTableData.map((row) => {
          if (row.row_id === id && row.option_type === option_type) {
            return { ...row, strike: input, strike_copy: input };
          }
          return row;
        });
        setPositionTableData(updatedData);
      }
    }
  }

  const handleLotApi = () => {
    console.log('lot api called')
  }

  // onchange handlers for expiry, strike and lot
  const handleExpiryChange = (id, option_type, value, strike, expiry_strike_list) => {
    const filtered_value = expiry_strike_list[value].filter((element) => element === strike)
    if (filtered_value.length > 0) {
      const updatedData = positionTableData.map((row) => {
        if (row.row_id === id && row.option_type === option_type) {
          return { ...row, expiry: value };
        }
        return row;
      });
      setPositionTableData(updatedData);
    }
  };

  const handleStrikeChange = (event, id, option_type) => {
    const { value } = event.target;
    if (value) {
      const updatedData = positionTableData.map((row) => {
        if (row.row_id === id && row.option_type === option_type) {
          return { ...row, strike: Number(value) };
        }
        return row;
      });
      setPositionTableData(updatedData);
    }
  };

  const handleLotChange = (event, id, option_type) => {
    const { value } = event.target;
    const input = Number(value)
    if (!isNaN(input)) {
      const updatedData = positionTableData.map((row) => {
        if (row.row_id === id && row.option_type === option_type) {
          return { ...row, lot: Number(value) };
        }
        return row;
      });
      setPositionTableData(updatedData);
    }
  };

  const handleActionSwitch = (id, option_type) => {
    const updatedData = positionTableData.map((row) => {
      if (row.row_id === id && row.option_type === option_type) {
        const newValue = row.option === 'BUY' ? 'SELL' : 'BUY';
        return { ...row, option: newValue };
      }
      return row;
    });
    setPositionTableData(updatedData);
  };

  const handleOptionTypeSwitch = (id, option_type) => {
    const is_same_id = positionTableData.filter((item) => item.row_id === id);
    if (is_same_id.length < 2) {
      const updatedData = positionTableData.map((row) => {
        if (row.row_id === id && row.option_type === option_type) {
          const newOptionType = row.option_type === 'CE' ? 'PE' : 'CE';
          return { ...row, option_type: newOptionType };
        }
        return row;
      });
      setPositionTableData(updatedData);
    }
    else {
      alert(option_type === 'CE' ? 'Put' + ' position for this strike is already added' : 'Call' + ' position for this strike is already added')
    }

  };

  const handleDeletePosition = (id, option_type) => {
    setPositionTableData((prevData) => prevData.filter((row) => !(row.row_id === id && row.option_type === option_type)));
  };

  // Increment and Decrement Handles
  const handleStrikeDecrement = (id, option_type) => {
    const updatedData = positionTableData.map((row) => {
      if (row.row_id === id && row.option_type === option_type) {
        const prevValue = row.strike_list.reverse().find((v) => v < row.strike) || row.strike;
        row.strike_list.reverse()
        return { ...row, strike: prevValue, strike_copy: prevValue };
      }
      return row;
    });
    setPositionTableData(updatedData);
  };

  const handleStrikeIncrement = (id, option_type) => {
    const updatedData = positionTableData.map((row) => {
      if (row.row_id === id && row.option_type === option_type) {
        const nextValue = row.strike_list.find((v) => v > row.strike) || row.strike;
        return { ...row, strike: nextValue, strike_copy: nextValue };
      }
      return row;
    });
    setPositionTableData(updatedData);
  };

  const handleLotDecrement = (id, option_type) => {
    const updatedData = positionTableData.map((row) => {
      if (row.row_id === id && row.option_type === option_type) {
        return { ...row, lot: row.lot - 1 };
      }
      return row;
    });
    setPositionTableData(updatedData);
  };

  const handleLotIncrement = (id, option_type) => {
    const updatedData = positionTableData.map((row) => {
      if (row.row_id === id && row.option_type === option_type) {
        return { ...row, lot: row.lot + 1 };
      }
      return row;
    });
    setPositionTableData(updatedData);
    props.handleTableCallback(updatedData)
  };



  useEffect(() => {
    // get_position_table_data();
    setPositionTableData(props.selectedOptions)
  }, [props.selectedOptions])

  console.log('table component==================', positionTableData)

  return (
    <Box sx={{ width: '100%' }}>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example" variant="fullWidth">
          <Tab label="Positions" />
          <Tab label="Greeks" />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabValue} index={0}>
        {/* Item One */}
        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center"></TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center"></TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">Expiry</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">Strike</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">Lots</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">Intrinsic Value</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">Extrinsic Value</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">Entry Price</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">Current Price</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">Exit Price</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">P&L</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">Status</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {positionTableData.map((row) => (
                <TableRow
                  hover={true}
                  key={(row.row_id + row.option_type)}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell style={{ fontSize: '11px', padding: '6px' }} align="center">
                    {row.option === 'BUY' ?
                      <div onClick={() => handleActionSwitch(row.row_id, row.option_type)}>
                        <Chip style={{ cursor: 'pointer' }} sx={{ borderRadius: 1 }} size='small' label='B' color="success" />
                      </div> :
                      <div onClick={() => handleActionSwitch(row.row_id, row.option_type)}>
                        <Chip style={{ cursor: 'pointer' }} sx={{ borderRadius: 1 }} size='small' label='S' color="error" />
                      </div>}
                  </TableCell>
                  <TableCell style={{ minWidth: 20, fontSize: '11px', padding: '6px' }} align="center">
                    <div style={{ cursor: row.segment !== 'fut' ? 'pointer' : '' }} onClick={() => handleOptionTypeSwitch(row.row_id, row.option_type)}>
                      {row.segment === 'fut' ? 'Fut' : row.option_type}
                    </div>
                  </TableCell>
                  <TableCell style={{ minWidth: 80, fontSize: '11px', padding: '6px' }} align="center">
                    <select
                      value={row.expiry}
                      className='p-1'
                      onChange={(e) =>
                        handleExpiryChange(row.row_id, row.option_type, e.target.value, row.strike, row.expiry_strike_list)
                      }
                    >
                      {(row.segment === 'opt' ? row.expiryList : row.futExpList).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>))}
                    </select>

                  </TableCell>
                  <TableCell style={{ minWidth: 110, fontSize: '11px', padding: '6px' }} align="center">
                    <div className='p-1'>
                      {row.strike ? <button className="sign_btn" onClick={() => handleStrikeDecrement(row.row_id, row.option_type)}>-</button> : ''}
                      {row.strike ? <input type='text' value={row.strike} name='strike' style={{ 'width': '40px', textAlign: 'center' }} className='m-1' onChange={(event) => handleStrikeChange(event, row.row_id, row.option_type)} onBlur={(event) => handleStrikeApi(event, row.row_id, row.option_type, row.strike_list)} /> : '-'}
                      {row.strike ? <button className="sign_btn" onClick={() => handleStrikeIncrement(row.row_id, row.option_type)}>+</button> : ''}
                    </div>
                  </TableCell>
                  <TableCell style={{ minWidth: 100, fontSize: '11px', padding: '6px' }} align="center">
                    <div className='p-1'>
                      <button className="sign_btn" onClick={() => handleLotDecrement(row.row_id, row.option_type)} disabled={row.lot === 1}>-</button>
                      <input type='text' value={row.lot} name='lot' style={{ 'width': '30px', textAlign: 'center' }} className='m-1' onChange={(event) => handleLotChange(event, row.row_id, row.option_type)} onBlur={handleLotApi} />
                      <button className="sign_btn" onClick={() => handleLotIncrement(row.row_id, row.option_type)}>+</button>
                    </div>
                  </TableCell>
                  <TableCell style={{ minWidth: 20, fontSize: '11px', padding: '6px' }} align="center">
                    {row.int_val}
                  </TableCell>
                  <TableCell style={{ minWidth: 20, fontSize: '11px', padding: '6px' }} align="center">
                    {row.ext_val}
                  </TableCell>
                  <TableCell style={{ minWidth: 20, fontSize: '11px', padding: '6px' }} align="center">
                    {row.entry_price}
                  </TableCell>
                  <TableCell style={{ minWidth: 20, fontSize: '11px', padding: '6px' }} align="center">
                    {row.entry_price}
                  </TableCell>
                  <TableCell style={{ minWidth: 20, fontSize: '11px', padding: '6px' }} align="center">
                    {row.exit_price}
                  </TableCell>
                  <TableCell style={{ minWidth: 20, fontSize: '11px', padding: '6px' }} align="center">
                    {/* {row.exit_price} */}
                  </TableCell>
                  <TableCell style={{ minWidth: 20, fontSize: '11px', padding: '6px' }} align="center">
                    {/* {row.exit_price} */}
                  </TableCell>
                  <TableCell style={{ minWidth: 20, fontSize: '11px', padding: '6px' }} align="center">
                    <a data-id={row.id} data-exp={row.expiry_date} onClick={() => handleDeletePosition(row.row_id, row.option_type)}>
                      <Tooltip title="Delete Position">
                        <DeleteOutlineIcon color="error" className="icon1" />
                      </Tooltip>
                    </a>
                  </TableCell>
                </TableRow>))}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center"></TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center"></TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">Expiry</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">Strike</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">Lots</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">IV</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">Delta</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">Gamma</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">Theta</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">Vega</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {positionTableData.map((row) => (
                <TableRow
                  hover={true}
                  key={(row.row_id + row.option_type)}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '35px' }}
                >
                  <TableCell style={{ fontSize: '11px', padding: '6px' }} align="center">
                    {row.option === 'BUY' ?
                      <div onClick={() => handleActionSwitch(row.row_id, row.option_type)}>
                        <Chip style={{ cursor: 'pointer' }} sx={{ borderRadius: 1 }} size='small' label='B' color="success" />
                      </div> :
                      <div onClick={() => handleActionSwitch(row.row_id, row.option_type)}>
                        <Chip style={{ cursor: 'pointer' }} sx={{ borderRadius: 1 }} size='small' label='S' color="error" />
                      </div>}
                  </TableCell>
                  <TableCell style={{ minWidth: 20, fontSize: '11px', padding: '6px' }} align="center">
                    <div style={{ cursor: row.segment !== 'fut' ? 'pointer' : '' }} onClick={() => handleOptionTypeSwitch(row.row_id, row.option_type)}>
                      {row.segment === 'fut' ? 'Fut' : row.option_type}
                    </div>
                  </TableCell>
                  <TableCell style={{ minWidth: 80, fontSize: '11px', padding: '6px' }} align="center">
                    <select
                      value={row.expiry}
                      className='p-1'
                      onChange={(e) =>
                        handleExpiryChange(row.row_id, row.option_type, e.target.value)
                      }
                    >
                      {(row.segment === 'opt' ? row.expiryList : row.futExpList).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>))}
                    </select>

                  </TableCell>
                  <TableCell style={{ minWidth: 110, fontSize: '11px', padding: '6px' }} align="center">
                    <div className='p-1'>
                      {row.strike ? <button className="sign_btn" onClick={() => handleStrikeDecrement(row.row_id, row.option_type)}>-</button> : ''}
                      {row.strike ? <input type='text' value={row.strike} name='strike' style={{ 'width': '40px', textAlign: 'center' }} className='m-1' onChange={(event) => handleStrikeChange(event, row.row_id, row.option_type)} onBlur={handleStrikeApi} /> : '-'}
                      {row.strike ? <button className="sign_btn" onClick={() => handleStrikeIncrement(row.row_id, row.option_type)}>+</button> : ''}
                    </div>
                  </TableCell>
                  <TableCell style={{ minWidth: 100, fontSize: '11px', padding: '6px' }} align="center">
                    <div className='p-1'>
                      <button className="sign_btn" disabled={row.lot === 1} onClick={() => handleLotDecrement(row.row_id, row.option_type)}>-</button>
                      <input type='text' value={row.lot} name='lot' style={{ 'width': '30px', textAlign: 'center' }} className='m-1' onChange={(event) => handleLotChange(event, row.row_id, row.option_type)} onBlur={handleLotApi} />
                      <button className="sign_btn" onClick={() => handleLotIncrement(row.row_id, row.option_type)}>+</button>
                    </div>
                  </TableCell>
                  <TableCell style={{ fontSize: '11px', padding: '6px' }} size="small" align="center">
                    {row.iv}
                  </TableCell>
                  <TableCell style={{ fontSize: '11px', padding: '6px' }} size="small" align="center">
                    {row.delta}
                  </TableCell>
                  <TableCell style={{ fontSize: '11px', padding: '6px' }} size="small" align="center">
                    {row.gamma}
                  </TableCell>
                  <TableCell style={{ fontSize: '11px', padding: '6px' }} size="small" align="center">
                    {row.theta}
                  </TableCell>
                  <TableCell style={{ fontSize: '11px', padding: '6px' }} size="small" align="center">
                    {row.vega}
                  </TableCell>


                </TableRow>))}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomTabPanel>
    </Box>
  );
}