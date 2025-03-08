import { messaging } from '@/services/firebase';
import { getToken } from "firebase/messaging";
import { onMessage } from "firebase/messaging";

export const requestForToken = async () => {
    try {
        const token = await getToken(messaging, { vapidKey:import.meta.env.VITE_FCM_VAPID_KEY,});
        if (token) {
            console.log('Token generated:', token);
            // Send this token to your server to store it for later use
            return token
        } else {
            console.log('No registration token available.');
        }
    } catch (err) {
        console.error('Error getting token:', err);
    }
};
onMessage(messaging, ({ notification }) => {
  if(notification){
    new Notification(notification.title||"notification title", {
      body: notification?.body,
      icon: notification.icon,
    });
  } 
})