import axios from "axios";
import api from "./interceptor";



  export const getAllChallenges = async() =>{
    const response = await api.get("/challenges")
    console.log(response.data)
    return response.data
  }