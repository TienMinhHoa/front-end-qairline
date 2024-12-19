import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

export const DeleteFlightModal = ({ open, onClose, flightData, onSave }) => {
    const [formData, setFormData] = useState(
        flightData || {
            id: '',
            number: '',
        }
    )
    const handleSave = () => {
        onSave(formData)
        onClose()
    }

    useEffect(() => {
        if (flightData) {
            setFormData(flightData)
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
            <DialogTitle>Remove the flight</DialogTitle>
            <DialogContent>
                Do you want to continue remove the flight with code
                <strong> {formData?.number} </strong>?
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
