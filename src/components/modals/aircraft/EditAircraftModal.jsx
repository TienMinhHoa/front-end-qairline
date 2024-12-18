import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
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
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Chỉnh sửa máy bay</DialogTitle>
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
                    label="Tốc độ tối đa"
                    name="maxSpeed"
                    value={formData.maxSpeed}
                    onChange={handleChange}
                    fullWidth
                />
                <div style={{ display: 'flex' }}>
                    <TextField
                        margin="dense"
                        label="Số ghế (tối thiểu)"
                        name="seatFrom"
                        value={seatFrom}
                        onChange={(e) => setSeatFrom(e.target.value)}
                        type="number"
                    />
                    <div style={{ flexGrow: 1 }}></div>
                    <TextField
                        margin="dense"
                        label="Số ghế (tối đa)"
                        name="seatTo"
                        value={seatTo}
                        onChange={(e) => setSeatTo(e.target.value)}
                        type="number"
                    />
                </div>
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
