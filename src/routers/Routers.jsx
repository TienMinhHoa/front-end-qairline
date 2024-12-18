import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom'
import {
    BookingFlight,
    Home,
    Login,
    NewLogin,
    Payment,
    Shop,
    SignUp,
    Profile,
    Post,
    Flight,
    Aircraft,
    Airport,
    Orders,
    ListFlight, YourFlight, SearchOrder,
} from '@/pages'
import { PATHS } from './path'
import NotFound from '@/pages/NotFound'
import MainLayout from '@/layouts/MainLayout'

function AppRoutes() {
    return useRoutes([
        {
            path: '/',
            element: <MainLayout />, // MainLayout sẽ bao bọc tất cả các children
            children: [
                { path: PATHS.home, element: <Home /> },
                { path: '/payment', element: <Payment /> },
                { path: '/shop', element: <Shop /> },
                { path: '/booking-flight/:id', element: <BookingFlight /> },
                { path: '/list-flight', element: <ListFlight /> },
                { path: '/my-flight', element: <YourFlight /> },
                { path: '/search-order', element: <SearchOrder /> },
                { path: PATHS.profile, element: <Profile /> },
                { path: '/post', element: <Post /> },
                { path: '/flight', element: <Flight /> },
                { path: '/aircraft', element: <Aircraft /> },
                { path: '/airport', element: <Airport /> },
                { path: '/orders', element: <Orders /> },
            ],
        },
        { path: PATHS.login, element: <NewLogin /> },
        { path: PATHS.signup, element: <SignUp /> },
        { path: '/not-found', element: <NotFound /> },
        { path: '*', element: <Navigate to="/not-found" replace /> },
    ])
}

function Routers() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    )
}

export default Routers
