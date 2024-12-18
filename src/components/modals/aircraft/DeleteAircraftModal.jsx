import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
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
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Xóa máy bay</DialogTitle>
            <DialogContent>
                Bạn có muốn xóa máy bay có mã là
                <strong> {formData?.code} </strong>
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
