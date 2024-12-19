import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'

const MainLayout = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh', // Full chiều cao màn hình
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'transparent',
                    color: '#fff',
                    textAlign: 'center',
                }}
            >
                <Header />
            </Box>

            <Box
                style={{
                    flex: 1,
                    // minHeight: 'calc(100vh - 110px)',
                    paddingTop: '50px',
                    backgroundColor: '#f4f4f4',
                    // paddingBottom: '200px',
                    width: '100vw',
                    // paddingBottom: '100px',
                }}
            >
                <Outlet />
            </Box>
            <Box
                sx={{
                    backgroundColor: 'black',
                    // padding: '10px',
                    textAlign: 'center',
                    bottom: 0,
                }}
            >
                <Footer />
            </Box>
        </Box>
    )
}

export default MainLayout
