import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Box } from '@mui/material'

const images = ['/MerryChristmas.jpg']

export const ImageSlider = () => {
    const settings = {
        dots: true, // Show navigation dots
        infinite: true, // Enable infinite looping
        speed: 500, // Transition speed
        slidesToShow: 1, // Show one slide at a time
        slidesToScroll: 1, // Scroll one slide at a time
        autoplay: true, // Auto-switch slides
        autoplaySpeed: 3000, // 3 seconds interval
        pauseOnHover: true, // Pause on hover
    }

    return (
        <Box
            sx={{
                width: '75vw', // Frame width
                height: '75vh', // Frame height
                margin: 'auto', // Center horizontally
                // mt: , // Top margin
                border: '4px solid #ccc', // Border around the frame
                borderRadius: '12px', // Rounded corners
                overflow: 'hidden', // Ensure content stays within the frame
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)', // Add shadow
            }}
        >
            <Slider {...settings}>
                {images.map((image, index) => (
                    <Box key={index}>
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            style={{
                                width: '75vw', // Image takes full width of frame
                                height: '75vh', // Image takes full height of frame
                                objectFit: 'cover', // Scale image to fill frame without distortion
                            }}
                        />
                    </Box>
                ))}
            </Slider>
        </Box>
    )
}
