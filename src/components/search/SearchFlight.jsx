import React, {useState} from 'react'
import {Autocomplete, Box, Button, Divider, InputAdornment, TextField, Typography,} from '@mui/material'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import FlightLandIcon from '@mui/icons-material/FlightLand'
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import {AIRPORT} from "@/constants/airport.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setQueryStore} from "@/stores/querySlice.js";

const AIRPORT_WITH_LETTER = AIRPORT.map((airport) => ({
    ...airport,
    firstLetter: airport.location[0].toUpperCase(),
}))

export const SearchFlight = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [query, setQuery] = useState({
        airportTo: null,
        airportFrom: null,
        timeStart: null,
    })

    const handleChange = (field, value) => {
        setQuery((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = () => {
        const data = {
            airportTo: query.airportTo ? query.airportTo._id : '',
            airportFrom: query.airportFrom ? query.airportFrom._id : '',
            timeStart: query.timeStart ? query.timeStart.tz('Asia/Ho_Chi_Minh').format().replace('+07:00', 'Z') : '',
        }
        dispatch(setQueryStore(data))
        navigate('/list-flight')
    }
    return (
        <div>
            <Box
                sx={{
                    padding: 3,
                    border: '2px solid #058CB3',
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: 1200,
                    gap: 2,
                    margin: 'auto',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Divider sx={{margin: 0}}/>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 3,
                        flexWrap: 'wrap',
                    }}
                >
                    <Autocomplete
                        options={AIRPORT_WITH_LETTER.sort(
                            (a, b) =>
                                -b.firstLetter.localeCompare(a.firstLetter)
                        )}
                        groupBy={(option) => option.firstLetter}
                        getOptionLabel={(option) =>
                            `${option.location} - ${option.name}`
                        }
                        value={query.airportFrom}
                        onChange={(e, newValue) => handleChange('airportFrom', newValue)}
                        sx={{width: 280}}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Điểm khởi hành"
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FlightTakeoffIcon
                                                sx={{color: '#058CB3'}}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#058CB3',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#058CB3',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#058CB3',
                                        },
                                    },
                                }}
                            />
                        )}
                    />

                    <Autocomplete
                        options={AIRPORT_WITH_LETTER.sort(
                            (a, b) =>
                                -b.firstLetter.localeCompare(a.firstLetter)
                        )}
                        groupBy={(option) => option.firstLetter}
                        getOptionLabel={(option) =>
                            `${option.location} - ${option.name}`
                        }
                        value={query.airportTo}
                        onChange={(e, newValue) => handleChange('airportTo', newValue)}
                        sx={{width: 280}}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Điểm đến"
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FlightLandIcon
                                                sx={{color: '#058CB3'}}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#058CB3',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#058CB3',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#058CB3',
                                        },
                                    },
                                }}
                            />
                        )}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Ngày đi"
                            value={query.timeStart1}
                            onChange={(e) => handleChange('timeStart', e)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#058CB3',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#058CB3',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#058CB3',
                                    },
                                },
                            }}
                            minDate={dayjs()}
                        />
                    </LocalizationProvider>

                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#058CB3',
                            color: '#fff',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            height: '56px',
                            '&:hover': {
                                backgroundColor: '#046A8B',
                            },
                        }}
                        onClick={handleSubmit}
                    >
                        Tìm chuyến bay
                    </Button>
                </Box>
            </Box>
        </div>
    )
}