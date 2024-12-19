import React from 'react'
import { Box, Grid, Paper, Typography } from '@mui/material'

const Dashboard = () => {
    return (
        <Box
            sx={{
                padding: '20px',
                backgroundColor: '#f9f9f9',
                minHeight: '100vh',
            }}
        >
            {/* Header */}
            <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                Dashboard
            </Typography>

            {/* Widgets */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Total Users</Typography>
                        <Typography variant="h3" color="primary">
                            1,234
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Revenue</Typography>
                        <Typography variant="h3" color="success.main">
                            $12,345
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">New Orders</Typography>
                        <Typography variant="h3" color="secondary">
                            567
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Charts Section */}
            <Box sx={{ marginTop: '30px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ padding: '20px' }}>
                            <Typography variant="h6">Sales Overview</Typography>
                            {/* Add your chart component here */}
                            <Box
                                sx={{
                                    height: '200px',
                                    backgroundColor: '#e0e0e0',
                                }}
                            >
                                Chart Placeholder
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ padding: '20px' }}>
                            <Typography variant="h6">User Activity</Typography>
                            {/* Add your chart component here */}
                            <Box
                                sx={{
                                    height: '200px',
                                    backgroundColor: '#e0e0e0',
                                }}
                            >
                                Chart Placeholder
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            {/* Data Table Section */}
            <Box sx={{ marginTop: '30px' }}>
                <Paper sx={{ padding: '20px' }}>
                    <Typography variant="h6">Recent Transactions</Typography>
                    {/* Add your table component here */}
                    <Box
                        sx={{
                            marginTop: '10px',
                            backgroundColor: '#e0e0e0',
                            height: '150px',
                        }}
                    >
                        Table Placeholder
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}

export default Dashboard
