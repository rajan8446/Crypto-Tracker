import React, { useEffect, useState } from 'react'
import './carousel.css'
import axios from 'axios'
import { TrendingCoins } from '../../config/api'
import { CryptoState } from '../../CryptoContext'
import AliceCarousel, { Link } from 'react-alice-carousel'

export function numberWithComms(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
} 

const Carousel = () => {
    const [trending, setTrending] = useState([])
    const { currency,symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        try {
          const { data } = await axios.get(TrendingCoins(currency));
          setTrending(data);
        } 
        catch (error) {
          console.error(error.message);
        }

    }
    console.log(trending)
    useEffect(() => {
        fetchTrendingCoins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const items = trending.map((coins)=>{
        let profit = coins.price_change_percentage_24h >=0;
        return (
            <Link className='link'
             to={`/coins/${coins.id}`}>
                <img src={coins?.image}
                alt={coins.name}
                height="80"
                style={{marginBottom:10}}
                />
                <span>{coins?.symbol}&nbsp;<span style={{color: profit>0? "rgb(14,203,129)":"red" , fontWeight:"700"}}>{profit && "+"} {coins?.price_change_percentage_24h?.toFixed(2)}%</span></span>

                <span style={{fontSize:22, fontWeight:500,}}>{symbol}{""}{numberWithComms(coins?.current_price.toFixed(2))}</span>
            </Link>
        )
    })

    const responsive = {
      0: { items: 2 },
      512: { items: 4 },
      900: { items: 5 },
    };
    return (
        <div className='carousel'>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={2000}
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
                
            />
        </div>
    )
}

export default Carousel