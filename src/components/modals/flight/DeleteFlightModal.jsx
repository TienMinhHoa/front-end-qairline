import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
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
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Xóa chuyến bay</DialogTitle>
            <DialogContent>
                Bạn có muốn xóa chuyến bay có số hiệu là
                <strong> {formData?.number} </strong>
                không?
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button onClick={handleSave} color="error">
                    Xóa
                </Button>
            </DialogActions>
        </Dialog>
    )
}
