import axios from 'axios';
import { url } from './url';
let serverUrl = `${url}/category`;



export const getAllCategoriesByKidId = async id => {
  return await axios.get(`${serverUrl}/getByKidId/${id}`);
};

