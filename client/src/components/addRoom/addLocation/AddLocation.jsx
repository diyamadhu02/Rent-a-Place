import { Box } from '@mui/material';
import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { useValue } from '../../../context/ContextProvider';

const AddLocation = () => {
  const { state: { location: { lng, lat } }, dispatch } = useValue();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const mapboxAccessToken = process.env.REACT_APP_MAP_TOKEN;

  useEffect(() => {
    if (!map.current) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: 'https://api.maptiler.com/maps/basic/style.json?key=' + mapboxAccessToken,
        center: [lng, lat],
        zoom: 8,
      });

      marker.current = new maptilersdk.Marker({ draggable: true })
        .setLngLat([lng, lat])
        .addTo(map.current);

      marker.current.on('dragend', (e) => {
        const newLngLat = e.target.getLngLat();
        dispatch({ type: 'UPDATE_LOCATION', payload: { lng: newLngLat.lng, lat: newLngLat.lat } });
      });

      map.current.on('moveend', () => {
        const center = map.current.getCenter();
        dispatch({ type: 'UPDATE_LOCATION', payload: { lng: center.lng, lat: center.lat } });
      });
    } else {
      map.current.setCenter([lng, lat]);
      marker.current.setLngLat([lng, lat]);
    }
  }, [lng, lat, mapboxAccessToken, dispatch]);

  return (
    <Box sx={{ height: 400, position: 'relative' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
    </Box>
  );
};

export default AddLocation;

