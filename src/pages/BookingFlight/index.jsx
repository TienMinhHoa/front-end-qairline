import React, {useEffect, useState} from 'react';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    Typography
} from "@mui/material";
import {convertDateTime} from "@/utils/helpers/convertDateTime.js";
import {getAirportCodeLabel} from "@/utils/helpers/getAirportCodeLabel.js";
import {useParams} from "react-router";
import {getFlightByNumber} from "@/services/flight.js";
import {numberWithComas} from "@/utils/helpers/numberWithComas.js";
import {createBooking} from "@/services/booking.js";
import {createOrder} from "@/services/order.js";

const BookingFlight = () => {
    const flightId = useParams().id
    const [flight, setFlight] = useState({})
    const [seats, setSeats] = useState([])
    const [selectedSeats, setSelectedSeats] = useState([])
    const [paymentMethod, setPaymentMethod] = useState('')
    const [openDialog, setOpenDialog] = useState(false)
    const [alert, setAlert] = useState({
        open: false,
        severity: '',
        message: '',
    })

    const handleCloseDialog = () => {
        setOpenDialog(false)
        navigate(PATHS.myflight) // Navigate only after confirming
    }

    const handleCancelDialog = () => {
        setOpenDialog(false) // Simply close the dialog
    }

    const fetchFlight = async () => {
        try {
            const response = await getFlightByNumber(flightId)
            setFlight(response.data)
            console.log(response.data)
            setSeats(response.data.seats)
        } catch (error) {
            console.error('Failed to fetch flight: ', error)
        }
    }

    const calculateTotalPrice = (price) => {
        return selectedSeats.reduce(
            (total, seat) =>
                total + (seat.type === 'business' ? price + 2000000 : price),
            0
        )
    }

    const handleBooking = async () => {
        const payload = {
            flightId: flight._id,
            seats: selectedSeats,
        }
        try {
            const res = await createBooking(payload)
            const orderRes = await createOrder({
                booking: res.data.data,
                paymentMethod: paymentMethod,
            })
            if (orderRes.status === 201) {
                if (orderRes.data.data.banking) {
                    window.open(orderRes.data.data.banking.orderUrl, '_blank')
                } else {
                    setOpenDialog(true)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleChange = (event) => {
        const selectedSeatNumbers = event.target.value;
        const selectedSeatsDetails = seats.filter((seat) =>
            selectedSeatNumbers.includes(seat.seatNumber)
        );
        setSelectedSeats(selectedSeatsDetails);
    }

    const handleCloseAlert = () => {
        setAlert({...alert, open: false})
    }

    useEffect(() => {
        fetchFlight()
    }, [flightId])

    return (
        <div style={{padding: '20px'}}>
            <Typography
                textAlign="center"
                sx={{fontWeight: 'bold', fontSize: 32}}
            >
                Flight Booking
            </Typography>
            <div style={{display: "flex"}}>
                <Card sx={{minWidth: '600px', marginTop: '60px'}}>
                    <CardContent>
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Typography
                                textAlign="center"
                                gutterBottom
                                sx={{fontWeight: 'bold', fontSize: 22}}
                            >
                                Chọn thông tin để đặt vé
                            </Typography>
                        </Box>
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Seat number</InputLabel>
                            <Select
                                name="seat"
                                multiple
                                value={selectedSeats.map((seat) => seat.seatNumber)}
                                onChange={handleChange}
                                sx={{borderRadius: '50px'}}
                            >
                                <MenuItem value="">Choose seat number</MenuItem>
                                {flight.seats &&
                                    flight.seats
                                        .filter((seat) => seat.status === 'available')
                                        .map((seat, index) => (
                                            <MenuItem key={index} value={seat.seatNumber}>
                                                Seat number: {seat.seatNumber} - Type: {seat.type}
                                            </MenuItem>
                                        ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Payment method</InputLabel>
                            <Select
                                name="paymentMethod"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                sx={{borderRadius: '50px'}}
                            >
                                <MenuItem value="">Choose payment method</MenuItem>
                                <MenuItem value="cash">
                                    Cash
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </CardContent>
                </Card>
                <div style={{flexGrow: 1}}></div>
                <Card sx={{maxWidth: '600px', marginTop: '60px'}}>
                    <CardContent>
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Box
                                sx={{
                                    marginLeft: 2,
                                    minWidth: 500,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1.5, // Tạo khoảng cách giữa các dòng
                                }}
                            >
                                <Typography
                                    textAlign="center"
                                    gutterBottom
                                    sx={{fontWeight: 'bold', fontSize: 22}}
                                >
                                    Thông tin chi tiết
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{fontWeight: 'bold'}}
                                    >
                                        Số hiệu máy bay:
                                    </Typography>
                                    <Typography variant="body1">
                                        {flight.number}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{fontWeight: 'bold'}}
                                    >
                                        Điểm khởi hành:
                                    </Typography>
                                    <Typography variant="body1">
                                        {getAirportCodeLabel(flight.airportFrom)}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{fontWeight: 'bold'}}
                                    >
                                        Điểm đến:
                                    </Typography>
                                    <Typography variant="body1">
                                        {getAirportCodeLabel(flight.airportTo)}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{fontWeight: 'bold'}}
                                    >
                                        Thời gian khởi hành:
                                    </Typography>
                                    <Typography variant="body1">
                                        {convertDateTime(flight.departureTime)}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{fontWeight: 'bold'}}
                                    >
                                        Thời gian đến:
                                    </Typography>
                                    <Typography variant="body1">
                                        {convertDateTime(flight.arrivalTime)}
                                    </Typography>
                                </Box>

                                <Card
                                    variant="outlined"
                                    sx={{
                                        padding: 2,
                                        marginTop: 2,
                                        backgroundColor: '#f8f9fa',
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{fontWeight: 'bold', marginBottom: 1}}
                                    >
                                        Chỗ đã chọn
                                    </Typography>
                                    {/*{selectedSeats.length > 0 ? (*/}
                                    {/*    selectedSeats.map((seat) => (*/}
                                    {/*        <Typography key={seat.seatNumber}>*/}
                                    {/*            {`Chỗ ngồi ${seat.seatNumber} - `}*/}
                                    {/*            {seat.type === 'business'*/}
                                    {/*                ? `Hạng thương gia (${numberWithComas(flight.price + 2000000, '.')} đ)`*/}
                                    {/*                : `Hạng phổ thông (${numberWithComas(flight.price, '.')} đ)`}*/}
                                    {/*        </Typography>*/}
                                    {/*    ))*/}
                                    {/*) : (*/}
                                    {/*    <Typography color="text.secondary">*/}
                                    {/*        Chưa có chỗ nào được chọn*/}
                                    {/*    </Typography>*/}
                                    {/*)}*/}
                                </Card>

                                <Card
                                    variant="outlined"
                                    sx={{
                                        padding: 2,
                                        marginTop: 2,
                                        backgroundColor: '#e6ffe6',
                                        borderColor: 'green',
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 'bold',
                                            color: 'green',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Tổng tiền:{' '}
                                        {numberWithComas(
                                            calculateTotalPrice(flight.price),
                                            '.'
                                        )}{' '}
                                        đ
                                    </Typography>
                                </Card>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{marginTop: 2, padding: 1}}
                                    onClick={handleBooking}
                                >
                                    Đặt chỗ ngồi
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </div>
            <Snackbar
                open={alert.open}
                autoHideDuration={4000}
                onClose={handleCloseAlert}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                sx={{marginTop: 6}}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity={alert.severity}
                    sx={{width: '100%'}}
                >
                    {alert.message}
                </Alert>
            </Snackbar>

            <Dialog
                open={openDialog}
                onClose={handleCancelDialog}
                aria-labelledby="confirmation-dialog-title"
                aria-describedby="confirmation-dialog-description"
            >
                <DialogTitle id="confirmation-dialog-title">
                    Xác nhận thanh toán
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirmation-dialog-description">
                        Vui lòng đến điểm giao dịch gần nhất thanh toán với số tiền {numberWithComas(
                        calculateTotalPrice(flight.price),
                        '.'
                    )} VND
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDialog} color="inherit">
                        Hủy
                    </Button>
                    <Button
                        onClick={handleCloseDialog}
                        color="primary"
                        autoFocus
                        variant='contained'
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BookingFlight;
