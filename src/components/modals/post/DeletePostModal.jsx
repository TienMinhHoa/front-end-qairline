import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

export const DeletePostModal = ({ open, onClose, postData, onSave }) => {
    const [formData, setFormData] = useState(
        postData || {
            id: '',
            title: '',
            description: '',
            image: '',
            type: '',
        }
    )
    const handleSave = () => {
        onSave(formData)
        onClose()
    }

    useEffect(() => {
        if (postData) {
            setFormData(postData)
        }
    }, [postData])

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
            <DialogTitle>Remove Post</DialogTitle>
            <DialogContent>
                Do you want to continue remove
                <strong> {formData?.title} </strong>
                continue?
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
