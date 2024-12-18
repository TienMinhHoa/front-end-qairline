export const AUTH_API = {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESEND_CONFIRMATION: '/auth/resend-confirmation',
    CONFIRM_REGISTRATION: '/auth/confirm-registration',
}

export const USER_API = {
    GET_CURRENT_USER: '/user/me'
}

export const PLANE_API = {
    LIST_PLANE: (params) => {
        const query = Object.keys(params)
            .filter(key => params[key] !== undefined &&
                params[key] !== null &&
                params[key] !== 0 &&
                params[key] !== '')
            .map(key => `${key}=${params[key]}`)
            .join('&')
        return `/plane?${query}`
    },
    CREATE_PLANE: '/plane',
    UPDATE_PLANE: (id) => `/plane/${id}`,
    DELETE_PLANE: (id) => `/plane/${id}`,
    PLANE_BY_ID: (id) => `/plane/${id}`,
}

export const POST_API = {
    LIST_POST: (params) => {
        const query = Object.keys(params)
            .filter(key => params[key] !== undefined &&
                params[key] !== null &&
                params[key] !== 0 &&
                params[key] !== '')
            .map(key => `${key}=${params[key]}`)
            .join('&')
        return `/post?${query}`
    },
    CREATE_POST: '/post',
    UPDATE_POST: (id) => `/post/${id}`,
    DELETE_POST: (id) => `/post/${id}`,
    POST_BY_ID: (id) => `/post/${id}`,
}

export const FLIGHT_API = {
    LIST_FLIGHT: (params) => {
        const query = Object.keys(params)
            .filter(key => params[key] !== undefined &&
                params[key] !== null &&
                params[key] !== 0 &&
                params[key] !== '')
            .map(key => `${key}=${params[key]}`)
            .join('&')
        return `/flight?${query}`
    },
    CREATE_FLIGHT: '/flight',
    UPDATE_FLIGHT: (id) => `/flight/${id}`,
    DELETE_FLIGHT: (id) => `/flight/${id}`,
    FLIGHT_BY_ID: (id) => `/flight/${id}`,
    FLIGHT_BY_NUMBER: (number) => `/flight/number/${number}`,
}

export const AIRPORT_API = {
    LIST_AIRPORT: (params) => {
        const query = Object.keys(params)
            .filter(key => params[key] !== undefined &&
                params[key] !== null &&
                params[key] !== 0 &&
                params[key] !== '')
            .map(key => `${key}=${params[key]}`)
            .join('&')
        return `/airport?${query}`
    },
    CREATE_AIRPORT: '/airport',
    UPDATE_AIRPORT: (id) => `/airport/${id}`,
    DELETE_AIRPORT: (id) => `/airport/${id}`,
    AIRPORT_BY_ID: (id) => `/airport/${id}`,
    AIRPORT_BY_CODE: (code) => `/airport/code/${code}`,
}

export const BOOKING_API = {
    LIST_BOOKING: (params) => {
        const query = Object.keys(params)
            .filter(key => params[key] !== undefined &&
                params[key] !== null &&
                params[key] !== 0 &&
                params[key] !== '')
            .map(key => `${key}=${params[key]}`)
            .join('&')
        return `/booking?${query}`
    },
    CREATE_BOOKING: '/booking',
    DELETE_BOOKING: (id) => `/booking/${id}`,
    UPDATE_BOOKING: (id) => `/booking/${id}`,
    BOOKING_BY_ID: (id) => `/booking/${id}`,
    BOOKING_BY_CODE: (code) => `/booking/code/${code}`,
}

export const ORDER_API = {
    LIST_ORDER: (params) => {
        const query = Object.keys(params)
            .filter(key => params[key] !== undefined &&
                params[key] !== null &&
                params[key] !== 0 &&
                params[key] !== '')
            .map(key => `${key}=${params[key]}`)
            .join('&')
        return `/order?${query}`
    },
    CREATE_ORDER: '/order',
    DELETE_ORDER: (id) => `/order/${id}`,
    ORDER_BY_ID: (id) => `/order/${id}`,
    ORDER_BY_CODE: (code) => `/order/code/${code}`,
    CHECK_ORDER_STATUS: '/order/check-status',
}