import axios from "axios";


export const finnHub = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: 'ce7vuiaad3i4pjr4ura0ce7vuiaad3i4pjr4urag'
  }
})