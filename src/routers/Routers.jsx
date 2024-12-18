import {BrowserRouter, Navigate, useRoutes} from 'react-router-dom';
import {BookingFlight, Home, Login, Payment, Shop, SignUp, Profile, Post, Flight, Airline, Airport,Dashboard} from '@/pages';
import {PATHS} from './path';
import NotFound from '@/pages/NotFound';
import MainLayout from '@/layouts/MainLayout';

function AppRoutes() {
    return useRoutes([
        {
            path: '/',
            element: <MainLayout/>, // MainLayout sẽ bao bọc tất cả các children
            children: [
                {path: PATHS.home, element: <Home/>},
                {path: '/payment', element: <Payment/>},
                {path: '/shop', element: <Shop/>},
                {path: '/booking-flight', element: <BookingFlight/>},
                {path: PATHS.profile, element: <Profile/>},
                {path:'/post',element:<Post/>},
                {path:'/flight',element:<Flight/>},
                {path:'/airline',element:<Airline/>},
                {path:'/airport',element:<Airport/>},
                {path:'/dashboard',element:<Dashboard/>},
            ],
        },
        {path: PATHS.login, element: <Login/>},
        {path: PATHS.signup, element: <SignUp/>},
        {path: '/not-found', element: <NotFound/>},
        {path: '*', element: <Navigate to="/not-found" replace/>},
    ]);
}

function Routers() {
    return (
        <BrowserRouter>
            <AppRoutes/>
        </BrowserRouter>
    );
}

export default Routers;
