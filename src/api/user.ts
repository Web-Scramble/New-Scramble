import axios from "axios";
import {
  UserResponse,
  DevicePayload,
  FollowPayload,
  CreateUserPayload,
  UpdateUserPayload,
} from "@/types/user";
import { getJwtToken } from "@/utils/get_jwt_token";

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
    const token = getJwtToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export const createUser = async (
  values: CreateUserPayload
): Promise<UserResponse> => {
  const response = await api.post("user/private/create", values);
  return response.data;
};

export const getUserProfile = async (): Promise<UserResponse> => {
  const response = await api.get("user/private");
  return response.data;
};

export const updateUser = async (
  values: UpdateUserPayload
): Promise<UserResponse> => {
  const response = await api.put("user/private", values);
  return response.data;
};

export const deleteUser = async (): Promise<{ message: string }> => {
  const response = await api.delete("user/private");
  return response.data;
};

export const suspendUser = async (
  userId: string
): Promise<{ message: string }> => {
  const response = await api.put("user/private/suspend", { userId });
  return response.data;
};

export const registerDevice = async (
  values: DevicePayload
): Promise<{ message: string }> => {
  const response = await api.post("user/private/device", values);
  return response.data;
};

export const followUser = async (
  targetUserId: string
): Promise<{ message: string }> => {
  const response = await api.post(`user/private/follow/${targetUserId}`);
  return response.data;
};

export const unfollowUser = async (
  targetUserId: string
): Promise<{ message: string }> => {
  const response = await api.delete(`user/private/unfollow/${targetUserId}`);
  return response.data;
};

export const getFollowers = async (): Promise<FollowPayload[]> => {
  const response = await api.get("user/private/followers");
  return response.data;
};

export const getFollowing = async (): Promise<FollowPayload[]> => {
  const response = await api.get("user/private/following");
  return response.data;
};
