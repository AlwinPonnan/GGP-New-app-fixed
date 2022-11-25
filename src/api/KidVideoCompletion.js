import { axiosApiInstance } from '../../App';
import { url } from './url';
import { getDecodedToken } from './user';
let serverUrl = `${url}/KidVideoCompletion`;

export const kidVideoCreate = async (obj) => {
    return await axiosApiInstance.post(`${serverUrl}/`, obj);
};
export const kidVideoGetById = async (id) => {
    return await axiosApiInstance.get(`${serverUrl}/getById/${id}`);
};

export const getAllKidVideo = async () => {
    let decoded = await getDecodedToken();
    return await axiosApiInstance.get(`${serverUrl}/getByKidId//${decoded.userId}`)
}

export const KidVideoUpdate = async (id, obj) => {
    return await axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, obj)
}

export const handleUpdateVideoCompletionStatus = async (id, obj) => {
    return await axiosApiInstance.patch(`${serverUrl}/handleUpdateVideoCompletionStatus/${id}`, obj);
};
