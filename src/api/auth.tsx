import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

 export interface SendOtpPayload {
    phone: string;
  }
 export interface ValidateOtpPayload {
    phone: string;
    otp:string;
}
 export interface CreateAccountPayload {
    phone: string;
    otp:string;
}
  
 export interface AuthResponse {
    token: string;
    user: { id: string; name: string };
    message:string;
  }

  export const sendOtp = async (values: SendOtpPayload):Promise<AuthResponse> => {
    const response = await api.post("auth/sendOTP", values);
    return response.data;
  };
  
  export const validateOtp = async (values: ValidateOtpPayload):Promise<AuthResponse> => {
    const response = await api.post("auth/validateOTP", values);
    return response.data;
  };
  
  export const createUser = async (values: CreateAccountPayload):Promise<AuthResponse> => {
    const response = await api.post("auth/register", values);
    return response.data;
  };
  
//   export const socialAuth = async (values: any) => {
//     const response = await api.post("auth/social", values);
//     return response.data;
//   };