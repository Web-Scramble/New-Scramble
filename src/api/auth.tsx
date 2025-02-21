import axios from "axios";
// import { Inputs, UserCreationInputs, ValidateInputs } from "@/types/authentication";
// import { ChallengeFormData } from "@/types/challenge";
// import { getToken } from "./getToken";

const baseURL = import.meta.env.VITE_API_URL
// const token = getToken()



export const sendOtp = async (values:any) => {
  const response = await axios.post(`${baseURL}auth/send-otp`,values);
  return response.data;
};
export const ValidateOtp = async (values:ValidateInputs) => {
  const response = await axios.post(`${baseURL}auth/validate-otp`,values);
  return response.data;
};
export const createUser = async (values:UserCreationInputs) => {
  console.log(values)
  const response = await axios.post(`${baseURL}auth/register`,values);
  return response.data;
};
export const socialAuth = async (values:any) => {
  console.log(values)
  const response = await axios.post(`${baseURL}auth/social`,values);
  return response.data;
};
