import http from '@/services/http'
import {FLIGHT_API} from '@/constants/api'

export const getListFlights = async (params) => {
    return (await http.get(FLIGHT_API.LIST_FLIGHT(params))).data
}

export const getFlightById = async (id) => {
    return (await http.get(FLIGHT_API.FLIGHT_BY_ID(id))).data
}

export const createFlight = async (payload) => {
    return (await http.post(FLIGHT_API.CREATE_FLIGHT, payload)).data
}

export const updateFlight = async (id, payload) => {
    return (await http.put(FLIGHT_API.UPDATE_FLIGHT(id), payload)).data
}

export const deleteFlight = async (id) => {
    return (await http.delete(FLIGHT_API.DELETE_FLIGHT(id))).data
}

export const getFlightByNumber = async (number) => {
    return (await http.get(FLIGHT_API.FLIGHT_BY_NUMBER(number))).data
}