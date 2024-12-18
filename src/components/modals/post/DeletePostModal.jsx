import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React, {useEffect, useState} from "react";

export const DeletePostModal = ({open, onClose, postData, onSave}) => {
    const [formData, setFormData] = useState(postData ||
        {
            id: '',
            title: '',
            description: '',
            image: '',
            type: '',
        }
    );
    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    useEffect(() => {
        if (postData) {
            setFormData(postData);
        }
    }, [postData]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogContent>
                Do you want to 
                <strong> {formData?.title} </strong>
                continue?
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