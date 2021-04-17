import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import img1 from "../assets/17947.jpg";
import img2 from "../assets/3784896.jpg";
import img3 from "../assets/19199620.jpg";

const ProductCarousel = () => {
  
  return(
    <Carousel pause='hover' className='bg-dark'>
        <Carousel.Item>
            <Image src={img2} alt="img" fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Innovation meets Creativity
              </h2>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <Image src={img1} alt="img" fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Interactive Learning
              </h2>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <Image src={img3} alt="img" fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Immersive Experience
              </h2>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
  )
}

export default ProductCarousel
