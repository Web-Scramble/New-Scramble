import axios from "axios";
import { SendOtpPayload,ValidateOtpPayload,CreateUserPayload,AuthResponse } from "@/types/authentication";

const baseURL = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });



  export const sendOtp = async (values: SendOtpPayload):Promise<AuthResponse> => {
    const response = await api.post("auth/sendOTP", values);
    return response.data;
  };
  
  export const validateOtp = async (values: ValidateOtpPayload):Promise<AuthResponse> => {
    const response = await api.post("auth/validateOTP", values);
    return response.data;
  };
  
  export const createUser = async (values: CreateUserPayload):Promise<AuthResponse> => {
    const response = await api.post("auth/register", values);
    return response.data;
  };
  
//   export const socialAuth = async (values: any) => {
//     const response = await api.post("auth/social", values);
//     return response.data;
//   };