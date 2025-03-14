import { User } from "@/types/authentication";
import { create } from "zustand";

interface AuthState {
  firebase_token:string;
  token: string;
  user:User;
  refillAmount:number;
  topupAmount:number;
  selectedId:string;
  reloading:boolean;
  updateToken: (newToken: string) => void;
  updateFirebaseToken: (newToken: string) => void;
  updateSelectedId: (newToken: string) => void;
  updateUser: (newUser: User) => void;
  updateRefillAmount: (amount: number) => void;
  updateTopupAmount: (amount: number) => void;
  setReloading: (status: boolean) => void;
}
export const authStore = create<AuthState>()((set) => ({
  firebase_token:"",
  refillAmount:20,
  topupAmount:0,
  token: "",
  user:{
    id: "",
    username: "",
    email: "",
    phone:"",
    balance:0,
    profile_picture:"",
    role:"",
    created_at: "" ,
    updated_at: "",
    firebase_uid:"" ,
    fcm_token: "" ,
    followers_count:0,
    is_suspended: false,
    background_picture:"" ,
    followings_count: 0,
  },
  selectedId:'',
  reloading:true,
  updateSelectedId:(by) => set(() => ({ selectedId: by })),
  updateToken: (by) => set(() => ({ token: by })),
  updateFirebaseToken: (by) => set(() => ({ firebase_token: by })),
  updateUser: (by) => set(() => ({ user: by })),
  updateTopupAmount: (by) => set(() => ({ topupAmount: by })),
  updateRefillAmount: (by) => set(() => ({ refillAmount: by })),
  setReloading: (by) => set(() => ({ reloading: by })),
}));
