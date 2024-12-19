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
import React, { useState } from 'react'

export const CreateAircraftModal = ({ open, onClose, onSave }) => {
    const initForm = {
        name: '',
        code: '',
        engine: '',
        maxSpeed: 0,
        seatTo: 0,
        seatFrom: 0,
        airline: '',
    }
    const [formData, setFormData] = useState(initForm)
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSave = () => {
        const data = {
            name: formData.name,
            code: formData.code,
            engine: formData.engine,
            maxSpeed: Number(formData.maxSpeed),
            numberOfSeats: [Number(formData.seatFrom), Number(formData.seatTo)],
            airline: formData.airline,
        }
        onSave(data)
        onClose()
        setFormData(initForm)
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderRadius: '45px', // Bo tròn các góc của Dialog
                },
            }}
            s
        >
            <DialogTitle>Add new Plane</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Code"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Engine"
                    name="engine"
                    value={formData.engine}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Max speed (km/h)"
                    name="maxSpeed"
                    value={formData.maxSpeed}
                    onChange={handleChange}
                    fullWidth
                    type="number"
                />
                <div style={{ display: 'flex' }}>
                    <TextField
                        margin="dense"
                        label="Min seats"
                        name="seatFrom"
                        value={formData.seatFrom}
                        onChange={handleChange}
                        type="number"
                    />
                    <div style={{ flexGrow: 1 }}></div>
                    <TextField
                        margin="dense"
                        label="Max seats"
                        name="seatTo"
                        value={formData.seatTo}
                        onChange={handleChange}
                        type="number"
                    />
                </div>
                <FormControl fullWidth margin="dense">
                    <InputLabel>Airline brand</InputLabel>
                    <Select
                        name="airline"
                        value={formData.airline}
                        onChange={handleChange}
                    >
                        <MenuItem value="">Choose the Airline brand</MenuItem>
                        <MenuItem value="675e56c30926be1e4b2eb024">
                            QAirline
                        </MenuItem>
                    </Select>
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
