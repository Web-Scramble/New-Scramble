import axios from "axios";
import { 
  SendOtpPayload,
  ValidateOtpPayload,
  CreateUserPayload,
  SocialAuthPayload,
  SocialAddPhonePayload,
  AuthResponse,
  OtpAuthPayload
 } from "@/types/authentication";

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
  
  export const socialAuth = async (values: SocialAuthPayload):Promise<AuthResponse> => {
    const response = await api.post("auth/socialAuth", values);
    return response.data;
  };
  export const AddPhone = async (values: SocialAddPhonePayload):Promise<AuthResponse> => {
    const response = await api.post("auth/social/registerSocialPhone", values);
    return response.data;
  };
  export const OtpAuth = async (values: OtpAuthPayload):Promise<AuthResponse> => {
    console.log(values)
    const response = await api.post("auth/getUserFromToken", values);
    return response.data;
  };