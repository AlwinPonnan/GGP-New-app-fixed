import axios from "axios";
import { url } from "./url";
let serverUrl = `${url}/subscription`


export const getSubscription = async () => {
    return await axios.get(`${serverUrl}/`)
}



