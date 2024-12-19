import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Box,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

export const EditAircraftModal = ({ open, onClose, planeData, onSave }) => {
    const [formData, setFormData] = useState(
        planeData || {
            id: '',
            name: '',
            code: '',
            engine: '',
            maxSpeed: 0,
            numberOfSeats: [],
        }
    )
    const [seatFrom, setSeatFrom] = useState(formData.numberOfSeats[0])
    const [seatTo, setSeatTo] = useState(formData.numberOfSeats[1])
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSave = () => {
        const data = {
            id: formData.id,
            name: formData.name,
            code: formData.code,
            engine: formData.engine,
            maxSpeed: Number(formData.maxSpeed),
            numberOfSeats: [Number(seatFrom), Number(seatTo)],
        }
        onSave(data)
        onClose()
    }

    useEffect(() => {
        if (planeData) {
            setFormData(planeData)
            // eslint-disable-next-line react/prop-types
            setSeatTo(planeData.numberOfSeats[1])
            // eslint-disable-next-line react/prop-types
            setSeatFrom(planeData.numberOfSeats[0])
        }
    }, [planeData])

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
            <DialogTitle>Edit the Plane</DialogTitle>
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
                    label="Max Speed"
                    name="maxSpeed"
                    value={formData.maxSpeed}
                    onChange={handleChange}
                    fullWidth
                />
                <div style={{ display: 'flex' }}>
                    <TextField
                        margin="dense"
                        label="Min seats"
                        name="seatFrom"
                        value={seatFrom}
                        onChange={(e) => setSeatFrom(e.target.value)}
                        type="number"
                    />
                    <div style={{ flexGrow: 1 }}></div>
                    <TextField
                        margin="dense"
                        label="Max seats"
                        name="seatTo"
                        value={seatTo}
                        onChange={(e) => setSeatTo(e.target.value)}
                        type="number"
                    />
                </div>
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
