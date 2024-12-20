import React, {useEffect, useState} from 'react'
import {
    Alert,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Link,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material'

import {DeleteOrderModal} from '@/components/modals/order/DeleteOrderModal'
import {EditOrderModal} from '@/components/modals/order/EditOrderModal'
import {getOrderByBookingId} from '@/services/order.js'
import {useNavigate} from "react-router-dom";
import {cancelBooking, getListBookings} from "@/services/booking.js";
import {getFlightById} from "@/services/flight.js";
import {useSelector} from "react-redux";

export default function YourFligt() {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [orders, setOrders] = useState([])
    const [flights, setFlights] = useState([])
    const paginationModel = {page: page, pageSize: 20, perPage: 20}
    const {user} = useSelector((state) => state.auth)
    const [alert, setAlert] = useState({
        open: false,
        severity: '',
        message: '',
    })
    const navigate = useNavigate()

    const [editingOrder, setEditingOrder] = useState(null)
    const [deletingOrder, setDeletingOrder] = useState(null)
    const [editOrder, setEditOrder] = useState(null)

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const [open, setOpen] = useState(false)
    const [copiedText, setCopiedText] = useState('')

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
        setCopiedText(text)
        setOpen(true)
        setTimeout(() => {
            setOpen(false)
        }, 2000) // Dialog sẽ tự động tắt sau 2 giây
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const fetchOrderData = async (pagination) => {
        try {
            const response = await getListBookings(pagination)
            const bookings = response.data
            const flightIds = [
                ...new Set(bookings.map((booking) => booking.flightId)),
            ]
            const bookingIds = [
                ...new Set(bookings.map((booking) => booking._id)),
            ]
            const flightDetails = await Promise.all(
                flightIds.map(async (flightId) => {
                    const flightResponse = await getFlightById(flightId)
                    return {
                        id: flightId,
                        flightCode: flightResponse.data.planeCode,
                        flightNumber: flightResponse.data.number,
                    }
                })
            )
            const orderDetails = await Promise.all(
                bookingIds.map(async (bookingId) => {
                    const res = await getOrderByBookingId(bookingId)
                    return {
                        id: bookingId,
                        orderCode:
                            res.data && res.data.code
                                ? res.data.code
                                : "Don't have payment code",
                    }
                })
            )
            const flightMap = flightDetails.reduce((acc, flight) => {
                acc[flight.id] = {
                    flightCode: flight.flightCode,
                    flightNumber: flight.flightNumber,
                }
                return acc
            }, {})
            const orderMap = orderDetails.reduce((acc, order) => {
                acc[order.id] = {
                    orderCode: order.orderCode,
                }
                return acc
            }, {})
            const bookingsWithFlightCode = bookings.map((booking) => ({
                ...booking,
                flightCode: flightMap[booking.flightId].flightCode,
                flightNumber: flightMap[booking.flightId].flightNumber,
                orderCode: orderMap[booking._id].orderCode,
            }))
            setFlights(
                bookingsWithFlightCode.map((booking) => ({
                    ...booking,
                    id: booking._id,
                }))
            )
            console.log(
                bookingsWithFlightCode.map((booking) => ({
                    ...booking,
                    id: booking._id,
                }))
            )
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchOrderData({...paginationModel, userId: user._id})
    }, [])

    const handleEditOrder = async (data) => {
        try {
            // await updateOrder(data.id, data)
            await fetchOrderData(paginationModel)
        } catch (e) {
            console.log(e)
        }
    }

    const handleCloseAlert = () => {
        setAlert({...alert, open: false})
    }

    const handleDeleteOrder = async (data) => {
        try {
            const response = await cancelBooking(data.id)
            await fetchOrderData({...paginationModel, userId: user._id})
            setAlert({
                open: true,
                severity: 'success',
                message: 'Cancel booking successfully',
            })
        } catch (e) {
            setAlert({
                open: true,
                severity: 'error',
                message: 'Tickets can only be cancelled within 1 day of booking',
            })
            console.log(e)
        }
    }

    return (
        <div
            style={{
                backgroundImage: 'url(/background.jpg)',
                fontWeight: 'Bold',
            }}
        >
            <Container
                sx={{
                    width: '100%',
                    height: '85vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: 3,
                }}
            >
                <Paper
                    sx={{
                        width: '100%',
                        height: '100%',
                        overflow: 'auto',
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    }}
                >
                    <TableContainer
                        sx={{
                            maxHeight: '75vh',
                        }}
                    >
                        <Table
                            sx={{backgroundColor: 'rgb(255,255,255,0.5)'}}
                            stickyHeader
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 1,
                                            backgroundColor:
                                                'rgb(255,255,255,0.5)',
                                        }}
                                    >
                                        Flight Number
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 1,
                                            backgroundColor:
                                                'rgb(255,255,255,0.5)',
                                        }}
                                    >
                                        Plane Code
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 1,
                                            backgroundColor:
                                                'rgb(255,255,255,0.5)',
                                        }}
                                    >
                                        Order Code
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 1,
                                            backgroundColor:
                                                'rgb(255,255,255,0.5)',
                                        }}
                                    >
                                        Status
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 1,
                                            backgroundColor:
                                                'rgb(255,255,255,0.5)',
                                        }}
                                    >
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {flights
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell
                                                sx={{
                                                    maxWidth: '100px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                                onClick={() => navigate(`/booking-flight/${row.flightNumber}`)}
                                            >
                                                <Link to={`/booking-flight/${row.flightNumber}`}>
                                                    {row.flightNumber}
                                                </Link>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    maxWidth: '100px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {row.flightCode}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    maxWidth: '100px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                                onClick={() => handleCopy(row.orderCode)}
                                            >
                                                {row.orderCode}
                                            </TableCell>
                                            <TableCell>{row.status}</TableCell>
                                            <TableCell
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '8px',
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => {
                                                        setDeletingOrder(row)
                                                        setIsDeleteModalOpen(true)
                                                    }}
                                                    sx={{
                                                        width: '100px',
                                                        backgroundColor: '#FF6B6B',
                                                        color: 'white',
                                                        borderRadius: '20px',
                                                        '&:hover': {
                                                            backgroundColor: '#FF3B3B',
                                                        },
                                                    }}
                                                    disabled={row.status !== 'completed'}
                                                >
                                                    Cancel
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                        <Dialog open={open} onClose={() => setOpen(false)}>
                            <DialogTitle>Copied to Clipboard</DialogTitle>
                            <DialogContent>
                                <p>{copiedText}</p>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpen(false)}>
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </TableContainer>
                    <EditOrderModal
                        open={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        onSave={handleEditOrder}
                        orderData={editingOrder}
                    />

                    <DeleteOrderModal
                        open={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onSave={handleDeleteOrder}
                        orderData={deletingOrder}
                    />
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={flights.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
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
        </div>
    )
}
