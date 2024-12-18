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
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Sửa chuyến bay</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Tên chuyến bay"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Máy bay</InputLabel>
                    <Select
                        name="planeCode"
                        value={formData.planeCode}
                        onChange={handleChange}
                    >
                        <MenuItem value="">Chọn máy bay</MenuItem>
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
                            ? 'Số lượng ghế'
                            : `Số lượng ghế (trong khoảng từ ${numberOfSeats[0]} - ${numberOfSeats[1]} ghế)`
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
                    label="Giá cơ bản (VND)"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    fullWidth
                    type="number"
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Trạng thái</InputLabel>
                    <Select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <MenuItem value="">Chọn trạng thái</MenuItem>
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
                        <InputLabel>Nơi cất cánh</InputLabel>
                        <Select
                            name="airportFrom"
                            value={formData.airportFrom}
                            onChange={handleChange}
                        >
                            <MenuItem value="">Chọn nơi cất cánh</MenuItem>
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
                        <InputLabel>Nơi hạ cánh</InputLabel>
                        <Select
                            name="airportTo"
                            value={formData.airportTo}
                            onChange={handleChange}
                        >
                            <MenuItem value="">Chọn nơi hạ cánh</MenuItem>
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
                                label="Thời gian cất cánh"
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
                                label="Thời gian hạ cánh"
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
                <Button onClick={onClose}>Hủy</Button>
                <Button onClick={handleSave} color="primary">
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    )
}
