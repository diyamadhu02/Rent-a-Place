import React from 'react';
import { Box, Slider, Typography } from '@mui/material';
import { useValue } from '../../context/ContextProvider';

const marks = [
  { value: 0, label: '$0' },
  { value: 25, label: '$25' },
  { value: 50, label: '$50' },
];

const PriceSlider = () => {
  const { state: { priceFilter }, dispatch } = useValue();

  const handlePriceChange = (event, newValue) => {
    dispatch({ type: 'FILTER_PRICE', payload: newValue });
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Typography>
        Max Price: {'$' + priceFilter}
      </Typography>
      <Slider
        min={0}
        max={50}
        defaultValue={50}
        valueLabelDisplay="auto"
        marks={marks}
        value={priceFilter}
        onChange={handlePriceChange}
      />
    </Box>
  );
};

export default PriceSlider;
