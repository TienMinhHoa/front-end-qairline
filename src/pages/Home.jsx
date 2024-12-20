import { Box, Container, Typography, Card } from '@mui/material'
import { SearchFlight } from '@/components/search/SearchFlight.jsx'
import { ImageSlider } from '@/components/utils/ImageSlider.jsx'
import { News } from '@/components/utils/News.jsx'
import zIndex from '@mui/material/styles/zIndex'

const Home = () => {
    return (
        <>
            <Container
                sx={{
                    position: 'relative',
                    width: '90%',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: 3,
                    paddingBottom: 13,
                    // mb: '0px',
                    mt: '500px',
                    fontWeight: 'Bold',
                }}
            >
                {/* <img
                    alt="plane"
                    src="https://www.libertytravel.com/sites/default/files/styles/full_size/public/flight-hero.jpg?itok=LKyRwKDq"
                    style={{
                        width: '90%',
                        height: '50%',
                    }}
                /> */}
                <Box
                    mt={4}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        alignItems: 'center',
                        // backgroundColor: 'black',
                    }}
                >
                    <ImageSlider />
                    <Box
                        sx={{
                            zIndex: 9999,
                            backgroundColor: 'rgb(22,105,135,0.5)',
                            mt: '-100px',
                            borderRadius: '30px',
                        }}
                    >
                        <Typography
                            textAlign="center"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: 32,
                                color: 'white',
                                // mt: '-100px',
                                // zIndex: '9999',
                            }}
                        >
                            Search Flight
                        </Typography>
                        <SearchFlight />
                    </Box>
                </Box>
            </Container>

            <News />
        </>
    )
}

export default Home
