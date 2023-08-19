import { API_BASE_URL } from './apiConfig'
import axios from 'axios'

export const fetchPokemonList = async (page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon`, {
      params: {
        offset: (page - 1) * pageSize,
        limit: pageSize,
      },
    })
    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const fetchPokemonById = async id => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${id}`)
    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const fetchPokemonSpeciesList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon-species`)
    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
}

