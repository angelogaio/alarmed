import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform, View } from 'react-native';
import PushNotification from 'react-native-push-notification';
import TaskList from './src/screens/TaskList';

async function requestNotificationPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: "Permissão para Notificações",
          message: "Este aplicativo gostaria de enviar notificações.",
          buttonNeutral: "Perguntar Depois",
          buttonNegative: "Cancelar",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Você tem permissão para notificações");
      } else {
        console.log("Permissão para notificações negada");
      }
    } catch (err) {
      console.warn(err);
    }
  }
}

const App = () => {
  useEffect(() => {
    requestNotificationPermission();

    PushNotification.configure({
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
      },
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });

    PushNotification.createChannel(
      {
        channelId: "default-channel-id",
        channelName: "Default Channel",
        channelDescription: "A default channel",
        soundName: "default",
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );
  }, []);

  return <TaskList />;
};

export default App;
