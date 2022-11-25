import axios from 'axios';
import { url } from './url';
import AsyncStorage from '@react-native-async-storage/async-storage';
let serverUrl = `${url}/users`;
let favcyUrl = "https://www.favcy.com"    ////////////production
// let favcyUrl = "https://staging.favcy.com"    ////////////staging
import jwt_decode from 'jwt-decode';

export const newParent = async formData => {
  return await axios.post(`${serverUrl}/register`, formData);
};
export const registerKid = async formData => {
  return await axios.post(`${serverUrl}/registerKid`, formData);
};

export const getValidSubscription = async (userId) => {
  return await axios.get(`${serverUrl}/getValidSubscription/${userId}`);
};
export const getValidSubscriptionByPhone = async (kidId) => {
  return await axios.get(`${serverUrl}/getValidSubscriptionByPhone/${kidId}`);
};
export const pinUpdate = async formData => {
  return await axios.patch(`${serverUrl}/pinUpdate`, formData);
};

export const getFavcyTokenFromDB = async (phone) => {
  return await axios.get(`${serverUrl}/getFavcyToken/${phone}`);
};

export const CheckPinValid = async (formData) => {
  const id = await getDecodedToken();
  return await axios.post(`${serverUrl}/checkPinValid/${id.userId}`, formData);
};
export const createPin = async formData => {
  return await axios.patch(`${serverUrl}/createpin`, formData);
};
export const loginUser = async formData => {
  console.log("login api hit")
  return await axios.post(`${serverUrl}/login`, formData);
};
export const CheckValidReferral = async (obj) => {
  // const id = await getDecodedToken();
  // console.log(id, "decoded")
  //   console.log('id', id);
  return await axios.post(`${serverUrl}/checkValidReferral`, obj);
};
export const userData = async () => {
  const id = await getDecodedToken();
  // console.log(id, "decoded")
  //   console.log('id', id);
  return await axios.get(`${serverUrl}/getUserDataById/${id.userId}`);
};
export const getKidWalletData = async () => {
  const id = await getDecodedToken();
  // console.log(id, "decoded")
  //   console.log('id', id);
  return await axios.get(`${serverUrl}/getKidWalletByKidId/${id.userId}`);
};

export const getKidWalletDataFromParent = async (id) => {
  // console.log(id, "decoded")
  //   console.log('id', id);
  return await axios.get(`${serverUrl}/getKidWalletByKidId/${id}`);
};

////////get kids list by number
export const getKidsListByNumber = async (number) => {
  return await axios.get(`${serverUrl}/getKidsListByNumber/${number}`);
};

export const updateParentUserData = async formData => {
  const id = await getDecodedToken();
  return await axios.patch(
    `${serverUrl}/updateUserDataById/${id.userId}`,
    formData,
  );
};
export const updateUserData = async (formData, id) => {
  //   console.log('id', id);
  return await axios.patch(`${serverUrl}/updateUserDataById/${id}`, formData);
};

export const generateGuestToken = async () => {
  return await axios.post(
    `${favcyUrl}//api/2.0/auth-token?parent_id=0&start_point=something`,
    {},
    {
      headers: {
        accept: 'application/json',
        ///////staging
        // 'app-id': 'ghqezpxmzd-1713',


        //////production
        'app-id': 'nchoxvrpie-598',
      },
    },


  );
};

export const sendOtp = async (formData, token) => {

  let config = {
    headers: {
      'auth-token': token,
      'Content-Type': 'multipart/form-data',
    }
  }


  return await axios.post(`${favcyUrl}/api/3.1/otp/send`, formData, config);
};

