import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
          <Typography>{children}</Typography>
        </Box>
      {/* )} */}
    </div>
  );
}


export default function BasicTabs() {
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
          <Tab label="Positions"/>
          <Tab label="Greeks"/>
        </Tabs>
      </Box>
      <CustomTabPanel value={tabValue} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        Item Two
      </CustomTabPanel>
    </Box>
  );
}