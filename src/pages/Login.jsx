import React, { useState } from 'react'
import {
    Alert,
    Box,
    Button,
    Card,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material'
import {
    LockOutlined,
    PersonOutline,
    Visibility,
    VisibilityOff,
} from '@mui/icons-material'
import { PATHS } from '@/routers/path'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCurrentUserAction, loginAction } from '@/stores/authAction.js'

const LoginPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [error, setError] = useState('')
    const [values, setValues] = useState({
        email: '',
        password: '',
    })
    const dispatch = useDispatch()
    const navigate = useNavigate() // Initialize useNavigate

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSubmitLoading(true)
        try {
            await dispatch(loginAction(values))
            await dispatch(getCurrentUserAction())
            navigate(PATHS.home)
        } catch (e) {
            console.error(e)
            setError(e.message)
        } finally {
            setSubmitLoading(false)
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50px',
                // ml: 40,
            }}
        >
            <Card
                sx={{
                    position: 'relative',
                    width: '60vw',
                    height: '70vh',
                    padding: 4,
                    textAlign: 'center',
                    borderRadius: '30px',
                    backgroundImage: 'url(login.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        mb: 2,
                        marginLeft: '120px',
                        marginTop: '60px',
                    }}
                >
                    <Typography variant="h4">Đăng nhập</Typography>
                </Box>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="standard"
                        value={values.email}
                        onChange={handleChange('email')}
                        InputProps={{
                            // startAdornment: (
                            //     <InputAdornment position="start">
                            //         <PersonOutline/>
                            //     </InputAdornment>
                            // ),
                            sx: {
                                // po
                                padding: '3px',
                                borderRadius: '10px',
                                width: '50%',
                            },
                        }}
                        sx={{ mb: 2 }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Mật khẩu"
                        variant="standard"
                        type={passwordVisible ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setPasswordVisible(!passwordVisible)
                                        }
                                        edge="end"
                                    >
                                        {passwordVisible ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: {
                                padding: '3px',
                                borderRadius: '10px',
                                width: '50%',
                            },
                        }}
                        sx={{ mb: 2 }}
                        required
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            // justifyContent: 'flex-start',
                            marginLeft: '120px',
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={submitLoading}
                            sx={{
                                width: '25%',
                                borderRadius: '30px',
                                backgroundColor: '#77DADA',
                                '&:hover': {
                                    backgroundColor: '#0e4f4f',
                                    color: 'white',
                                },
                            }}
                        >
                            {submitLoading ? 'Loading...' : 'Login'}
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 2,
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                left: '55%',
                                backgroundColor: 'rgba(114, 128, 255, 0.8)',
                                top: 0,
                                // marginTop:'-50',
                                width: '45%',
                                height: '100%',
                            }}
                        >
                            <Typography
                                sx={{
                                    mt: '50%',
                                    textAlign: 'center',
                                    color: 'white',
                                }}
                                variant="body2"
                            >
                                <div
                                    style={{
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Xin chào
                                </div>
                                <div>
                                    Nhập thông tin cá nhân của bạn và bắt đầu
                                    chuyến hành trình với vivu Airline nào!
                                </div>
                                <Button
                                    href={PATHS.signup}
                                    variant="contained"
                                    sx={{
                                        textTransform: 'none',
                                        p: 0,
                                        width: '250px',
                                        height: '35px',
                                        borderRadius: '50px',
                                        left: '25%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        backgroundColor: '#77DADA',
                                    }}
                                >
                                    Đăng ký
                                </Button>
                            </Typography>
                        </Box>
                    </Box>
                </form>
            </Card>
        </Box>
    )
}

export default LoginPage
