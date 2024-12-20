import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, InputLabel, MenuItem, Select,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import {ORDER_STATUS} from "@/constants/orderStatus.js";

export const EditOrderModal = ({ open, onClose, orderData, onSave }) => {
    const initForm = {
        id: '',
        status: ''
    }
    const [formData, setFormData] = useState(orderData || initForm);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
        setFormData(initForm);
    };

    useEffect(() => {
        if (orderData) {
            setFormData(orderData);
        }
    }, [orderData]);
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="dense">
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <MenuItem value="">Choose status</MenuItem>
                        {ORDER_STATUS.map((order, index) => {
                            return (
                                <MenuItem key={index} value={order.value}>
                                    {order.label}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>cancel</Button>
                <Button onClick={handleSave} color="primary">
                    continue
                </Button>
            </DialogActions>
        </Dialog>
    )
}
