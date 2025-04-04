import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { registerForPushNotificationsAsync } from "../lib/notifications.ts";
import { ExpoPushToken } from "expo-notifications";
import * as Notifications from "expo-notifications";
import { supabase } from "../lib/supabase.ts";
import { useAuth } from "./AuthProvider.tsx";
import { profile } from "node:console";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState<ExpoPushToken>();
  const {profile} = useAuth();
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();
  
  const savePushToken = async (newToken: string | undefined) => {
    setExpoPushToken(newToken as ExpoPushToken | undefined)
    if(!newToken) return;
    //update the token in the database
    await supabase.from("profiles").update({ expo_push_token: newToken }).eq("id", profile?.id);
  }
  
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => savePushToken(token ?? ''))
      .catch((error: any) => setExpoPushToken(`${error}`));
      

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        notificationListener.current &&
          Notifications.removeNotificationSubscription(notificationListener.current);
        responseListener.current &&
          Notifications.removeNotificationSubscription(responseListener.current);
      };

  }, []);

  console.log("push token", expoPushToken);
  console.log("Notifications", notification);

  return <>{children}</>;
};
export default NotificationProvider;