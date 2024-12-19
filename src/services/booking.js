import http from '@/services/http'
import {BOOKING_API} from '@/constants/api'

export const getListBookings = async (params) => {
    return (await http.get(BOOKING_API.LIST_BOOKING(params))).data
}

export const getBookingById = async (id) => {
    return (await http.get(BOOKING_API.BOOKING_BY_ID(id))).data
}

export const createBooking = async (payload) => {
    return (await http.post(BOOKING_API.CREATE_BOOKING, payload))
}

export const updateBooking = async (id, payload) => {
    return (await http.put(BOOKING_API.UPDATE_BOOKING(id), payload)).data
}

export const deleteBooking = async (id) => {
    return (await http.delete(BOOKING_API.DELETE_BOOKING(id))).data
}
