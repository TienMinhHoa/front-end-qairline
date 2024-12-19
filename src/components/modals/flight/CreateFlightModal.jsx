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

dayjs.extend(utc)
dayjs.extend(timezone)

export const CreateFlightModal = ({ open, onClose, onSave }) => {
    const initForm = {
        name: '',
        airportTo: '',
        airportFrom: '',
        airline: '',
        capacity: 0,
        planeCode: '',
        departureTime: null,
        arrivalTime: null,
        price: 0,
    }
    const [formData, setFormData] = useState(initForm)
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
            [key]: dayjs.utc(value).tz('Asia/Ho_Chi_Minh'),
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
            name: formData.name,
            airportTo: formData.airportTo,
            airportFrom: formData.airportFrom,
            airline: '675e56c30926be1e4b2eb024',
            capacity: Number(formData.capacity),
            planeCode: formData.planeCode,
            departureTime: formData.departureTime
                ? formData.departureTime
                      .tz('Asia/Ho_Chi_Minh')
                      .format()
                      .replace('+07:00', 'Z')
                : null,
            arrivalTime: formData.arrivalTime
                ? formData.arrivalTime
                      .tz('Asia/Ho_Chi_Minh')
                      .format()
                      .replace('+07:00', 'Z')
                : null,
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
            <DialogTitle>Add new flight</DialogTitle>
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
                        <MenuItem value="">Choose Airplane</MenuItem>
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
                            ? 'Num Of seats'
                            : `Num Of seats (in range of ${numberOfSeats[0]} - ${numberOfSeats[1]})`
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
                    label="Price(VND)"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    fullWidth
                    type="number"
                />
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
                                label="Arival time"
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
