


import { useEffect } from 'react';
import { useValue } from '../../context/ContextProvider';
import { GeocodingControl } from '@maptiler/geocoding-control/react';

const GeoInput = () => {
  const { mapRef, containerRef, dispatch } = useValue();

  useEffect(() => {
    if (!mapRef.current || !containerRef.current) return;

    if (containerRef.current.children.length > 0) {
      containerRef.current.removeChild(containerRef.current.children[0]);
    }

    const ctrl = new GeocodingControl({
      accessToken: process.env.REACT_APP_MAP_TOKEN,
    });

    mapRef.current.on('load', () => {
      containerRef.current.appendChild(ctrl.onAdd(mapRef.current));
    });

    ctrl.on('result', (e) => {
      const coords = e.result.geometry.coordinates;
      dispatch({ type: 'FILTER_ADDRESS', payload: { lng: coords[0], lat: coords[1] } });
    });

    ctrl.on('clear', () => {
      dispatch({ type: 'CLEAR_ADDRESS' });
    });

    return () => {
      if (ctrl) {
        ctrl.remove(); 
      }
    };
  }, [mapRef, containerRef, dispatch]);

  return null;
};

export default GeoInput;
