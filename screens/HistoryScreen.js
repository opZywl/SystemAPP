// screens/HistoryScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const appointments = [
  { id: '1', date: '10/11/2024', time: '09:00', dentist: 'Dr. Silva' },
  { id: '2', date: '15/11/2024', time: '14:00', dentist: 'Dra. Souza' },
];

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Consultas</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{`Data: ${item.date}, Horário: ${item.time}, Dentista: ${item.dentist}`}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' }
});
