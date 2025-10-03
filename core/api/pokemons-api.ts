import axios from 'axios';

export const pokemonsApi = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://pokeapi.co/api/v2',
});