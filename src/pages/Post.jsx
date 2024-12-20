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
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                fontWeight: 'Bold',
            }}
        >
            <Container
                sx={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: 8,
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
                        borderRadius: '50px',
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
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    }}
                >
                    <TableContainer
                        sx={{
                            maxHeight: '75vh',
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
                                    >
                                        Action
                                    </TableCell>
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
                                            <TableCell
                                                sx={{
                                                    maxWidth: '100px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {row.title}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    maxWidth: '100px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {row.description}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    maxWidth: '100px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {row.image}
                                            </TableCell>
                                            <TableCell>{row.type}</TableCell>
                                            <TableCell
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '8px',
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => {
                                                        setEditingPost(row)
                                                        setIsEditModalOpen(true)
                                                    }}
                                                    sx={{
                                                        width: '100px',
                                                        backgroundColor:
                                                            '#77DADA',
                                                        color: '#0E4F4F',
                                                        borderRadius: '20px',
                                                        '&:hover': {
                                                            backgroundColor:
                                                                '#0E4F4F',
                                                            color: 'white',
                                                        },
                                                    }}
                                                >
                                                    <BorderColorIcon />
                                                    Update
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => {
                                                        setDeletingPost(row)
                                                        setIsDeleteModalOpen(
                                                            true
                                                        )
                                                    }}
                                                    sx={{
                                                        width: '100px',
                                                        backgroundColor:
                                                            '#FF6B6B',
                                                        color: 'white',
                                                        borderRadius: '20px',
                                                        '&:hover': {
                                                            backgroundColor:
                                                                '#FF3B3B',
                                                        },
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                    Delete
                                                </Button>
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
