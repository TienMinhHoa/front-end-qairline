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
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Thêm máy bay</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Tên máy bay"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Mã máy bay"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Động cơ"
                    name="engine"
                    value={formData.engine}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Tốc độ tối đa (km/h)"
                    name="maxSpeed"
                    value={formData.maxSpeed}
                    onChange={handleChange}
                    fullWidth
                    type="number"
                />
                <div style={{ display: 'flex' }}>
                    <TextField
                        margin="dense"
                        label="Số ghế (tối thiểu)"
                        name="seatFrom"
                        value={formData.seatFrom}
                        onChange={handleChange}
                        type="number"
                    />
                    <div style={{ flexGrow: 1 }}></div>
                    <TextField
                        margin="dense"
                        label="Số ghế (tối đa)"
                        name="seatTo"
                        value={formData.seatTo}
                        onChange={handleChange}
                        type="number"
                    />
                </div>
                <FormControl fullWidth margin="dense">
                    <InputLabel>Hãng hàng không</InputLabel>
                    <Select
                        name="airline"
                        value={formData.airline}
                        onChange={handleChange}
                    >
                        <MenuItem value="">Chọn hãng hàng không</MenuItem>
                        <MenuItem value="675e56c30926be1e4b2eb024">
                            QAirline
                        </MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button onClick={handleSave} color="primary">
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    )
}
