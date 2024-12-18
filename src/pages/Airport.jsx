import React, { useState } from 'react';
import { Container, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, TextField, Box, TablePagination } from '@mui/material';

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    { id: 'population', label: 'Population', minWidth: 170, align: 'right' },
    { id: 'size', label: 'Size\u00a0(km\u00b2)', minWidth: 170, align: 'right' },
    { id: 'density', label: 'Density', minWidth: 170, align: 'right' },
];

const initialRows = [
    { name: 'Germany', code: 'DE', population: 83019200, size: 357578 },
    { name: 'Ireland', code: 'IE', population: 4857000, size: 70273 },
    { name: 'Mexico', code: 'MX', population: 126577691, size: 1972550 },
    { name: 'Japan', code: 'JP', population: 126317000, size: 377973 },
    { name: 'France', code: 'FR', population: 67022000, size: 640679 },
    { name: 'United Kingdom', code: 'GB', population: 67545757, size: 242495 },
    { name: 'Russia', code: 'RU', population: 146793744, size: 17098246 },
    { name: 'Nigeria', code: 'NG', population: 200962417, size: 923768 },
    { name: 'Brazil', code: 'BR', population: 210147125, size: 8515767 },
];

export default function Airport() {
    const [rows, setRows] = useState(initialRows);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [newRow, setNewRow] = useState({ name: '', code: '', population: '', size: '' });
    const [editIndex, setEditIndex] = useState(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRow({ ...newRow, [name]: value });
    };

    const handleAddRow = () => {
        setRows([...rows, { ...newRow, population: parseInt(newRow.population), size: parseInt(newRow.size) }]);
        setNewRow({ name: '', code: '', population: '', size: '' });
    };

    const handleEditRow = (index) => {
        setEditIndex(index);
        setNewRow(rows[index]);
    };

    const handleUpdateRow = () => {
        const updatedRows = rows.map((row, index) => (index === editIndex ? newRow : row));
        setRows(updatedRows);
        setEditIndex(null);
        setNewRow({ name: '', code: '', population: '', size: '' });
    };

    const handleDeleteRow = (index) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };

   
    return (
        <Container sx={{ width: '90%', marginTop: 10, height: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Paper sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
                <Box sx={{ padding: 2 }}>
                    <TextField label="Name" name="name" value={newRow.name} onChange={handleInputChange} sx={{ marginRight: 2 }}
                        InputProps={{
                            sx: {
                                borderRadius: '30px',
                            },
                        }} />
                    <TextField label="Code" name="code" value={newRow.code} onChange={handleInputChange} sx={{ marginRight: 2 }}
                        InputProps={{
                            sx: {
                                borderRadius: '30px',
                            },
                        }} />
                    <TextField label="Population" name="population" value={newRow.population} onChange={handleInputChange} sx={{ marginRight: 2 }}
                        InputProps={{
                            sx: {
                                borderRadius: '30px',
                            },
                        }} />
                    <TextField label="Size" name="size" value={newRow.size} onChange={handleInputChange} sx={{ marginRight: 2 }}
                        InputProps={{
                            sx: {
                                borderRadius: '30px',
                            },
                        }} />
                    {editIndex !== null ? (
                        <Button sx={{
                            backgroundColor: "#77DADA",
                            '&:hover': {
                                backgroundColor: '#0e4f4f',
                                color: 'white',
                            },
                            borderRadius: '30px',
                        }}>
                            Update
                        </Button>
                    ) : (
                        <Button sx={{
                            backgroundColor: "#77DADA",
                            '&:hover': {
                                backgroundColor: '#0e4f4f',
                                color: 'white',
                            },
                            borderRadius: '30px',
                        }}>
                            Add
                        </Button>
                    )}
                </Box>
                <TableContainer sx={{ maxHeight: '60vh' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>Name</TableCell>
                                <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>Code</TableCell>
                                <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>Population</TableCell>
                                <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>Size</TableCell>
                                <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.code}</TableCell>
                                    <TableCell>{row.population}</TableCell>
                                    <TableCell>{row.size}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleDeleteRow(index)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    );
};
