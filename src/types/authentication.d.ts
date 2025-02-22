 export type SendOtpPayload = {
    phone: string;
  }
 export type ValidateOtpPayload ={
    phone: string;
    otp:string;
}
 export type CreateUserPayload ={
    phone: string;
    username:string;
    email:string;
}
  
 export interface AuthResponse {
    token: string;
    user: User;
    message:string;
  }

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  balance: number;
  created_at: string; 
  updated_at: string; 
  profile_picture: string | null;
  firebase_uid: string | null;
  fcm_token: string | null;
  followers_count: number;
  is_suspended: boolean;
  background_picture: string | null;
  followings_count: number;
}
