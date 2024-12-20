import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

export const DeleteOrderModal = ({ open, onClose, orderData, onSave }) => {
    const [formData, setFormData] = useState(
        orderData || {
            id: '',
            code: '',
        }
    )
    const handleSave = () => {
        onSave(formData)
        onClose()
    }

    useEffect(() => {
        if (orderData) {
            setFormData(orderData)
        }
    }, [orderData])

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogContent>
                Do you want to cancel booking with
                <strong> {formData?.code} </strong>?
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} color="error">
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    )
}
