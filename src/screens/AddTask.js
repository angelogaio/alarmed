import React, {Component} from 'react';
import {
  Platform,
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Switch,
  TouchableWithoutFeedback,
} from 'react-native';

import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';

import commonStyles from '../commonStyles';

const initialState = {
  desc: '',
  date: new Date(),
  local:'',
  showDatePicker: false,
  showTimePicker: false,
  ativo: false,
};

export default class AddTask extends Component {
  state = {
    ...initialState,
  };

  scheduleAlarm = () => {
    const now = new Date();
    const delay = this.state.date.getTime() - now.getTime();
    const desc = this.state.desc

    console.log(desc)
    
    if (delay > 0) {
      PushNotification.localNotificationSchedule({
        channelId: now,
        message: desc,
        date: new Date(Date.now() + delay),
        allowWhileIdle: true,
      });
      alert('Seu ' + desc +  ' foi agendado!');
    } else {
      alert('Por favor, selecione uma data e hora futuras.');
    }
  };

  save = () => {
    const newTask = {
      desc: this.state.desc,
      date: this.state.date,
    };

    this.scheduleAlarm()
    this.props.onSave && this.props.onSave(newTask);
    this.setState({...initialState});
  };

  getDatePicker = () => {
    let datePicker = (
      <View>
        <Text style={styles.texto}>Selecione a Data:</Text>
        <DateTimePicker
          value={this.state.date}
          onChange={(_, date) => this.setState({date, showDatePicker: false})}
          mode="date"
        />
      </View>
    );

    const dateString = moment(this.state.date).format('D MMMM YYYY');

    if (Platform.OS === 'android') {
      datePicker = (
        <View style={{marginRight: 40}}>
          <Text style={styles.texto}>Selecione a Data:</Text>
          <TouchableOpacity
            onPress={() => this.setState({showDatePicker: true})}>
            <Text style={styles.date}>{dateString}</Text>
          </TouchableOpacity>
          {this.state.showDatePicker && datePicker}
        </View>
      );
    }

    return datePicker;
  };

  getTimePicker = () => {
    let timePicker = (
      <View style={{width:100}}>
        <Text style={styles.texto}>Selecione a Hora:</Text>
        <DateTimePicker
          value={this.state.date}
          onChange={(_, date) => this.setState({date, showTimePicker: false})}
          mode="time"
        />
      </View>
    );

    const dateString = moment(this.state.date).format('h:mm:ss a');

    if (Platform.OS === 'android') {
      timePicker = (
        <View>
          <Text style={styles.texto}>Selecione a Hora:</Text>
          <TouchableOpacity
            onPress={() => this.setState({showTimePicker: true})}>
            <Text style={styles.date}>{dateString}</Text>
          </TouchableOpacity>
          {this.state.showTimePicker && timePicker}
        </View>
      );
    }

    return timePicker;
  };

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.onCancel}
        animationType="slide">
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}>Dados do Alerta</Text>
          <View style={styles.blocos}>
            <TextInput
              style={styles.desc}
              placeholder="Descrição..."
              placeholderTextColor='#19466D'
              onChangeText={desc => this.setState({desc})}
              value={this.state.desc}
            />
            <View style={{ marginLeft:10, justifyContent: 'flex-start', right:5}}>
            <Text >Ativo</Text>
            <Switch
              value={this.state.ativo}
              onValueChange={() =>
                this.setState({ativo: !this.state.ativo})
              }></Switch>
            </View>
          </View>

          <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
            {this.getDatePicker()}
            {this.getTimePicker()}
          </View>

          <View style={styles.blocos}>
          <TextInput
              style={styles.desc}
              placeholder="Local"
              placeholderTextColor='#19466D'
              onChangeText={local => this.setState({local})}
              value={this.state.local}
            />
          </View>


          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.save}>
              <Text style={styles.button}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '03ACEE',
    color: '#19466D',
    textAlign: 'center',
    padding: 15,
    fontSize: 18,
  },
  input: {
    height: 40,
    margin: 15,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 6,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: '#19466D',
  },
  date: {
    fontSize: 20,
    marginLeft: 15,
    height: 40,
    margin: 0,
    padding: 5,
    color:'#19466D'
  },
  blocos: {
    flexDirection: 'row',
  },
  desc: {
    color: '#19466D',
    flex: 1,
    height: 40,
    margin: 15,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 6,
  },
  texto: {
    color: '#19466D',
    height: 20,
    marginLeft: 15,
  },
});
