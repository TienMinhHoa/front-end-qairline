import http from '@/services/http'
import {ORDER_API} from '@/constants/api'

export const getListOrders = async (params) => {
    return (await http.get(ORDER_API.LIST_ORDER(params))).data
}

export const getOrderById = async (id) => {
    return (await http.get(ORDER_API.ORDER_BY_ID(id))).data
}

export const createOrder = async (payload) => {
    return (await http.post(ORDER_API.CREATE_ORDER, payload))
}

export const deleteOrder = async (id) => {
    return (await http.delete(ORDER_API.DELETE_ORDER(id))).data
}

export const getOrderByCode = async (code) => {
    return (await http.get(ORDER_API.ORDER_BY_CODE(code))).data
}

export const checkOrderStatus = async (payload) => {
    return (await http.post(ORDER_API.CHECK_ORDER_STATUS, payload)).data
}

export const getOrderByBookingId = async (bookingId) => {
    return (await http.get(ORDER_API.ORDER_BY_BOOKING(bookingId))).data
}