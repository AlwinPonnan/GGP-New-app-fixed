import axios from 'axios';
import { url } from './url';
let serverUrl = `${url}/coupon`;

export const getActiveCoupons = async () => {

    return await axios.get(`${serverUrl}/getActiveCoupons`);
};
