import React from 'react'
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';

const shapeStyles = { bgcolor: 'red', width: 20, height: 20 };
const shapeCircleStyles = { borderRadius: '50%' };
const circle = (
  <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }} />
);

export default function BadgeRed() {
  return (
      <Badge color="secondary">
        {circle}
      </Badge>
  );
}