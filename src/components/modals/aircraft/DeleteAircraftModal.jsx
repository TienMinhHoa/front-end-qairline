import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

export const DeleteAircraftModal = ({ open, onClose, planeData, onSave }) => {
    const [formData, setFormData] = useState(
        planeData || {
            id: '',
            name: '',
            code: '',
            engine: '',
            maxSpeed: '',
            numberOfSeats: 0,
            airline: '',
        }
    )
    const handleSave = () => {
        onSave(formData)
        onClose()
    }

    useEffect(() => {
        if (planeData) {
            setFormData(planeData)
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
            <DialogTitle>Remove the plane</DialogTitle>
            <DialogContent>
                Do you want to remove the plane with code
                <strong> {formData?.code} </strong>?
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
                        Continue
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}
