import { User } from "./authentication";
export interface UserResponse {
  user: User;
}
export type UpdateUserPayload = {
  user: User;
};
export type CreateUserPayload = {
  user: User;
};
export type DevicePayload = {
  fcm_token: string;
};
export type FollowPayload = {
  user: User;
};
