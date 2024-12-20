import React, { useState } from 'react'
import {
    Box,
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
} from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'

const highlights = [
    {
        title: "Vietnam Airlines' App",
        description:
            "Travelling is easier than ever with Vietnam Airlines' App.",
        image: 'https://www.vietnamairlines.com/~/media/ContentImage/Hightlight/Treem_Dimotminh_Thumb.jpg',
    },
    {
        title: 'Online check-in',
        description:
            'Available on domestic and international flights operated by Vietnam Airlines Group.',
        image: 'https://www.vietnamairlines.com/~/media/ContentImage/Hightlight/overview01.jpg',
    },
    {
        title: 'Special services',
        description:
            "Vietnam Airlines provides special services catering to passengers' needs.",
        image: 'https://www.vietnamairlines.com/~/media/ContentImage/Hightlight/Treem_Dimotminh_Thumb.jpg',
    },
    {
        title: 'Special services',
        description:
            "Vietnam Airlines provides special services catering to passengers' needs.",
        image: 'https://www.vietnamairlines.com/~/media/ContentImage/Hightlight/Treem_Dimotminh_Thumb.jpg',
    },
    {
        title: 'Special services',
        description:
            "Vietnam Airlines provides special services catering to passengers' needs.",
        image: 'https://www.vietnamairlines.com/~/media/ContentImage/Hightlight/Treem_Dimotminh_Thumb.jpg',
    },
    {
        title: 'Special services',
        description:
            "Vietnam Airlines provides special services catering to passengers' needs.",
        image: 'https://www.vietnamairlines.com/~/media/ContentImage/Hightlight/Treem_Dimotminh_Thumb.jpg',
    },
]

export const News = () => {
    const [activeSlide, setActiveSlide] = useState(0)

    const handleNext = () => {
        setActiveSlide((prev) => (prev + 1) % highlights.length)
    }

    const handlePrev = () => {
        setActiveSlide(
            (prev) => (prev - 1 + highlights.length) % highlights.length
        )
    }

    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
            <Typography
                variant="h2"
                sx={{
                    textAlign: 'center',
                    mb: 4,
                    fontSize: '2.5rem',
                    fontWeight: 'light',
                }}
            >
                Highlight
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    overflow: 'hidden',
                    position: 'relative',
                    mx: 'auto',
                    maxWidth: '1200px',
                }}
            >
                {highlights.map((highlight, index) => (
                    <Card
                        key={index}
                        sx={{
                            minWidth: 300,
                            flex: 1,
                            transform: `translateX(${index - activeSlide}%)`,
                            transition: 'transform 0.5s ease-in-out',
                            position: 'relative',
                            // padding: 0,
                            bgcolor: 'transparent',
                            boxShadow: 'none',
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="250px"
                            image={highlight.image}
                            alt={highlight.title}
                            sx={{ borderRadius: 2 }}
                        />
                        <CardContent
                            sx={{
                                bgcolor: 'rgba(240, 248, 255, 0.8)',
                                mt: 2,
                                borderRadius: 1,
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#0056b3',
                                    fontWeight: 'medium',
                                    mb: 1,
                                }}
                            >
                                {highlight.title}
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#666' }}>
                                {highlight.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 1,
                    mt: 3,
                }}
            >
                {highlights.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: activeSlide === index ? '#0056b3' : '#ddd',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                        }}
                    />
                ))}
            </Box>

            <IconButton
                onClick={handlePrev}
                sx={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'white',
                    '&:hover': { bgcolor: 'white' },
                }}
            >
                <KeyboardArrowLeft />
            </IconButton>

            <IconButton
                onClick={handleNext}
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'white',
                    '&:hover': { bgcolor: 'white' },
                }}
            >
                <KeyboardArrowRight />
            </IconButton>
        </Box>
    )
}
