import qs from "qs";
import { getStrapiURL } from "./apiHelp";

export const fetchApi = async(path: string, urlParams = {}, options = {}) => {
    try {
        const merged ={
            next: {revalidate: 60},
            ...options,
            headers:{
                "Content-type": "aplication/json"
            }
        }

        const queryStri =qs.stringify(urlParams, {encodeValuesOnly: true})

        const request = `${getStrapiURL(`/api${path}${queryStri ? `?${queryStri}` : "" }`)}`

        const res =await fetch(request, merged);
        const data = await res.json();

        return data;

    } catch (error) {
        throw new Error('Error fetch Api')
    }
};