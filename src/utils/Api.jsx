import axios from 'axios';


const baseUrl = 'https://rickandmortyapi.com'
export const fetchLocation = async () => {
  const {data} = await axios.get(`${baseUrl}/api/location`, {withCredentials: false,});
  return data;
}

export const fetchCharacter = async () => {
  const {data} = await axios.get(`${baseUrl}/api/character`, {withCredentials: false,});
  return data;
}