import axios from 'axios';
import { url } from './url';
let serverUrl = `${url}/activity`;

export const getActivitiesByCategoryId = async (id, kidId) => {

  return await axios.get(`${serverUrl}/getByCategoryId/${id}/${kidId}`);
};
