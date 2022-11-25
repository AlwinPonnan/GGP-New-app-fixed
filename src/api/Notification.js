import axios from 'axios';
import { url } from './url';
let serverUrl = `${url}/notification`;



export const getAllNotificationsByUserId = async (kidId) => {
    return await axios.get(`${serverUrl}/getByUserId/${kidId}`);
};

