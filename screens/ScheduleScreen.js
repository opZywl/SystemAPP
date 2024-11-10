
// screens/ScheduleScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ScheduleScreen({ navigation }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [dentist, setDentist] = useState('Dr. Silva');

  const handleSchedule = () => {
    // Aqui você pode adicionar a lógica de agendamento
    alert('Consulta agendada com sucesso!');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Data:</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        value={date}
        onChangeText={setDate}
      />

      <Text style={styles.label}>Horário:</Text>
      <TextInput
        style={styles.input}
        placeholder="HH:MM"
        value={time}
        onChangeText={setTime}
      />

      <Text style={styles.label}>Dentista:</Text>
      <Picker selectedValue={dentist} onValueChange={(itemValue) => setDentist(itemValue)}>
        <Picker.Item label="Dr. Silva" value="Dr. Silva" />
        <Picker.Item label="Dra. Souza" value="Dra. Souza" />
        <Picker.Item label="Dr. Costa" value="Dr. Costa" />
      </Picker>

      <Button title="Confirmar Agendamento" onPress={handleSchedule} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 8, fontSize: 16, borderRadius: 4, marginTop: 5 }
});
