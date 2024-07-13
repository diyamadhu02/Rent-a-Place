
import React from 'react';
import { Card, ImageListItem, ImageListItemBar } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Lazy, Pagination } from 'swiper/core';
import 'swiper/swiper-bundle.min.css';
import { useValue } from '../../context/ContextProvider';

SwiperCore.use([Autoplay, Lazy, Pagination]);

const PopupRoom = ({ popupInfo }) => {
  const { title, description, price, images } = popupInfo;
  const { dispatch } = useValue();

  return (
    <Card sx={{ maxWidth: 400 }}>
      <ImageListItem sx={{ display: 'block' }}>
        <ImageListItemBar
          sx={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
            zIndex: 2,
          }}
          title={price === 0 ? 'Free Stay' : `$${price}`}
          position="top"
        />
        <ImageListItemBar
          title={title}
          subtitle={description.substr(0, 30) + '...'}
          sx={{ zIndex: 2 }}
        />
        <Swiper
          modules={[Autoplay, Pagination, Lazy]}
          autoplay
          lazy
          pagination={{ clickable: true }}
          style={{
            '--swiper-pagination-color': 'rgba(255,255,255, 0.8)',
            '--swiper-pagination-bullet-inactive-color': '#fff',
            '--swiper-pagination-bullet-inactive-opacity': 0.5,
          }}
        >
          {images.map((url) => (
            <SwiperSlide key={url}>
              <img
                src={url}
                alt="room"
                style={{
                  height: 255,
                  display: 'block',
                  overflow: 'hidden',
                  width: '100%',
                  cursor: 'pointer',
                  objectFit: 'cover',
                }}
                onClick={() => dispatch({ type: 'UPDATE_ROOM', payload: popupInfo })}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </ImageListItem>
    </Card>
  );
};

export default PopupRoom;
