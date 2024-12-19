import {useEffect, useState} from 'react';
import {Alert, Box, Button, Card, CardContent, Divider, Snackbar, Typography} from "@mui/material";
import {convertDateTime} from "@/utils/helpers/convertDateTime.js";
import {getAirportCodeLabel} from "@/utils/helpers/getAirportCodeLabel.js";
import {useParams} from "react-router";
import {getFlightByNumber} from "@/services/flight.js";
import {numberWithComas} from "@/utils/helpers/numberWithComas.js";

const BookingFlight = () => {
    const flightId = useParams().id
    const [flight, setFlight] = useState({})
    const [seats, setSeats] = useState([])
    const [selectedSeats, setSelectedSeats] = useState([])
    const [alert, setAlert] = useState({
        open: false,
        severity: '',
        message: '',
    })

    const fetchFlight = async () => {
        try {
            const response = await getFlightByNumber(flightId)
            setFlight(response.data)
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

    const handleBooking = () => {

    }

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false })
    }

    useEffect(() => {
        fetchFlight()
    }, [flightId])

    return (
        <div style={{padding: '20px'}}>
            <Typography
                textAlign="center"
                sx={{ fontWeight: 'bold', fontSize: 32 }}
            >
                Flight Booking
            </Typography>
            <div style={{display: "flex"}}>
                <div>Form</div>
                <div style={{flexGrow: 1}}></div>
                <Card sx={{ maxWidth: '600px', marginTop: '60px' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                                    sx={{ fontWeight: 'bold', fontSize: 22 }}
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
                                        sx={{ fontWeight: 'bold' }}
                                    >
                                        ✈️ Số hiệu máy bay:
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
                                        sx={{ fontWeight: 'bold' }}
                                    >
                                        📍 Điểm khởi hành:
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
                                        sx={{ fontWeight: 'bold' }}
                                    >
                                        📍 Điểm đến:
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
                                        sx={{ fontWeight: 'bold' }}
                                    >
                                        ⏰ Thời gian khởi hành:
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
                                        sx={{ fontWeight: 'bold' }}
                                    >
                                        ⏰ Thời gian đến:
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
                                        sx={{ fontWeight: 'bold', marginBottom: 1 }}
                                    >
                                        🪑 Chỗ đã chọn
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
                                        💰 Tổng tiền:{' '}
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
                                    sx={{ marginTop: 2, padding: 1 }}
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
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{ marginTop: 6 }}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity={alert.severity}
                    sx={{ width: '100%' }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default BookingFlight;
