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
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BadgeGreen from './BadgeGreen';
import BadgeRed from './BadgeRed';

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
      <Box className='mt-1'>
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

  const tableMasterData = props.parentMasterData
  console.log('*********tableMasterdata', tableMasterData)

  const theme = createTheme({
    palette: {

      secondary: {
        // This is green.A700 as hex.
        main: '#FFFFFF',
      },
    },
  });

  const handleClearButtonClick = () => {
    console.log('clicked')
    setPositionTableData([])
    props.handleTableCallback([])
  }


  // onblur handlers for strike and lot
  const handleStrikeApi = (event, currentTime, option_type, strike_list, expiry, action) => {
    const { value } = event.target;
    const input = Number(value)
    if (input) {
      const is_opposite_action_present_for_new_expiry = positionTableData.filter(record => {
        return (
          record.option_type === option_type &&
          record.expiry === expiry &&
          record.action === (action === 'BUY' ? 'SELL' : 'BUY') &&
          record.strike === input
        );
      });
      console.log('is_opposite_action_present_for_new_expiry', is_opposite_action_present_for_new_expiry)

      if (is_opposite_action_present_for_new_expiry.length > 0) {
        alert('Opposite position for this strike is already added')
        const updatedData = positionTableData.map((row) => {
          if (row.currentTime === currentTime && row.option_type === option_type) {
            return { ...row, strike: row.strike_copy };
          }
          return row;
        });
        setPositionTableData(updatedData);
      }
      else {
        console.log('going in else also')
        if (!strike_list.includes(input)) {
          const updatedData = positionTableData.map((row) => {
            if (row.currentTime === currentTime && row.option_type === option_type) {
              return { ...row, strike: row.strike_copy };
            }
            return row;
          });
          setPositionTableData(updatedData);
        }
        else {
          const updatedData = positionTableData.map((row) => {
            if (row.currentTime === currentTime && row.option_type === option_type) {
              // const is_strike_present = positionTableData.filter((row) => (row.option_type === option_type && row.strike === input && row.expiry === expiry && row.action === action && row.strike_copy == input))
              // if (is_strike_present.length > 0) {
              //   if (row.strike !== row.strike_copy) {
              //     alert('Strike ' + input + ' is being already selected for expiry ' + expiry)
              //   }
              //   return { ...row, strike: row.strike_copy }
              // }
              // else {
              const new_id = row.expiry_strike_id_dict[row.expiry][input + '.0']
              const newEntryPriceRecord = tableMasterData['option_chain'][row.expiry]['data'].filter(
                (selectedOption) => (selectedOption.strike_price === input)
              );
              const newEntryPrice = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_last_price'] : newEntryPriceRecord[0]['pe_last_price']
              const newDelta = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_delta'] : newEntryPriceRecord[0]['pe_delta']
              const newGamma = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_gamma'] : newEntryPriceRecord[0]['pe_gamma']
              const newTheta = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_theta'] : newEntryPriceRecord[0]['pe_theta']
              const newVega = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_vega'] : newEntryPriceRecord[0]['pe_vega']
              const newIV = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_iv_calculated'] : newEntryPriceRecord[0]['pe_iv_calculated']
              return {
                ...row, strike: input,
                strike_copy: input,
                id: new_id,
                entry_price: newEntryPrice,
                current_price: newEntryPrice,
                profit_loss: 0,
                delta: newDelta,
                gamma: newGamma,
                theta: newTheta,
                vega: newVega,
                iv: newIV,
                int_val: row.option_type === 'CE' ? row.ceExpiryStrikeIntValueDict[row.expiry][input + '.0'] : row.peExpiryStrikeIntValueDict[row.expiry][input + '.0'],
                ext_val: row.option_type === 'CE' ? row.ceExpiryStrikeExtValueDict[row.expiry][input + '.0'] : row.peExpiryStrikeExtValueDict[row.expiry][input + '.0'],
              };
              // }
            }
            return row;
          });
          setPositionTableData(updatedData);
          props.handleTableCallback(updatedData)
        }
      }
    }
  }

  const handleLotApi = (event, currentTime, option_type) => {
    const { value } = event.target;
    const input = Number(value)

    const updatedData = positionTableData.map((row) => {
      if (row.currentTime === currentTime && row.option_type === option_type) {
        return { ...row, lot: input, profit_loss: ((row.current_price - row.entry_price) * 50 * input) };
      }
      return row;
    });
    setPositionTableData(updatedData);
    props.handleTableCallback(updatedData)
  }

  // onchange handlers for expiry, strike and lot
  const handleExpiryChange = (currentTime, option_type, value, strike, expiry_strike_list, action) => {
    if (option_type === 'futures') {
      console.log('infuture expiry')
      const is_opposite_action_present_for_new_expiry = positionTableData.filter(record => {
        return (
          record.option_type === option_type &&
          record.expiry === value &&
          record.action === (action === 'BUY' ? 'SELL' : 'BUY')
        );
      });
      if (is_opposite_action_present_for_new_expiry.length > 0) {
        alert('Opposite position for this expiry is already added')
      }
      else {
        const updatedData = positionTableData.map((row) => {
          if (row.currentTime === currentTime && row.option_type === option_type) {
            const new_id = row.expiry_id_dict[value]
            const newEntryPriceRecord = tableMasterData['future_chain'].filter(
              (selectedOption) => (selectedOption.expiry_date === value)
            );
            const newEntryPrice = newEntryPriceRecord[0]['last_price']
            return { ...row, expiry: value, id: new_id, entry_price: newEntryPrice, current_price: newEntryPrice, profit_loss: 0};
          }
          return row;
        });
        setPositionTableData(updatedData);
        props.handleTableCallback(updatedData)
      }
    }
    else {
      const is_opposite_action_present_for_new_expiry = positionTableData.filter(record => {
        return (
          record.option_type === option_type &&
          record.expiry === value &&
          record.action === (action === 'BUY' ? 'SELL' : 'BUY') &&
          record.strike === strike
        );
      });
      console.log('inhere')
      console.log('is_opposite_action_present_for_new_expiry', is_opposite_action_present_for_new_expiry)
      if (is_opposite_action_present_for_new_expiry.length > 0) {
        alert('Opposite position for this expiry is already added')
      }
      else {
        const filtered_value = expiry_strike_list[value].filter((element) => element === strike)
        if (filtered_value.length > 0) {
          const updatedData = positionTableData.map((row) => {
            if (row.currentTime === currentTime && row.option_type === option_type) {
              const new_id = row.expiry_strike_id_dict[value][row.strike + '.0']
              const newEntryPriceRecord = tableMasterData['option_chain'][value]['data'].filter(
                (selectedOption) => (selectedOption.strike_price === row.strike)
              );
              const newEntryPrice = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_last_price'] : newEntryPriceRecord[0]['pe_last_price']
              const newDelta = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_delta'] : newEntryPriceRecord[0]['pe_delta']
              const newGamma = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_gamma'] : newEntryPriceRecord[0]['pe_gamma']
              const newTheta = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_theta'] : newEntryPriceRecord[0]['pe_theta']
              const newVega = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_vega'] : newEntryPriceRecord[0]['pe_vega']
              const newIV = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_iv_calculated'] : newEntryPriceRecord[0]['pe_iv_calculated']
              return {
                ...row, expiry: value,
                id: new_id,
                entry_price: newEntryPrice,
                current_price: newEntryPrice,
                profit_loss: 0,
                delta: newDelta,
                gamma: newGamma,
                theta: newTheta,
                vega: newVega,
                iv: newIV,
                strike_list: row.expiry_strike_list[value],
                int_val: row.option_type === 'CE' ? row.ceExpiryStrikeIntValueDict[value][row.strike + '.0'] : row.peExpiryStrikeIntValueDict[value][row.strike + '.0'],
                ext_val: row.option_type === 'CE' ? row.ceExpiryStrikeExtValueDict[value][row.strike + '.0'] : row.peExpiryStrikeExtValueDict[value][row.strike + '.0']
              };
            }
            return row;
          });
          setPositionTableData(updatedData);
          props.handleTableCallback(updatedData)
        }
        else {
          alert('Strike ' + strike + ' is not available for selected expiry ' + value)
        }
      }
    }
  };

  const handleStrikeChange = (event, currentTime, option_type) => {

    const { value } = event.target;
    if (value) {
      const updatedData = positionTableData.map((row) => {
        if (row.currentTime === currentTime && row.option_type === option_type) {
          return { ...row, strike: Number(value) };
        }
        return row;
      });
      setPositionTableData(updatedData);
    }
  };

  const handleLotChange = (event, currentTime, option_type) => {
    const { value } = event.target;
    const input = Number(value)
    if (!isNaN(input)) {
      const updatedData = positionTableData.map((row) => {
        if (row.currentTime === currentTime && row.option_type === option_type) {
          return { ...row, lot: Number(value) };
        }
        return row;
      });
      setPositionTableData(updatedData);
    }
  };

  const handleActionSwitch = (id, currentTime, option_type) => {
    const is_same_id = positionTableData.filter((item) => (item.id === id && item.option_type === option_type));
    console.log('is_same_id', is_same_id)
    if (is_same_id.length > 1) {
      alert('Opposite position for this strike is already added')
    }
    else {
      const updatedData = positionTableData.map((row) => {
        if (row.currentTime === currentTime && row.option_type === option_type) {
          const newValue = row.action === 'BUY' ? 'SELL' : 'BUY';
          // const new_id = row.expiry_strike_id_dict[row.expiry][row.strike + '.0']
          // console.log(new_id)
          return { ...row, action: newValue, original_buy_sell: newValue };
        }
        return row;
      });
      setPositionTableData(updatedData);
      props.handleTableCallback(updatedData)
    }

    // const updatedData = positionTableData.map((row) => {
    //   if (row.id === id && row.option_type === option_type) {
    //     const newValue = row.action === 'BUY' ? 'SELL' : 'BUY';
    //     const new_id = row.expiry_strike_id_dict[row.expiry][row.strike + '.0']
    //     return { ...row, action: newValue, id: new_id };
    //   }
    //   return row;
    // });
    // setPositionTableData(updatedData);
    // props.handleTableCallback(updatedData)
  };

  const handleOptionTypeSwitch = (id, currentTime, option_type, action) => {
    if (option_type !== 'futures') {
      console.log('geting clicked and', option_type)
      const is_same_id = positionTableData.filter((item) => (item.id === id && item.option_type === (option_type === 'PE' ? 'CE' : 'PE') && item.action === (action === 'BUY' ? 'SELL' : 'BUY')));
      console.log('is_same_id', is_same_id)
      if (is_same_id.length > 0) {
        alert('Opposite position for this strike is already added')
      }
      else {
        console.log('do something')
        const updatedData = positionTableData.map((row) => {
          if (row.currentTime === currentTime && row.option_type === option_type) {
            const newOptionType = row.option_type === 'CE' ? 'PE' : 'CE';
            // const new_id = row.expiry_strike_id_dict[row.expiry][row.strike + '.0']
            const newEntryPriceRecord = tableMasterData['option_chain'][row.expiry]['data'].filter(
              (selectedOption) => (selectedOption.strike_price === row.strike)
            );
            const newEntryPrice = newOptionType === 'CE' ? newEntryPriceRecord[0]['ce_last_price'] : newEntryPriceRecord[0]['pe_last_price']
            const newDelta = newOptionType === 'CE' ? newEntryPriceRecord[0]['ce_delta'] : newEntryPriceRecord[0]['pe_delta']
            const newGamma = newOptionType === 'CE' ? newEntryPriceRecord[0]['ce_gamma'] : newEntryPriceRecord[0]['pe_gamma']
            const newTheta = newOptionType === 'CE' ? newEntryPriceRecord[0]['ce_theta'] : newEntryPriceRecord[0]['pe_theta']
            const newVega = newOptionType === 'CE' ? newEntryPriceRecord[0]['ce_vega'] : newEntryPriceRecord[0]['pe_vega']
            const newIV = newOptionType === 'CE' ? newEntryPriceRecord[0]['ce_iv_calculated'] : newEntryPriceRecord[0]['pe_iv_calculated']
            return {
              ...row, option_type: newOptionType,
              entry_price: newEntryPrice,
              current_price: newEntryPrice,
              profit_loss: 0,
              delta: newDelta,
              gamma: newGamma,
              theta: newTheta,
              vega: newVega,
              iv: newIV,
              int_val: newOptionType === 'CE' ? row.ceExpiryStrikeIntValueDict[row.expiry][row.strike + '.0'] : row.peExpiryStrikeIntValueDict[row.expiry][row.strike + '.0'],
              ext_val: newOptionType === 'CE' ? row.ceExpiryStrikeExtValueDict[row.expiry][row.strike + '.0'] : row.peExpiryStrikeExtValueDict[row.expiry][row.strike + '.0']
            };
          }
          return row;
        });
        setPositionTableData(updatedData);
        props.handleTableCallback(updatedData)
      }
    }
    // if (is_same_id.length < 2) {
    //   const updatedData = positionTableData.map((row) => {
    //     if (row.id === id && row.option_type === option_type) {
    //       const newOptionType = row.option_type === 'CE' ? 'PE' : 'CE';
    //       const new_id = row.expiry_strike_id_dict[row.expiry][row.strike + '.0']
    //       return { ...row, option_type: newOptionType, id: new_id };
    //     }
    //     return row;
    //   });
    //   setPositionTableData(updatedData);
    //   props.handleTableCallback(updatedData)
    // }
    // else {
    //   alert(option_type === 'CE' ? 'Put' + ' position for this strike is already added' : 'Call' + ' position for this strike is already added')
    // }
  };

  const handleDeletePosition = (currentTime, option_type) => {
    const nonDeletedRecords = positionTableData.filter((row) => !(row.currentTime === currentTime && row.option_type === option_type));
    setPositionTableData(nonDeletedRecords)
    props.handleTableCallback(nonDeletedRecords)
  };

  const handleExitPosition = (currentTime, value) => {
    console.log(value)
  };

  // Increment and Decrement Handles
  const handleStrikeDecrement = (currentTime, option_type, expiry, action) => {
    const updatedData = positionTableData.map((row) => {
      if (row.currentTime === currentTime && row.option_type === option_type) {
        const prevValue = row.strike_list.reverse().find((v) => v < row.strike) || row.strike;
        row.strike_list.reverse()
        const is_opposite_action_present_for_new_expiry = positionTableData.filter(record => {
          return (
            record.option_type === option_type &&
            record.expiry === expiry &&
            record.action === (action === 'BUY' ? 'SELL' : 'BUY') &&
            record.strike === prevValue
          );
        });
        console.log('is_opposite_action_present_for_new_expiry', is_opposite_action_present_for_new_expiry)
        if (is_opposite_action_present_for_new_expiry.length > 0) {
          alert('Opposite position for this strike is already added')
          return row
        }
        // const is_strike_present = positionTableData.filter((row) => (row.option_type === option_type && row.strike === prevValue && row.expiry === expiry && row.action === action))
        // console.log('is_strike_present', is_strike_present)
        // if (is_strike_present.length > 0) {
        //   alert('Strike ' + prevValue + ' is being already selected for expiry ' + expiry)
        //   return row
        // }
        else {
          const new_id = row.expiry_strike_id_dict[row.expiry][prevValue + '.0']
          const newEntryPriceRecord = tableMasterData['option_chain'][row.expiry]['data'].filter(
            (selectedOption) => (selectedOption.strike_price === prevValue)
          );
          const newEntryPrice = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_last_price'] : newEntryPriceRecord[0]['pe_last_price']
          const newDelta = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_delta'] : newEntryPriceRecord[0]['pe_delta']
          const newGamma = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_gamma'] : newEntryPriceRecord[0]['pe_gamma']
          const newTheta = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_theta'] : newEntryPriceRecord[0]['pe_theta']
          const newVega = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_vega'] : newEntryPriceRecord[0]['pe_vega']
          const newIV = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_iv_calculated'] : newEntryPriceRecord[0]['pe_iv_calculated']

          return {
            ...row, strike: prevValue,
            strike_copy: prevValue,
            id: new_id,
            entry_price: newEntryPrice,
            current_price: newEntryPrice,
            profit_loss: 0,
            delta: newDelta,
            gamma: newGamma,
            theta: newTheta,
            vega: newVega,
            iv: newIV,
            int_val: row.option_type === 'CE' ? row.ceExpiryStrikeIntValueDict[row.expiry][prevValue + '.0'] : row.peExpiryStrikeIntValueDict[row.expiry][prevValue + '.0'],
            ext_val: row.option_type === 'CE' ? row.ceExpiryStrikeExtValueDict[row.expiry][prevValue + '.0'] : row.peExpiryStrikeExtValueDict[row.expiry][prevValue + '.0']
          };
        }
      }
      return row;
    });
    setPositionTableData(updatedData);
    props.handleTableCallback(updatedData)
  };

  const handleStrikeIncrement = (currentTime, option_type, expiry, action) => {
    const updatedData = positionTableData.map((row) => {
      if (row.currentTime === currentTime && row.option_type === option_type) {
        const nextValue = row.strike_list.find((v) => v > row.strike) || row.strike;
        const is_opposite_action_present_for_new_expiry = positionTableData.filter(record => {
          return (
            record.option_type === option_type &&
            record.expiry === expiry &&
            record.action === (action === 'BUY' ? 'SELL' : 'BUY') &&
            record.strike === nextValue
          );
        });
        console.log('is_opposite_action_present_for_new_expiry', is_opposite_action_present_for_new_expiry)
        if (is_opposite_action_present_for_new_expiry.length > 0) {
          alert('Opposite position for this strike is already added')
          return row
        }
        // const is_strike_present = positionTableData.filter((row) => (row.option_type === option_type && row.strike === nextValue && row.expiry === expiry && row.action === action))
        // console.log('is_strike_present', is_strike_present)
        // if (is_strike_present.length > 0) {
        //   alert('Strike ' + nextValue + ' is being already selected for expiry ' + expiry)
        //   return row
        // }
        else {
          const new_id = row.expiry_strike_id_dict[row.expiry][nextValue + '.0']
          const newEntryPriceRecord = tableMasterData['option_chain'][row.expiry]['data'].filter(
            (selectedOption) => (selectedOption.strike_price === nextValue)
          );
          const newEntryPrice = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_last_price'] : newEntryPriceRecord[0]['pe_last_price']
          const newDelta = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_delta'] : newEntryPriceRecord[0]['pe_delta']
          const newGamma = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_gamma'] : newEntryPriceRecord[0]['pe_gamma']
          const newTheta = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_theta'] : newEntryPriceRecord[0]['pe_theta']
          const newVega = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_vega'] : newEntryPriceRecord[0]['pe_vega']
          const newIV = row.option_type === 'CE' ? newEntryPriceRecord[0]['ce_iv_calculated'] : newEntryPriceRecord[0]['pe_iv_calculated']

          return {
            ...row, strike: nextValue,
            strike_copy: nextValue,
            id: new_id,
            entry_price: newEntryPrice,
            current_price: newEntryPrice,
            profit_loss: 0,
            delta: newDelta,
            gamma: newGamma,
            theta: newTheta,
            vega: newVega,
            iv: newIV,
            int_val: row.option_type === 'CE' ? row.ceExpiryStrikeIntValueDict[row.expiry][nextValue + '.0'] : row.peExpiryStrikeIntValueDict[row.expiry][nextValue + '.0'],
            ext_val: row.option_type === 'CE' ? row.ceExpiryStrikeExtValueDict[row.expiry][nextValue + '.0'] : row.peExpiryStrikeExtValueDict[row.expiry][nextValue + '.0']
          };
        }
      }
      return row;
    });
    setPositionTableData(updatedData);
    props.handleTableCallback(updatedData)
  };

  const handleLotDecrement = (currentTime, option_type) => {
    const updatedData = positionTableData.map((row) => {
      if (row.currentTime === currentTime && row.option_type === option_type) {
        return { ...row, lot: row.lot - 1, profit_loss: ((row.current_price - row.entry_price) * 50 * (row.lot - 1)) };
      }
      return row;
    });
    setPositionTableData(updatedData);
    props.handleTableCallback(updatedData)
  };

  const handleLotIncrement = (currentTime, option_type) => {
    const updatedData = positionTableData.map((row) => {
      if (row.currentTime === currentTime && row.option_type === option_type) {
        return { ...row, lot: row.lot + 1, profit_loss: ((row.current_price - row.entry_price) * 50 * (row.lot + 1)) };
      }
      return row;
    });
    setPositionTableData(updatedData);
    props.handleTableCallback(updatedData)
  };



  useEffect(() => {
    setPositionTableData(props.selectedOptionsTable)
  }, [props.selectedOptionsTable])

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
        <div className='text-end'>
          <Button className='mx-1' style={{ background: '#27bd17', height: '25px', fontSize: '12px' }} size='small'>
            <ThemeProvider theme={theme}>
              <BookmarkIcon style={{ fontSize: "12px" }} color="secondary" className="icon1" />
            </ThemeProvider>
            &nbsp; <span style={{ color: 'white', fontWeight: 'bold' }}>Save</span>
          </Button>
          <Button style={{ background: '#e84a33', height: '25px', fontSize: '12px' }} size='small' onClick={() => handleClearButtonClick()}>
            <ThemeProvider theme={theme}>
              <ClearIcon style={{ fontSize: "12px" }} color="secondary" className="icon1" />
            </ThemeProvider>
            &nbsp; <span style={{ color: 'white', fontWeight: 'bold' }}>Clear</span>
          </Button>
        </div>
        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px', padding: '3px' }} align="center"></TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px', padding: '3px' }} align="center"></TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px', padding: '3px' }} align="center">Expiry</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px', padding: '3px' }} align="center">Strike</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px', padding: '3px' }} align="center">Lots</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px', padding: '3px' }} align="center">Int. Value</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px', padding: '3px' }} align="center">Time Value</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px', padding: '3px' }} align="center">Entry Price</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px', padding: '3px' }} align="center">Current Price</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px', padding: '3px' }} align="center">Exit Price</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px', padding: '3px' }} align="center">P&L</TableCell>
                {/* <TableCell style={{ fontWeight: 'bold', fontSize: '11px', padding: '3px' }} align="center">Status</TableCell> */}
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px', padding: '3px' }} align="center">Lots Exit</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '11px', padding: '3px' }} align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {positionTableData.map((row) => (
                <>
                  <TableRow
                    hover={true}
                    key={row.idx}
                    
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '50px' }}
                  >
                    <TableCell style={{ fontSize: '10px', padding: '3px' }} align="center">
                      {row.action === 'BUY' ?
                        <div onClick={() => handleActionSwitch(row.id, row.currentTime, row.option_type)}>
                          <Chip style={{ cursor: 'pointer' }} sx={{ borderRadius: 1 }} size='small' label='B' color="success" />
                        </div> :
                        <div onClick={() => handleActionSwitch(row.id, row.currentTime, row.option_type)}>
                          <Chip style={{ cursor: 'pointer' }} sx={{ borderRadius: 1 }} size='small' label='S' color="error" />
                        </div>}
                    </TableCell>
                    <TableCell style={{ minWidth: 20, fontSize: '10px', padding: '3px' }} align="center">
                      <div style={{ cursor: row.segment !== 'fut' ? 'pointer' : '' }} onClick={() => handleOptionTypeSwitch(row.id, row.currentTime, row.option_type, row.action)}>
                        {row.segment === 'fut' ? 'Fut' : row.option_type}
                      </div>
                    </TableCell>
                    <TableCell style={{ minWidth: 60, fontSize: '10px', padding: '3px' }} align="center">
                      <select
                        value={row.expiry}
                        className='p-1'
                        onChange={(e) =>
                          handleExpiryChange(row.currentTime, row.option_type, e.target.value, row.strike, row.expiry_strike_list, row.action)
                        }
                      >
                        {(row.segment === 'opt' ? row.expiryList : row.futExpList).map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>))}
                      </select>

                    </TableCell>
                    <TableCell style={{ minWidth: 60, fontSize: '10px', padding: '3px' }} align="center">
                      {/* <div className='p-1'> */}
                        {row.strike ? <button className="sign_btn" onClick={() => handleStrikeDecrement(row.currentTime, row.option_type, row.expiry, row.action)}>-</button> : ''}
                        {row.strike ? <input type='text' value={row.strike} name='strike' style={{ 'width': '40px', textAlign: 'center' }} className='m-1' onChange={(event) => handleStrikeChange(event, row.currentTime, row.option_type)} onBlur={(event) => handleStrikeApi(event, row.currentTime, row.option_type, row.strike_list, row.expiry, row.action)} /> : '-'}
                        {row.strike ? <button className="sign_btn" onClick={() => handleStrikeIncrement(row.currentTime, row.option_type, row.expiry, row.action)}>+</button> : ''}
                      {/* </div> */}
                    </TableCell>
                    <TableCell style={{ minWidth: 60, fontSize: '10px', padding: '3px' }} align="center">
                      {/* <div className='p-1'> */}
                        <button className="sign_btn" onClick={() => handleLotDecrement(row.currentTime, row.option_type)} disabled={row.lot === 1}>-</button>
                        <input type='text' value={row.lot} name='lot' style={{ 'width': '30px', textAlign: 'center' }} className='m-1' onChange={(event) => handleLotChange(event, row.currentTime, row.option_type)} onBlur={(event) => handleLotApi(event, row.currentTime, row.option_type)} />
                        <button className="sign_btn" onClick={() => handleLotIncrement(row.currentTime, row.option_type)}>+</button>
                      {/* </div> */}
                    </TableCell>
                    <TableCell style={{ minWidth: 20, fontSize: '10px', padding: '3px' }} align="center">
                      {row.option_type !== 'futures' ? row.int_val : '-'}
                    </TableCell>
                    <TableCell style={{ minWidth: 20, fontSize: '10px', padding: '3px' }} align="center">
                      {row.option_type !== 'futures' ? row.ext_val : '-'}
                    </TableCell>
                    <TableCell style={{ minWidth: 20, fontSize: '10px', padding: '3px' }} align="center">
                      {row.entry_price}
                    </TableCell>
                    <TableCell style={{ minWidth: 20, fontSize: '10px', padding: '3px' }} align="center">
                      {row.current_price}
                    </TableCell>
                    <TableCell style={{ minWidth: 20, fontSize: '10px', padding: '3px' }} align="center">
                      {row.exit_price}
                    </TableCell>
                    <TableCell style={{ minWidth: 20, fontSize: '10px', padding: '3px', color: row.profit_loss > 0 ? 'green' : row.profit_loss < 0 ? 'red' : '' }} align="center">
                      {row.profit_loss}
                    </TableCell>
                    
                    <TableCell style={{ minWidth: 70, fontSize: '10px', padding: '3px' }} align="center">
                      {/* <select
                        value={row.lot}
                        style={{ maxWidth: '40px', maxHeight: '18px', minWidth: '40px', minHeight: '18px', textAlign: 'center' }}>
                        {[...Array(row.lot)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select> */}
                        <button className="sign_btn" onClick={() => handleLotDecrement(row.currentTime, row.option_type)} disabled={row.lot === 1}>-</button>
                        <input type='text' value={row.lot} name='lot' style={{ 'width': '30px', textAlign: 'center' }} className='m-1' onChange={(event) => handleLotChange(event, row.currentTime, row.option_type)} onBlur={(event) => handleLotApi(event, row.currentTime, row.option_type)} />
                        <button className="sign_btn" onClick={() => handleLotIncrement(row.currentTime, row.option_type)}>+</button>
                      {/* <a onClick={() => handleExitPosition(row.currentTime)}>
                        <Tooltip title="Exit Position">
                          <ExitToAppIcon style={{ maxWidth: '18px', maxHeight: '18px', minWidth: '18px', minHeight: '18px' }} color="error" className="icon1" />
                        </Tooltip>
                      </a> */}
                    </TableCell>
                    <TableCell style={{ minWidth: 10, fontSize: '10px', padding: '3px' }} align="center">
                    <a onClick={() => handleExitPosition(row.currentTime)}>
                        <Tooltip title="Exit Position">
                          <ExitToAppIcon style={{ maxWidth: '18px', maxHeight: '18px', minWidth: '18px', minHeight: '18px' }} color="error" className="icon1" />
                        </Tooltip>
                      </a>
                      <a onClick={() => handleDeletePosition(row.currentTime, row.option_type)}>
                        <Tooltip title="Delete Position">
                          <DeleteOutlineIcon style={{ maxWidth: '18px', maxHeight: '18px', minWidth: '18px', minHeight: '18px' }} className="icon1" />
                        </Tooltip>
                      </a>

                    </TableCell>
                  </TableRow>
                  {/* {(row.id === 406725 || row.id === 406702) && (
                    <TableRow>
                      <TableCell colSpan={10}>Additional information for {row.expiry}</TableCell>
                    </TableRow>
                  )} */}
                </>
              ))}
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
                  key={row.idx}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '35px' }}
                >
                  <TableCell style={{ fontSize: '11px', padding: '6px' }} align="center">
                    {row.action === 'BUY' ?
                      <div onClick={() => handleActionSwitch(row.id, row.currentTime, row.option_type)}>
                        <Chip style={{ cursor: 'pointer' }} sx={{ borderRadius: 1 }} size='small' label='B' color="success" />
                      </div> :
                      <div onClick={() => handleActionSwitch(row.id, row.currentTime, row.option_type)}>
                        <Chip style={{ cursor: 'pointer' }} sx={{ borderRadius: 1 }} size='small' label='S' color="error" />
                      </div>}
                  </TableCell>
                  <TableCell style={{ minWidth: 20, fontSize: '11px', padding: '6px' }} align="center">
                    <div style={{ cursor: row.segment !== 'fut' ? 'pointer' : '' }} onClick={() => handleOptionTypeSwitch(row.id, row.currentTime, row.option_type, row.action)}>
                      {row.segment === 'fut' ? 'Fut' : row.option_type}
                    </div>
                  </TableCell>
                  <TableCell style={{ minWidth: 80, fontSize: '11px', padding: '6px' }} align="center">
                    <select
                      value={row.expiry}
                      className='p-1'
                      onChange={(e) =>
                        handleExpiryChange(row.currentTime, row.option_type, e.target.value, row.strike, row.expiry_strike_list, row.action)
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
                      {row.strike ? <button className="sign_btn" onClick={() => handleStrikeDecrement(row.currentTime, row.option_type, row.expiry, row.action)}>-</button> : ''}
                      {row.strike ? <input type='text' value={row.strike} name='strike' style={{ 'width': '40px', textAlign: 'center' }} className='m-1' onChange={(event) => handleStrikeChange(event, row.currentTime, row.option_type)} onBlur={(event) => handleStrikeApi(event, row.currentTime, row.option_type, row.strike_list, row.expiry, row.action)} /> : '-'}
                      {row.strike ? <button className="sign_btn" onClick={() => handleStrikeIncrement(row.currentTime, row.option_type, row.expiry, row.action)}>+</button> : ''}
                    </div>
                  </TableCell>
                  <TableCell style={{ minWidth: 100, fontSize: '11px', padding: '6px' }} align="center">
                    <div className='p-1'>
                      <button className="sign_btn" disabled={row.lot === 1} onClick={() => handleLotDecrement(row.currentTime, row.option_type)}>-</button>
                      <input type='text' value={row.lot} name='lot' style={{ 'width': '30px', textAlign: 'center' }} className='m-1' onChange={(event) => handleLotChange(event, row.currentTime, row.option_type)} onBlur={(event) => handleLotApi(event, row.currentTime, row.option_type)} />
                      <button className="sign_btn" onClick={() => handleLotIncrement(row.currentTime, row.option_type)}>+</button>
                    </div>
                  </TableCell>
                  <TableCell style={{ fontSize: '11px', padding: '6px' }} size="small" align="center">
                    {row.option_type !== 'futures' ? row.iv : '-'}
                  </TableCell>
                  <TableCell style={{ fontSize: '11px', padding: '6px' }} size="small" align="center">
                    {row.delta}
                  </TableCell>
                  <TableCell style={{ fontSize: '11px', padding: '6px' }} size="small" align="center">
                  {row.option_type !== 'futures' ? row.gamma : '-'}
                  </TableCell>
                  <TableCell style={{ fontSize: '11px', padding: '6px' }} size="small" align="center">
                    {row.option_type !== 'futures' ? row.theta : '-'}
                  </TableCell>
                  <TableCell style={{ fontSize: '11px', padding: '6px' }} size="small" align="center">
                    {row.option_type !== 'futures' ? row.vega : '-'}
                  </TableCell>


                </TableRow>))}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomTabPanel>
    </Box>
  );
}