import React, { useState, useEffect } from 'react'
import {
    Container,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    TablePagination,
    Stack,
} from '@mui/material'
import { CreatePostModal } from '@/components/modals/post/CreatePostModal.jsx'
import { EditPostModal } from '@/components/modals/post/EditPostModal.jsx'
import { DeletePostModal } from '@/components/modals/post/DeletePostModal'

import { createSvgIcon } from '@mui/material/utils'
import DeleteIcon from '@mui/icons-material/Delete'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import {
    createPost,
    deletePost,
    getListPosts,
    updatePost,
} from '@/services/post.js'

const PlusIcon = createSvgIcon(
    // credit: plus icon from https://heroicons.com
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 2 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
        />
    </svg>,
    'Plus'
)

const initialRows = []

export default function Post() {
    const [rows, setRows] = useState(initialRows)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [posts, setPosts] = useState([])
    const paginationModel = { page: page, pageSize: 10 }

    const [editingPost, setEditingPost] = useState(null)
    const [deletingPost, setDeletingPost] = useState(null)

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const openCreateModal = () => {
        setIsCreateModalOpen(true)
    }

    const fetchPostData = async (pagination) => {
        try {
            const response = await getListPosts(pagination)
            setPosts(
                response.data.map((res) => ({
                    ...res,
                    id: res._id,
                    airline: 'QAirline',
                }))
            )
            // console.log(posts)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchPostData(paginationModel)
    }, [])

    const handleCreatePost = async (data) => {
        try {
            await createPost(data)
            await fetchPostData(paginationModel)
        } catch (e) {
            console.log(e)
        }
    }

    const handleEditPost = async (data) => {
        try {
            await updatePost(data.id, data)
            await fetchPostData(paginationModel)
        } catch (e) {
            console.log(e)
        }
    }

    const handleDeletePost = async (data) => {
        try {
            await deletePost(data.id)
            await fetchPostData(paginationModel)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div
            style={{
                backgroundImage: 'url(/background.jpg)',
                fontWeight: 'Bold',
            }}
        >
            <Container
                sx={{
                    width: '90%',
                    height: '85vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: 2,
                    // margin: '0 auto',
                    // backgroundColor: 'black',
                    // backgroundColor: 'rgb(255,255,255,0.5)',
                }}
            >
                <Button
                    variant="contained"
                    href="#contained-buttons"
                    sx={{
                        mb: '10px',
                        width: '100px',
                        backgroundColor: '#77DADA',
                        color: '#0E4F4F',
                        '&:hover': {
                            color: 'white',
                            backgroundColor: '#0E4F4F',
                        },
                    }}
                    onClick={openCreateModal}
                >
                    <PlusIcon /> Add
                </Button>

                <Paper
                    sx={{
                        width: '100%',
                        height: '100%',
                        overflow: 'auto',
                        // backgroundColor: 'rgb(255,255,255,0.5)',
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    }}
                >
                    <TableContainer
                        sx={{
                            maxHeight: '60vh',
                        }}
                    >
                        <Table
                            sx={{ backgroundColor: 'rgb(255,255,255,0.5)' }}
                            stickyHeader
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 1,
                                            backgroundColor:
                                                'rgb(255,255,255,0.5)',
                                        }}
                                    >
                                        Title
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 1,
                                            backgroundColor:
                                                'rgb(255,255,255,0.5)',
                                        }}
                                    >
                                        Description
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 1,
                                            backgroundColor:
                                                'rgb(255,255,255,0.5)',
                                        }}
                                    >
                                        Images
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 1,
                                            backgroundColor:
                                                'rgb(255,255,255,0.5)',
                                        }}
                                    >
                                        Type
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 1,
                                            backgroundColor:
                                                'rgb(255,255,255,0.5)',
                                        }}
                                    ></TableCell>
                                    <TableCell
                                        sx={{
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 1,
                                            backgroundColor:
                                                'rgb(255,255,255,0.5)',
                                        }}
                                    ></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {posts
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.title}</TableCell>
                                            <TableCell>
                                                {row.description}
                                            </TableCell>
                                            <TableCell>{row.image}</TableCell>
                                            <TableCell>{row.type}</TableCell>
                                            <TableCell>
                                                <Stack
                                                    direction="row"
                                                    spacing={2}
                                                >
                                                    <Button
                                                        sx={{
                                                            backgroundColor:
                                                                '#77DADA',
                                                            color: '#0E4F4F',
                                                            borderRadius:
                                                                '50px',
                                                            left: '200px',
                                                            '&:hover': {
                                                                backgroundColor:
                                                                    '#0E4F4F',
                                                                color: 'white',
                                                            },
                                                        }}
                                                        variant="outlined"
                                                        startIcon={
                                                            <DeleteIcon />
                                                        }
                                                        onClick={() => {
                                                            setDeletingPost(row)
                                                            setIsDeleteModalOpen(
                                                                true
                                                            )
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                    <Button
                                                        sx={{
                                                            backgroundColor:
                                                                '#77DADA',
                                                            color: '#0E4F4F',
                                                            borderRadius:
                                                                '50px',
                                                            left: '200px',
                                                            '&:hover': {
                                                                backgroundColor:
                                                                    '#0E4F4F',
                                                                color: 'white',
                                                            },
                                                        }}
                                                        variant="outlined"
                                                        startIcon={
                                                            <BorderColorIcon />
                                                        }
                                                        onClick={() => {
                                                            setEditingPost(row)
                                                            setIsEditModalOpen(
                                                                true
                                                            )
                                                        }}
                                                    >
                                                        Update
                                                    </Button>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <CreatePostModal
                        open={isCreateModalOpen}
                        onClose={() => setIsCreateModalOpen(false)}
                        onSave={handleCreatePost}
                    />
                    <EditPostModal
                        open={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        onSave={handleEditPost}
                        postData={editingPost}
                    />

                    <DeletePostModal
                        open={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onSave={handleDeletePost}
                        postData={deletingPost}
                    />
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={posts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
        </div>
    )
}
