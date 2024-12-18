import http from '@/services/http'
import {PLANE_API} from '@/constants/api'

export const getListPlanes = async (params) => {
    return (await http.get(PLANE_API.LIST_PLANE(params))).data
}

export const getPlaneById = async (id) => {
    return (await http.get(PLANE_API.PLANE_BY_ID(id))).data
}

export const createPlane = async (payload) => {
    return (await http.post(PLANE_API.CREATE_PLANE, payload)).data
}

export const updatePlane = async (id, payload) => {
    return (await http.put(PLANE_API.UPDATE_PLANE(id), payload)).data
}

export const deletePlane = async (id) => {
    return (await http.delete(PLANE_API.DELETE_PLANE(id))).data
}