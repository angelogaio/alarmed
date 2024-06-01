import React, { useState } from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

// Configurar as notificações (somente necessário uma vez)
PushNotification.configure({
  // (opcional) Solicitar permissões (somente iOS)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  // (obrigatório) Handler de notificação
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
    // (opcional) Processar a notificação
    if (Platform.OS === 'ios') {
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    }
  },

  // (opcional) Solicitar permissões no iOS (padrão é true)
  requestPermissions: Platform.OS === 'ios',
});

const Alarm = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const scheduleAlarm = () => {
    const now = new Date();
    const delay = date.getTime() - now.getTime();
    if (delay > 0) {
      PushNotification.localNotificationSchedule({
        message: "Hora do Alarme!",
        date: new Date(Date.now() + delay), // Alarme agendado
        allowWhileIdle: true, // Android
      });
      alert('Alarme agendado!');
    } else {
      alert('Por favor, selecione uma data e hora futuras.');
    }
  };

  return (
    <View>
      <Button onPress={showDatePicker} title="Selecione Data e Hora" />
      {show && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}
      <Button onPress={scheduleAlarm} title="Agendar Alarme" />
    </View>
  );
};

export default Alarm;
