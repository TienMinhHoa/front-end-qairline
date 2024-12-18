import http from '@/services/http'
import {AIRPORT_API} from '@/constants/api'

export const getListAirports = async (params) => {
    return (await http.get(AIRPORT_API.LIST_AIRPORT(params))).data
}

export const getAirportById = async (id) => {
    return (await http.get(AIRPORT_API.AIRPORT_BY_ID(id))).data
}

export const createAirport = async (payload) => {
    return (await http.post(AIRPORT_API.CREATE_AIRPORT, payload)).data
}

export const updateAirport = async (id, payload) => {
    return (await http.put(AIRPORT_API.UPDATE_AIRPORT(id), payload)).data
}

export const deleteAirport = async (id) => {
    return (await http.delete(AIRPORT_API.DELETE_AIRPORT(id))).data
}

export const getAirportByCode = async (code) => {
    return (await http.get(AIRPORT_API.AIRPORT_BY_CODE(code))).data
}