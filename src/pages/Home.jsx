import {Box, Container, Typography} from '@mui/material'
import {SearchFlight} from "@/components/search/SearchFlight.jsx";

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
                    mb: '0px',
                    fontWeight: 'Bold',
                }}
            >
                <img alt='plane' src='https://www.libertytravel.com/sites/default/files/styles/full_size/public/flight-hero.jpg?itok=LKyRwKDq' style={{
                    width: '90%',
                    height: '500px',
                }} />
                <Box
                    mt={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        textAlign="center"
                        sx={{ fontWeight: 'bold', fontSize: 32 }}
                    >
                        Search Flight
                    </Typography>
                    <SearchFlight />
                </Box>
            </Container>
        </>
    )
}

export default Home
