import React, { useState, useEffect } from 'react'
import {
    Container,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    TablePagination,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material'

import { DeleteOrderModal } from '@/components/modals/order/DeleteOrderModal'
import { EditOrderModal } from '@/components/modals/order/EditOrderModal'

import { createSvgIcon } from '@mui/material/utils'
import DeleteIcon from '@mui/icons-material/Delete'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { deleteOrder, getListOrders } from '@/services/order.js'

const PlusIcon = createSvgIcon(
    // credit: plus icon from https://heroicons.com
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 2 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
        />
    </svg>,
    'Plus'
)

const initialRows = []

export default function YourFligt() {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [orders, setOrders] = useState([])
    const paginationModel = { page: page, pageSize: 10 }

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
            const response = await getListOrders(pagination)
            setOrders(
                response.data.map((res) => ({
                    ...res,
                    id: res._id,
                    airline: 'QAirline',
                }))
            )
            // console.log(posts)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchOrderData(paginationModel)
    }, [])

    const handleEditOrder = async (data) => {
        try {
            await updateOrder(data.id, data)
            await fetchOrderData(paginationModel)
        } catch (e) {
            console.log(e)
        }
    }

    const handleDeleteOrder = async (data) => {
        try {
            await deleteOrder(data.id)
            await fetchOrderData(paginationModel)
        } catch (e) {
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
                            sx={{ backgroundColor: 'rgb(255,255,255,0.5)' }}
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
                                        Code
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
                                        Booking Id
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
                                        Total quantity
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
                                        Total price
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
                                {orders
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell
                                                sx={{
                                                    maxWidth: '100px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                                onClick={() =>
                                                    handleCopy(row.code)
                                                }
                                            >
                                                {row.code}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    maxWidth: '100px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                                onClick={() =>
                                                    handleCopy(row.bookingId)
                                                }
                                            >
                                                {row.bookingId}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    maxWidth: '100px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {row.totalQuantity}
                                            </TableCell>
                                            <TableCell>
                                                {row.totalPrice}
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
                                                    color="primary"
                                                    onClick={() => {
                                                        setEditingOrder(row)
                                                        setIsEditModalOpen(true)
                                                    }}
                                                    sx={{
                                                        width: '100px',
                                                        backgroundColor:
                                                            '#77DADA',
                                                        color: '#0E4F4F',
                                                        borderRadius: '20px',
                                                        '&:hover': {
                                                            backgroundColor:
                                                                '#0E4F4F',
                                                            color: 'white',
                                                        },
                                                    }}
                                                >
                                                    <BorderColorIcon />
                                                    Update
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => {
                                                        setDeletingOrder(row)
                                                        setIsDeleteModalOpen(
                                                            true
                                                        )
                                                    }}
                                                    sx={{
                                                        width: '100px',
                                                        backgroundColor:
                                                            '#FF6B6B',
                                                        color: 'white',
                                                        borderRadius: '20px',
                                                        '&:hover': {
                                                            backgroundColor:
                                                                '#FF3B3B',
                                                        },
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                    Delete
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
                        count={orders.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
        </div>
    )
}
