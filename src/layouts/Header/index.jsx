import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PATHS } from '@/routers/path.js'
import { ROLES } from '@/constants/role.js'
import { logout } from '@/stores/authSlice.js'

function Header() {
    let pages = ['Home']
    const { isAuthenticated, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    let routes = ['/', '/createAuction']
    if (isAuthenticated) {
        if (user?.role === ROLES.ADMIN) {
            pages = ['Home', 'Post', 'Flight ', 'Aircraft', 'Orders']
            routes = ['/', '/post', '/flight', '/aircraft', '/orders']
        } else {
            pages = ['Home', 'List Flight', 'Search Order', 'My Flight']
            routes = ['/', '/list-flight', '/search-order', '/my-flight']
        }
    }

    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleLogout = () => {
        dispatch(logout())
        navigate(PATHS.login)
    }
    return (
        <AppBar
            sx={{
                position: 'absolute',
                top: 0,
                // bottom: '10px',
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '10px',
                backgroundColor: 'white',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="blue"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {
                                    xs: 'block',
                                    md: 'none',
                                    maxHeight: '300px',
                                    overflowY: 'auto',
                                },
                            }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    component={Link}
                                    to={routes[index]}
                                >
                                    <Typography textAlign="center">
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: 'auto',
                        }}
                    >
                        <img
                            src="/logo.webp"
                            style={{
                                height: '60px',
                                // top: 10,
                                // margin: '0 0',
                                borderRadius: '50%',
                            }}
                        />
                        {pages.map((page, index) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    borderRadius: '30px',

                                    my: 2,
                                    color: 'black',
                                    display: 'block',
                                    '&:hover': { color: '#77DADA' },
                                }}
                                component={Link}
                                to={routes[index]}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Typography
                        sx={{ display: { xs: 'none', md: 'block' }, mr: 2 }}
                    >
                        {localStorage.getItem('userName')}
                    </Typography>
                    {/* Avatar */}
                    <Box sx={{ flexGrow: 0 }}>
                        {isAuthenticated ? (
                            <>
                                {/* Avatar Button */}
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar src={user?.avatar} />
                                    <span
                                        style={{
                                            marginLeft: '5px',
                                            fontSize: 16,
                                        }}
                                    >
                                        {user?.username}
                                    </span>
                                </IconButton>

                                {/* Avatar Menu */}
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {user?.role !== '' && (
                                        <MenuItem
                                            key={0}
                                            onClick={handleCloseUserMenu}
                                            component={Link}
                                            to="/profile"
                                        >
                                            <Typography textAlign="center">
                                                Profile
                                            </Typography>
                                        </MenuItem>
                                    )}

                                    <MenuItem key={1} onClick={handleLogout}>
                                        <Typography textAlign="center">
                                            Logout
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button
                                onClick={() => navigate(PATHS.login)}
                                sx={{
                                    my: 2,
                                    color: '#0E4F4F',
                                    backgroundColor: '#77DADA',
                                    display: 'block',
                                    minWidth: '150px',
                                    borderRadius: '20px',
                                    '&:hover': {
                                        backgroundColor: '#0e4f4f',
                                        color: 'white', // Màu nền khi hover
                                    },
                                }}
                            >
                                Login
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
