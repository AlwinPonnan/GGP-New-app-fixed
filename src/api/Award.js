import axios from 'axios';
import { url } from './url';
import { getDecodedToken } from './user';
let serverUrl = `${url}/award`;

export const getAwardsByUserId = async () => {
    let decoded = await getDecodedToken()
    return await axios.get(`${serverUrl}/getAwardsByUserId/${decoded.userId}`);
};
