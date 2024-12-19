import { Container } from '@mui/material'

const Home = () => {
    return (
        <div
            style={{
                backgroundImage: 'url(/background.jpg)',
                fontWeight: 'Bold',
            }}
        >
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
                    // margin: '0 auto',
                    // backgroundColor: 'black',
                    // backgroundColor: 'rgb(255,255,255,0.5)',
                }}
            ></Container>
        </div>
    )
}

export default Home
