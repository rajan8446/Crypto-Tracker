import React from 'react'
import { Container, Typography } from '@mui/material'
import './banner.css'
import Carousel from './Carousel'


const Banner = () => {
  // const classes = useStyles();
  return (
    <div className='banner'>
      <Container className='bannerContent'>
        <div className='tagline'>
          <Typography variant='h2' style={{ fontWeight: "bold", marginBottom: 15, fontFamily: "Montserrat" }}>
            Crypto Tracker

          </Typography>
          <Typography variant='subtitle2' style={{ color: "darkgrey", textTransform: "capitalize", fontFamily: "Montserrat" }}>
            Get All the info regarding your favourite Crypto Currency

          </Typography>
        </div>
        <Carousel/>

      </Container>
    </div>
  )
}

export default Banner