import React from 'react'
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import FlightLandIcon from '@mui/icons-material/FlightLand'
import ScheduleIcon from '@mui/icons-material/Schedule'
import LocalAirportIcon from '@mui/icons-material/LocalAirport'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { numberWithComas } from '@/utils/helpers/numberWithComas.js'
// import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
// import FlightLandIcon from '@mui/icons-material/FlightLand';
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import FlightIcon from '@mui/icons-material/Flight'
import StarIcon from '@mui/icons-material/Star'
import { Link, useNavigate } from 'react-router-dom'
import CheckIcon from '@mui/icons-material/Check'

export const FlightItem = ({
    flightNumber,
    departureTime,
    arrivalTime,
    airportFrom,
    airportTo,
    price,
}) => {
    const navigate = useNavigate()
    const handleOrder = () => {
        navigate(`/booking-flight/${flightNumber}`)
    }

    return (
        <Card
            sx={{ maxWidth: '100%', my: 2, boxShadow: 3, borderRadius: '30px' }}
        >
            <CardContent padding={0}>
                <Grid container spacing={2} alignItems="center">
                    {/* Left section - Flight times and airports */}
                    <Grid item xs={12} md={4} padding={1}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Box textAlign="center">
                                <Typography variant="h5">
                                    {departureTime}
                                </Typography>
                                <Typography variant="h6">
                                    {airportFrom}
                                </Typography>
                            </Box>
                            <Box
                                padding={1}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                flex={1}
                            >
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Straight
                                </Typography>
                                <Box
                                    width="100%"
                                    borderTop={1}
                                    borderStyle="dotted"
                                    borderColor="grey.300"
                                    my={1}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="h5">
                                    {arrivalTime}
                                </Typography>
                                <Typography variant="h6">
                                    {airportTo}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Middle section - Flight details */}
                    <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{
                            borderLeft: { md: 1 },
                            borderRight: { md: 1 },
                            borderColor: 'grey.300',
                        }}
                    >
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <FlightIcon color="action" />
                                <Typography variant="body2">
                                    <strong>{flightNumber}</strong> Manage by
                                    QAirline
                                </Typography>
                            </Box>
                            <Button
                                color="primary"
                                sx={{
                                    alignSelf: 'flex-start',
                                    textTransform: 'none',
                                    color: '#0E4F4F',
                                }}
                            >
                                Details about the trip
                            </Button>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={4}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-start"
                            gap={2}
                        >
                            <Box
                                bgcolor="primary.main"
                                color="primary.contrastText"
                                p={2}
                                borderRadius={1}
                                sx={{
                                    borderRadius: '50px',
                                    backgroundColor: '#77DADA',
                                    color: '#0E4F4F',
                                }}
                            >
                                <Typography variant="subtitle2">
                                    Classic
                                </Typography>
                                <Typography variant="h5" fontWeight="bold">
                                    {numberWithComas(price, '.')} VND
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-end"
                            gap={2}
                        >
                            <Button
                                sx={{
                                    borderRadius: '30px',
                                    backgroundColor: 'yellow',
                                    '&:hover': {
                                        backgroundColor: '#0E4F4F',
                                        color: 'white',
                                    },
                                }}
                                variant="outlined"
                                size="large"
                                onClick={handleOrder}
                            >
                                <CheckIcon />

                                <Typography variant="subtitle2">
                                    Book
                                </Typography>
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
