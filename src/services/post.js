import http from '@/services/http'
import {POST_API} from '@/constants/api'

export const getListPosts = async (params) => {
    return (await http.get(POST_API.LIST_POST(params))).data
}

export const getPostById = async (id) => {
    return (await http.get(POST_API.POST_BY_ID(id))).data
}

export const createPost = async (payload) => {
    return (await http.post(POST_API.CREATE_POST, payload)).data
}

export const updatePost = async (id, payload) => {
    return (await http.put(POST_API.UPDATE_POST(id), payload)).data
}

export const deletePost = async (id) => {
    return (await http.delete(POST_API.DELETE_POST(id))).data
}