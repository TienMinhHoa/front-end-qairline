import React from 'react'
import { Box, Container, Grid, Link, Typography } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

function Footer() {
    return (
        <Box
            sx={{
                position: 'relative',
                bottom: 0,
                left: 0,
                width: '100vw',
                height: 'auto',
                backgroundColor: '#333',
                color: '#fff',
                display: 'flex',
                // justifyContent: 'center',
                // alignItems: 'center',
                zIndex: 1000,
                boxShadow: '0 -2px 5px rgba(0,0,0,0.2)',
                // mt: '100px',
            }}
        >
            <Container sx={{ padding: '0px 0px', mt: 0 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="body2">
                            We are a team of passionate developers creating
                            awesome applications.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <Link
                            href="/"
                            color="inherit"
                            sx={{ display: 'block', marginBottom: '0.5rem' }}
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            color="inherit"
                            sx={{ display: 'block', marginBottom: '0.5rem' }}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            color="inherit"
                            sx={{ display: 'block', marginBottom: '0.5rem' }}
                        >
                            Contact
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                maxWidth: '200px',
                                margin: '0 auto',
                            }}
                        >
                            <Link href="https://facebook.com" color="inherit">
                                <FacebookIcon />
                            </Link>
                            <Link href="https://twitter.com" color="inherit">
                                <TwitterIcon />
                            </Link>
                            <Link href="https://instagram.com" color="inherit">
                                <InstagramIcon />
                            </Link>
                            <Link href="https://linkedin.com" color="inherit">
                                <LinkedInIcon />
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
                <Box mt="3rem" textAlign="center">
                    <Typography variant="body2">©ViVu Airline</Typography>
                </Box>
            </Container>
        </Box>
    )
}

export default Footer
