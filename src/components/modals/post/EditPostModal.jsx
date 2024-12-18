import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {POST_TYPE} from "@/constants/postType.js";

export const EditPostModal = ({open, onClose, postData, onSave}) => {
    const [formData, setFormData] = useState(postData ||
        {
            id: '',
            title: '',
            description: '',
            image: '',
            type: '',
        }
    );
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
    };

    useEffect(() => {
        if (postData) {
            setFormData(postData)
        }
    }, [postData]);
    console.log(postData);
    

    return (
        <Dialog open={open} onClose={onClose} >
                    <DialogTitle >Edit this post</DialogTitle>
                    <DialogContent >
                        <TextField
                            margin="dense"
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{
                                sx: {
                                    borderRadius: '50px',
                                },
                            }}
                        />
                        <TextField
                            margin="dense"
                            label="Descrition"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{
                                sx: {
                                    borderRadius: '50px',
                                },
                            }}
                        />
                        <TextField
                            margin="dense"
                            label="Image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{
                                sx: {
                                    borderRadius: '50px',
                                },
                            }}
                        />
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Type of Post</InputLabel>
                            <Select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                sx={{borderRadius:'50px'}}
                            >
                                <MenuItem value="">Choose type of post</MenuItem>
                                {POST_TYPE.map((type, index) => {
                                    return (
                                        <MenuItem key={index} value={type.value}>
                                            {type.label}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{backgroundColor:'#77DADA',color:'#0E4F4F',borderRadius:'50px','&:hover':{
                            backgroundColor:'#0E4F4F',
                            color:'white'
                        }}} onClick={onClose}>Cancel</Button>
                        <Button sx={{backgroundColor:'#77DADA',borderRadius:'50px',color:'#0E4F4F','&:hover':{
                            backgroundColor:'#0E4F4F',
                            color:'white'
                        }}} onClick={handleSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
    )
}