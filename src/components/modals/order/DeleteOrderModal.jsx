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
            <DialogTitle>Xóa bài viết</DialogTitle>
            <DialogContent>
                Bạn có muốn xóa thanh toán có mã là
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
