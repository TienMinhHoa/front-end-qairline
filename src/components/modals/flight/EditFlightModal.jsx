import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Box,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { getListPlanes } from '@/services/plane.js'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { getListAirports } from '@/services/airport.js'
import { convertDateTime } from '@/utils/helpers/convertDateTime.js'
import { FLIGHT_STATUS } from '@/constants/flightStatus.js'

dayjs.extend(utc)
dayjs.extend(timezone)

export const EditFlightModal = ({ open, onClose, flightData, onSave }) => {
    const initForm = {
        id: '',
        name: '',
        airportTo: '',
        airportFrom: '',
        airline: '',
        capacity: 0,
        planeCode: '',
        departureTime: null,
        arrivalTime: null,
        price: 0,
        status: '',
    }
    const [formData, setFormData] = useState(flightData || initForm)
    const [planes, setPlanes] = useState([])
    const [airports, setAirports] = useState([])
    const [numberOfSeats, setNumberOfSeats] = useState([0, 0])
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))

        if (name === 'planeCode') {
            const selectedPlane = planes.find((plane) => plane.code === value)
            setNumberOfSeats(
                selectedPlane ? selectedPlane.numberOfSeats : [0, 0]
            )
        }
    }

    const handleChangeTime = (key, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: dayjs.tz(value, 'Asia/Ho_Chi_Minh'),
        }))
    }

    const fetchPlaneByAirline = async () => {
        const params = {
            page: 1,
            perPage: 10,
            airline: '675e56c30926be1e4b2eb024',
        }
        try {
            const response = await getListPlanes(params)
            setPlanes(response.data)
            const selectedPlane = planes.find(
                (plane) => plane.code === flightData?.planeCode
            )
            setNumberOfSeats(
                selectedPlane ? selectedPlane.numberOfSeats : [0, 0]
            )
        } catch (e) {
            console.log(e)
        }
    }

    const fetchAirport = async () => {
        const params = {
            page: 1,
            perPage: 20,
        }
        try {
            const response = await getListAirports(params)
            setAirports(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const handleSave = () => {
        const data = {
            ...formData,
            airline: '675e56c30926be1e4b2eb024',
            capacity: Number(formData.capacity),
            departureTime: formData.departureTime
                ? flightData.departureTime
                : dayjs.utc(formData.departureTime, 'Asia/Ho_Chi_Minh'),
            arrivalTime: formData.arrivalTime
                ? flightData.arrivalTime
                : dayjs.utc(formData.arrivalTime, 'Asia/Ho_Chi_Minh'),
            price: Number(formData.price),
        }
        onSave(data)
        onClose()
        setFormData(initForm)
    }

    useEffect(() => {
        fetchPlaneByAirline()
        fetchAirport()
    }, [])

    useEffect(() => {
        if (flightData) {
            setFormData({
                ...flightData,
                departureTime: flightData?.departureTime
                    ? dayjs.tz(flightData?.departureTime, 'Asia/Ho_Chi_Minh')
                    : null,
                arrivalTime: flightData?.arrivalTime
                    ? dayjs.tz(flightData?.arrivalTime, 'Asia/Ho_Chi_Minh')
                    : null,
            })
        }
    }, [flightData])
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderRadius: '45px', // Bo tròn các góc của Dialog
                },
            }}
        >
            <DialogTitle>Edit the flight</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Plane</InputLabel>
                    <Select
                        name="planeCode"
                        value={formData.planeCode}
                        onChange={handleChange}
                    >
                        <MenuItem value="">Choose the Plane</MenuItem>
                        {planes.map((plane, index) => {
                            return (
                                <MenuItem key={index} value={plane.code}>
                                    {plane.name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    label={
                        !formData.planeCode
                            ? 'Number of Seats'
                            : `Number of Seats (Between ${numberOfSeats[0]} - ${numberOfSeats[1]})`
                    }
                    name="capacity"
                    value={formData.capacity}
                    onChange={(e) => {
                        const value = Math.max(
                            numberOfSeats[0],
                            Math.min(numberOfSeats[1], Number(e.target.value))
                        )
                        setFormData((prevState) => ({
                            ...prevState,
                            capacity: value,
                        }))
                    }}
                    disabled={!formData.planeCode}
                    fullWidth
                    inputProps={{
                        min: numberOfSeats[0],
                        max: numberOfSeats[1],
                    }}
                    type="number"
                />
                <TextField
                    margin="dense"
                    label="Price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    fullWidth
                    type="number"
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <MenuItem value="">Choose the Status</MenuItem>
                        {FLIGHT_STATUS.map((flight, index) => {
                            return (
                                <MenuItem key={index} value={flight.value}>
                                    {flight.label}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <div style={{ display: 'flex', gap: 20 }}>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>From</InputLabel>
                        <Select
                            name="airportFrom"
                            value={formData.airportFrom}
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                Choose the begin Airport
                            </MenuItem>
                            {airports.map((airport, index) => {
                                return (
                                    <MenuItem key={index} value={airport._id}>
                                        {airport.name}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <div style={{ flexGrow: 1 }}></div>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>To</InputLabel>
                        <Select
                            name="airportTo"
                            value={formData.airportTo}
                            onChange={handleChange}
                        >
                            <MenuItem value="">Choose the destination</MenuItem>
                            {airports.map((airport, index) => {
                                return (
                                    <MenuItem key={index} value={airport._id}>
                                        {airport.name}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </div>
                <FormControl fullWidth margin="dense">
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="vi"
                    >
                        <div style={{ display: 'flex' }}>
                            <DateTimePicker
                                label="Departure time"
                                name="departureTime"
                                timezone="Asia/Ho_Chi_Minh"
                                onChange={(e) =>
                                    handleChangeTime('departureTime', e)
                                }
                                value={formData.departureTime}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                            <div style={{ flexGrow: 1 }}></div>
                            <DateTimePicker
                                label="Arrival time"
                                name="arrivalTime"
                                timezone="Asia/Ho_Chi_Minh"
                                onChange={(e) =>
                                    handleChangeTime('arrivalTime', e)
                                }
                                value={formData.arrivalTime}
                                renderInput={(params) => (
                                    <TextField {...params} fullWidth />
                                )}
                            />
                        </div>
                    </LocalizationProvider>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <Button
                        sx={{
                            backgroundColor: '#77DADA',
                            color: '#0E4F4F',
                            borderRadius: '50px',
                            margin: '10px',
                            '&:hover': {
                                backgroundColor: '#0E4F4F',
                                color: 'white',
                            },
                        }}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: '#77DADA',
                            borderRadius: '50px',
                            color: '#0E4F4F',
                            margin: '10px',
                            '&:hover': {
                                backgroundColor: '#0E4F4F',
                                color: 'white',
                            },
                        }}
                        onClick={handleSave}
                        color="primary"
                    >
                        Save
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}
