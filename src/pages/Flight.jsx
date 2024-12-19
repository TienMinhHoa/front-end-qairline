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
} from '@mui/material'
import { CreateFlightModal } from '@/components/modals/flight/CreateFlightModal.jsx'
import { EditFlightModal } from '@/components/modals/flight/EditFlightModal.jsx'
import { DeleteFlightModal } from '@/components/modals/flight/DeleteFlightModal'

import { createSvgIcon } from '@mui/material/utils'
import DeleteIcon from '@mui/icons-material/Delete'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import {
    createFlight,
    deleteFlight,
    getListFlights,
    updateFlight,
} from '@/services/flight.js'
import { getAirportCodeLabel } from '@/utils/helpers/getAirportCodeLabel'
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

export default function Flight() {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [flights, setFlights] = useState([])
    const paginationModel = { page: page, pageSize: 10 }

    const [editingFlight, setEditingFlight] = useState(null)
    const [deletingFlight, setDeletingFlight] = useState(null)

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const openCreateModal = () => {
        setIsCreateModalOpen(true)
    }

    const fetchFlightData = async (pagination) => {
        try {
            const response = await getListFlights(pagination)
            setFlights(
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
        fetchFlightData(paginationModel)
    }, [])

    const handleCreateFlight = async (data) => {
        try {
            await createFlight(data)
            await fetchFlightData(paginationModel)
        } catch (e) {
            console.log(e)
        }
    }

    const handleEditFlight = async (data) => {
        try {
            await updateFlight(data.id, data)
            await fetchFlightData(paginationModel)
        } catch (e) {
            console.log(e)
        }
    }

    const handleDeleteFlight = async (data) => {
        try {
            await deleteFlight(data.id)
            await fetchFlightData(paginationModel)
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
                    // margin: '0 auto',
                    // backgroundColor: 'black',
                    // backgroundColor: 'rgb(255,255,255,0.5)',
                }}
            >
                <Button
                    variant="contained"
                    href="#contained-buttons"
                    sx={{
                        mb: '10px',
                        width: '100px',
                        backgroundColor: '#77DADA',
                        color: '#0E4F4F',
                        borderRadius: '50px',
                        '&:hover': {
                            color: 'white',
                            backgroundColor: '#0E4F4F',
                        },
                    }}
                    onClick={openCreateModal}
                >
                    <PlusIcon /> Add
                </Button>

                <Paper
                    sx={{
                        width: '100%',
                        height: '100%',
                        overflow: 'auto',
                        // backgroundColor: 'rgb(255,255,255,0.5)',
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    }}
                >
                    <TableContainer
                        sx={{
                            maxHeight: '60vh',
                        }}
                    >
                        <Table
                            sx={{
                                backgroundColor: 'rgb(255,255,255,0.5)',
                            }}
                            stickyHeader
                        >
                            <TableHead sx={{}}>
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
                                        Name
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
                                        PlaneCode
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
                                        price
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
                                        status
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
                                        airportFrom
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
                                        airportTo
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
                                        departureTime
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
                                        arrivalTime
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
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    maxWidth: '100px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {row.planeCode}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    maxWidth: '100px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {row.price}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    maxWidth: '100px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {row.status}
                                            </TableCell>

                                            <TableCell
                                                sx={{
                                                    maxWidth: '100px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {getAirportCodeLabel(
                                                    row.airportFrom
                                                )}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    // wordWrap: 'break-word',
                                                    maxWidth: '100px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {getAirportCodeLabel(
                                                    row.airportTo
                                                )}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    wordWrap: 'break-word',
                                                    maxWidth: '100px',
                                                    width: 'auto',
                                                    whiteSpace: 'normal',
                                                }}
                                            >
                                                {row.departureTime}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    wordWrap: 'break-word',
                                                    maxWidth: '100px',
                                                    whiteSpace: 'normal',
                                                }}
                                            >
                                                {row.arrivalTime}
                                            </TableCell>

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
                                                        setEditingFlight(row)
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
                                                        setDeletingFlight(row)
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
                    </TableContainer>
                    <CreateFlightModal
                        open={isCreateModalOpen}
                        onClose={() => setIsCreateModalOpen(false)}
                        onSave={handleCreateFlight}
                    />
                    <EditFlightModal
                        open={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        onSave={handleEditFlight}
                        flightData={editingFlight}
                    />

                    <DeleteFlightModal
                        open={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onSave={handleDeleteFlight}
                        flightData={deletingFlight}
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
        </div>
    )
}
