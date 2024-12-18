import React from 'react'
import { CssBaseline, Box, Container } from '@mui/material'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <>
            <CssBaseline /> {/* Resets browser styling */}
            <Box
                display="flex"
                flexDirection="column"
                minWidth="100vw"
                minHeight="100vh"
            >
                <Header />
                <Outlet />
                <Footer />
            </Box>
        </>
    )
}

export default MainLayout
