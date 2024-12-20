import React from 'react'
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Grid,
    ThemeProvider,
    createTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    InputAdornment,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { getListOrders } from '@/services/order'
import { numberWithComas } from '@/utils/helpers/numberWithComas'
import { getFlightById } from '@/services/flight'
import { getBookingById } from '@/services/booking'
import { getAirportCodeLabel } from '@/utils/helpers/getAirportCodeLabel'
import { convertDateTime } from '@/utils/helpers/convertDateTime'

const theme = createTheme({
    palette: {
        primary: {
            main: '#058CB3',
        },
    },
})

const SearchOrder = () => {
    const [orderID, setOrderID] = React.useState('')
    const [error, setError] = React.useState('')
    const [flightData, setFlightData] = React.useState(null) // State để lưu thông tin chuyến bay
    const [flightData2, setFlightData2] = React.useState(null) // State để lưu thông tin chuyến bay
    const [flightData3, setFlightData3] = React.useState(null) // State để lưu thông tin chuyến bay
    const [openDialog, setOpenDialog] = React.useState(false) // State để điều khiển dialog

    const handleSearch = async () => {
        if (!orderID) {
            setError('You must fill the code')
            return
        }

        setError('')
        try {
            const response = await getListOrders({ code: orderID })
            setFlightData(response)
            if (response.totalPages !== 0) {
                await fetchBooking(response.data[0].bookingId)
            }
            setOpenDialog(true)
        } catch (error) {
            console.error('Failed to fetch order: ', error)
        }
    }

    const fetchBooking = async (bookingId) => {
        try {
            const response = await getBookingById(bookingId)
            setFlightData2(response.data)
            await fetchFlight(response.data.flightId)
        } catch (error) {
            console.error('Failed to fetch booking: ', error)
        }
    }

    const fetchFlight = async (flightId) => {
        try {
            const response = await getFlightById(flightId)
            setFlightData3(response.data)
        } catch (error) {
            console.error('Failed to fetch flight: ', error)
        }
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    return (
        <ThemeProvider theme={theme}>
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    maxWidth: 900,
                    margin: 'auto',
                    marginTop: '100px',
                    borderRadius: '30px',
                }}
            >
                {/*<Grid container spacing={3}>*/}
                {/* Left Section: Search Form */}
                {/*<Grid item xs={12} md={6}>*/}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        marginBottom: 2,
                        color: 'Black',
                    }}
                >
                    Search the Ordered Flight
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ marginBottom: 3 }}
                >
                    Fill the information below to search your flight
                </Typography>

                {/* Form Inputs */}
                <Box component="form" autoComplete="off">
                    <TextField
                        fullWidth
                        required
                        label="Code of order"
                        variant="outlined"
                        margin="normal"
                        value={orderID}
                        onChange={(e) => setOrderID(e.target.value)}
                        error={Boolean(error)} // Hiển thị trạng thái lỗi
                        helperText={error} // Thông báo lỗi
                        InputProps={{
                            sx: { borderRadius: '30px' },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            marginTop: 2,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            borderRadius: '30px',
                            backgroundColor: '#77DADA',
                            color: '#0E4F4F',
                            '&:hover': {
                                backgroundColor: '#0E4F4F',
                                color: 'white',
                            },
                        }}
                        size="large"
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </Box>
                {/*</Grid>*/}

                {/* Right Section: Advertisement */}
                {/*<Grid item xs={12} md={6} container justifyContent="center">*/}
                {/*    <Box*/}
                {/*        sx={{*/}
                {/*            backgroundImage:*/}
                {/*                "url('https://t4.ftcdn.net/jpg/03/54/53/97/360_F_354539710_LHYPvjj0uEQk0OptcUDzrPzUo9hAoTX0.jpg')",*/}
                {/*            backgroundSize: 'cover',*/}
                {/*            borderRadius: 2,*/}
                {/*            height: '100%',*/}
                {/*            width: '100%',*/}
                {/*            position: 'relative',*/}
                {/*            display: 'flex',*/}
                {/*            alignItems: 'center',*/}
                {/*            justifyContent: 'center',*/}
                {/*            padding: 2,*/}
                {/*            textAlign: 'center',*/}
                {/*            color: '#fff',*/}
                {/*            fontWeight: 'bold',*/}
                {/*        }}*/}
                {/*    ></Box>*/}
                {/*</Grid>*/}
                {/*</Grid>*/}
            </Paper>

            {/* Dialog for Flight Details */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>
                    <Typography
                        sx={{
                            color: '#058CB3',
                            fontWeight: 'bold',
                            fontSize: 20,
                        }}
                    >
                        Thông tin chuyến bay
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    {flightData?.totalPages != 0 ? (
                        <Box>
                            <Typography>
                                <strong>Mã chuyến bay:</strong>{' '}
                                {flightData?.data[0]?.code}
                            </Typography>

                            <Typography variant="body1">
                                <strong>Chuyến đi:</strong>{' '}
                                {getAirportCodeLabel(flightData3?.airportFrom)}{' '}
                                → {getAirportCodeLabel(flightData3?.airportTo)}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Thời gian khởi hành:</strong>{' '}
                                {convertDateTime(flightData3?.departureTime)}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Thời gian đến:</strong>{' '}
                                {convertDateTime(flightData3?.arrivalTime)}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Số ghế đã đặt:</strong>{' '}
                                {flightData?.data[0]?.totalQuantity}
                            </Typography>
                            {flightData2?.seats.map((seat) => {
                                console.log('seat', seat)
                                return (
                                    <Typography variant="body1">
                                        <strong>Ghế:</strong> {seat.seatNumber}{' '}
                                        - <strong>Hạng:</strong> {seat.type}
                                    </Typography>
                                )
                            })}
                            <Typography>
                                <strong>Tổng giá tiền:</strong>{' '}
                                {numberWithComas(
                                    flightData?.data[0]?.totalPrice,
                                    '.'
                                )}{' '}
                                VND
                            </Typography>
                        </Box>
                    ) : (
                        <Typography>
                            Không tìm thấy thông tin chuyến bay.
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    )
}

export default SearchOrder
