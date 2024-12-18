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
import { CreateAircraftModal } from '@/components/modals/aircraft/CreateAircraftModal.jsx'
import { EditAircraftModal } from '@/components/modals/aircraft/EditAircraftModal.jsx'
import { DeleteAircraftModal } from '@/components/modals/aircraft/DeleteAircraftModal'

import { createSvgIcon } from '@mui/material/utils'
import DeleteIcon from '@mui/icons-material/Delete'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import {
    createPlane,
    deletePlane,
    getListPlanes,
    updatePlane,
} from '@/services/plane.js'

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

export default function Aircraft() {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [aircrafts, setAircraft] = useState([])
    const paginationModel = { page: page, pageSize: 10 }

    const [editingAircraft, setEditingAircraft] = useState(null)
    const [deletingAircraft, setDeletingAircraft] = useState(null)

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

    const fetchAircraftData = async (pagination) => {
        try {
            const response = await getListPlanes(pagination)
            setAircraft(
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
        fetchAircraftData(paginationModel)
    }, [])

    const handleCreateAircraft = async (data) => {
        try {
            await createPlane(data)
            await fetchAircraftData(paginationModel)
        } catch (e) {
            console.log(e)
        }
    }

    const handleEditAircraft = async (data) => {
        try {
            await updatePlane(data.id, data)
            await fetchAircraftData(paginationModel)
        } catch (e) {
            console.log(e)
        }
    }

    const handleDeleteAircraft = async (data) => {
        try {
            await deletePlane(data.id)
            await fetchAircraftData(paginationModel)
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
                    width: '90%',
                    height: '85vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: 2,
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
                                        Engine
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
                                        Max Speed
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
                                        numberOfSeats
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 1,
                                            backgroundColor:
                                                'rgb(255,255,255,0.5)',
                                        }}
                                    ></TableCell>
                                    <TableCell
                                        sx={{
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 1,
                                            backgroundColor:
                                                'rgb(255,255,255,0.5)',
                                        }}
                                    ></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {aircrafts
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.code}</TableCell>
                                            <TableCell>{row.engine}</TableCell>
                                            <TableCell>
                                                {row.maxSpeed}
                                            </TableCell>
                                            <TableCell>
                                                {row.numberOfSeats}
                                            </TableCell>
                                            <TableCell>
                                                <Stack
                                                    direction="row"
                                                    spacing={2}
                                                >
                                                    <Button
                                                        sx={{
                                                            backgroundColor:
                                                                '#77DADA',
                                                            color: '#0E4F4F',
                                                            borderRadius:
                                                                '50px',
                                                            left: '200px',
                                                            '&:hover': {
                                                                backgroundColor:
                                                                    '#0E4F4F',
                                                                color: 'white',
                                                            },
                                                        }}
                                                        variant="outlined"
                                                        startIcon={
                                                            <DeleteIcon />
                                                        }
                                                        onClick={() => {
                                                            setDeletingAircraft(
                                                                row
                                                            )
                                                            setIsDeleteModalOpen(
                                                                true
                                                            )
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                    <Button
                                                        sx={{
                                                            backgroundColor:
                                                                '#77DADA',
                                                            color: '#0E4F4F',
                                                            borderRadius:
                                                                '50px',
                                                            left: '200px',
                                                            '&:hover': {
                                                                backgroundColor:
                                                                    '#0E4F4F',
                                                                color: 'white',
                                                            },
                                                        }}
                                                        variant="outlined"
                                                        startIcon={
                                                            <BorderColorIcon />
                                                        }
                                                        onClick={() => {
                                                            setEditingAircraft(
                                                                row
                                                            )
                                                            setIsEditModalOpen(
                                                                true
                                                            )
                                                        }}
                                                    >
                                                        Update
                                                    </Button>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <CreateAircraftModal
                        open={isCreateModalOpen}
                        onClose={() => setIsCreateModalOpen(false)}
                        onSave={handleCreateAircraft}
                    />
                    <EditAircraftModal
                        open={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        onSave={handleEditAircraft}
                        planeData={editingAircraft}
                    />

                    <DeleteAircraftModal
                        open={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onSave={handleDeleteAircraft}
                        planeData={deletingAircraft}
                    />
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={aircrafts.length}
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
