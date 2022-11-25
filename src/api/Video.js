import axios from 'axios';
import { url } from './url';
let serverUrl = `${url}/userVideo`;


export const getTodayMission = async () => {
    return await axios.get(`${serverUrl}/`)
}
