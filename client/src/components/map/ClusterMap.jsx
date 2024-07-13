import React, { useEffect, useState, useRef } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { getRooms } from '../../actions/room';
import { useValue } from '../../context/ContextProvider';
import Supercluster from 'supercluster';

const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
});

const ClusterMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const mapboxAccessToken = process.env.REACT_APP_MAP_TOKEN;

  const {
    state: { filteredRooms, priceFilter },
    dispatch,
  } = useValue();

  const [points, setPoints] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    getRooms(dispatch); 
  }, [dispatch]);

  useEffect(() => {
    const points = filteredRooms.map((room) => ({
      type: 'Feature',
      properties: {
        cluster: false,
        roomId: room._id,
        price: room.price,
        title: room.title,
        description: room.description,
        lng: room.lng,
        lat: room.lat,
        images: room.images,
        uPhoto: room.uPhoto,
        uName: room.uName,
      },
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(room.lng), parseFloat(room.lat)],
      },
    }));
    setPoints(points);
  }, [filteredRooms]);

  useEffect(() => {
    supercluster.load(points);
    setClusters(supercluster.getClusters(bounds, zoom));
  }, [points, bounds, zoom]);

  useEffect(() => {
    if (!map.current) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/basic/style.json?key=${mapboxAccessToken}`,
        center: [0.1276, 51.5072], 
        zoom: 8,
      });

      map.current.on('moveend', () => {
        const newBounds = map.current.getBounds().toArray().flat();
        setBounds(newBounds);
        setZoom(Math.round(map.current.getZoom()));
      });

      map.current.on('zoomend', () => {
        setZoom(Math.round(map.current.getZoom()));
      });
    }
  }, [mapboxAccessToken]);

  useEffect(() => {
    markers.forEach(marker => marker.remove());
    setMarkers([]);

    clusters.forEach((cluster) => {
      const { cluster: isCluster, point_count } = cluster.properties;
      const [longitude, latitude] = cluster.geometry.coordinates;

      if (!isCluster) {
        const room = filteredRooms.find(room => room._id === cluster.properties.roomId);
        if (room && room.price <= priceFilter) {
          const markerElement = document.createElement('div');
          const tooltipElement = document.createElement('div');
          tooltipElement.className = 'tooltip';
          tooltipElement.innerHTML = `
            <div style="position: relative;">
              <div style="display: inline-block;">
                <img src="${room.uPhoto}" style="width: 40px; height: 40px; border-radius: 50%;" />
              </div>
              <div style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); background-color: white; padding: 5px; border: 1px solid #ccc; border-radius: 3px; white-space: nowrap; display: none;">
                ${room.uName}
              </div>
            </div>
          `;
  
          const avatarElement = tooltipElement.querySelector('img');
          const nameElement = tooltipElement.querySelector('div[style*="bottom: 100%"]');
  
          markerElement.appendChild(tooltipElement);
  
          const marker = new maptilersdk.Marker({ element: markerElement })
            .setLngLat([longitude, latitude])
            .addTo(map.current);
  
          markerElement.addEventListener('mouseenter', () => {
            nameElement.style.display = 'block';
          });
          markerElement.addEventListener('mouseleave', () => {
            nameElement.style.display = 'none';
          });

          setMarkers(prevMarkers => [...prevMarkers, marker]);
        }
      }
    });

    return () => {
      markers.forEach(marker => marker.remove());
    };
  }, [clusters, filteredRooms, priceFilter]);

  return <div ref={mapContainer} style={{ width: '100%', height: '615px' }} />;
};

export default ClusterMap;