export const verifyOtp = async (formData, token) => {
  console.log("verify started")
  return await axios.post(`${favcyUrl}/api/3.1/login`, formData, {
    headers: {
      'auth-token': token,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getUserDataFromBackend = async obj => {
  return await axios.post(`${serverUrl}/checkPinExists`, obj);
};

////////Phone Number
export const setPhoneNumber = async phone => {
  return await AsyncStorage.setItem('PHONE', phone);
};

export const removePhoneNumber = async () => {
  let token = await AsyncStorage.getItem('PHONE')
  if (token)
    return await AsyncStorage.removeItem('PHONE');

  else return false
};

export const getPhoneNumber = async () => {
  return await AsyncStorage.getItem('PHONE');
};


////////Role
export const setRoleString = async role => {
  return await AsyncStorage.setItem('ROLE', role);
};

export const removeRoleString = async () => {
  return await AsyncStorage.removeItem('ROLE');
};

export const getRoleString = async () => {
  return await AsyncStorage.getItem('ROLE');
};



////////Address
export const setAddress = async address => {
  return await AsyncStorage.setItem('ADDRESS', address);
};

export const removeAddress = async () => {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!caalled!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  return await AsyncStorage.removeItem('ADDRESS');
};

export const getAddress = async () => {
  return await AsyncStorage.getItem('ADDRESS');
};




///////////// Background
export const setKidDashboardBackgroundImg = async background => {
  return await AsyncStorage.setItem('KIDDASHBOARDBACKGROUND', background);
};
export const getKidDashboardBackgroundImg = async () => {
  return await AsyncStorage.getItem('KIDDASHBOARDBACKGROUND');
};




////////favcy Payment token
export const setFavcyAuthToken = async token => {
  return await AsyncStorage.setItem('FAVCY_AUTH_TOKEN', token);
};
export const getDecodedFavcyToken = async () => {
  let token = await AsyncStorage.getItem('FAVCY_AUTH_TOKEN');
  let decoded = await jwt_decode(token);

  return decoded;
};
export const getFavcyAuthToken = async () => {
  return await AsyncStorage.getItem('FAVCY_AUTH_TOKEN');
};
export const removeFavcyAuthToken = async () => {
  return await AsyncStorage.removeItem('FAVCY_AUTH_TOKEN');
};


////////favcy Session token
export const setFavcyMainAuthToken = async token => {
  return await AsyncStorage.setItem('FAVCY_AUTH_TOKEN', token);
};
export const getDecodedFavcyMainToken = async () => {
  let token = await AsyncStorage.getItem('FAVCY_AUTH_TOKEN');
  let decoded = await jwt_decode(token);
  return decoded;
};
export const getFavcyAuthMainToken = async () => {
  return await AsyncStorage.getItem('FAVCY_AUTH_TOKEN');
};
export const removeFavcyAuthMainToken = async () => {
  return await AsyncStorage.removeItem('FAVCY_AUTH_TOKEN');
};


///// our token
export const setAuthToken = async token => {
  return await AsyncStorage.setItem('AUTH_TOKEN', token);
};

export const getDecodedToken = async () => {
  let token = await AsyncStorage.getItem('AUTH_TOKEN');
  let decoded = await jwt_decode(token);

  return decoded;
};

export const getAuthToken = async () => {
  return await AsyncStorage.getItem('AUTH_TOKEN');
};

export const removeAuthToken = async () => {
  return await AsyncStorage.removeItem('AUTH_TOKEN');
};


export const setUserObjForRegister = async (obj) => {
  return await AsyncStorage.setItem('USER_OBJ_FOR_REGISTER', obj);
};
export const getUserObjForRegister = async () => {
  return await AsyncStorage.getItem('USER_OBJ_FOR_REGISTER');
};

export const removeUserObjForRegister = async () => {
  return await AsyncStorage.removeItem('USER_OBJ_FOR_REGISTER');
};







export const setCurrentTabForMissions = async (VAL) => {
  return await AsyncStorage.setItem('CURRENTTABFORMISSION', VAL);
};
export const getCurrentTabForMissions = async () => {
  return await AsyncStorage.getItem('CURRENTTABFORMISSION');
};

export const removeCurrentTabForMissions = async () => {
  return await AsyncStorage.removeItem('CURRENTTABFORMISSION');
};


export const setCurrentTabForVideo = async (VAL) => {
  return await AsyncStorage.setItem('CURRENTTABFORVIDEO', VAL);
};
export const getCurrentTabForVideo = async () => {
  return await AsyncStorage.getItem('CURRENTTABFORVIDEO');
};

export const removeCurrentTabForVideo = async () => {
  return await AsyncStorage.removeItem('CURRENTTABFORVIDEO');
};
