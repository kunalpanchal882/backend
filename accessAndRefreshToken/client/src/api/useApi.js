import axios from "axios";
import { useContext } from "react";
import Section from "../context/Context";

export default function useApi(){

   const {accessToken} =  useContext(Section.store)

   const api = axios.create({
    baseURL:"http://localhost:5173",
    withCredentials:true
})

    api.interceptors.request.use((config) =>{
        config.headers.Authorization = `Bearer ${accessToken}`

        return config
    })


    return api

}





