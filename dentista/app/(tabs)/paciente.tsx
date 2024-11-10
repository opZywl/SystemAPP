import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Image } from 'react-native';

export default function AgendaScreen() {
  const [pacientesAgendados, setPacientesAgendados] = useState([
    { id: '1', nome: 'paciente 1', hora: '10:00 AM', servico: 'Limpeza' },
    { id: '2', nome: 'paciente 2', hora: '11:30 AM', servico: 'Obturação' },
  ]);

  const [proximosAgendamentos, setProximosAgendamentos] = useState([
    { id: '3', nome: 'paciente 1', hora: '2:00 PM' },
    { id: '4', nome: 'paciente 2 ', hora: '3:30 PM' },
  ]);

  const [servicosDisponiveis, setServicosDisponiveis] = useState([
    { id: '1', nome: 'Limpeza', preco: 'R$50', duracao: '30 mins', image: require('../../assets/images/dente.avif') },
    { id: '2', nome: 'Obturação', preco: 'R$100', duracao: '45 mins', image: require('../../assets/images/dente.avif') },
  ]);

  const renderPaciente = ({ item }) => (
    <View style={styles.pacienteItem}>
      <Text style={styles.pacienteNome}>{item.nome}</Text>
      <Text style={styles.pacienteServico}>{item.servico}</Text>
      <Text style={styles.pacienteHora}>{item.hora}</Text>
    </View>
  );

  const renderServico = ({ item }) => (
    <View style={styles.servicoItem}>
      <Image source={item.image} style={styles.servicoImage} />
      <Text style={styles.servicoNome}>{item.nome}</Text>
      <Text style={styles.servicoPreco}>{item.preco}</Text>
      <Text style={styles.servicoDuracao}>{item.duracao}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Pacientes Agendados</Text>
      <FlatList
        data={pacientesAgendados}
        renderItem={renderPaciente}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Novo Agendamento</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Serviços Disponíveis</Text>
      <FlatList
        data={servicosDisponiveis}
        renderItem={renderServico}
        keyExtractor={(item) => item.id}
        horizontal
        style={styles.list}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Mais Serviços</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Próximos Agendamentos</Text>
      <FlatList
        data={proximosAgendamentos}
        renderItem={renderPaciente}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  list: {
    marginVertical: 10,
  },
  pacienteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  pacienteNome: {
    fontSize: 16,
    fontWeight: '600',
  },
  pacienteServico: {
    color: '#888888',
  },
  pacienteHora: {
    color: '#555555',
  },
  servicoItem: {
    width: 120,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  servicoImage: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
  servicoNome: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  servicoPreco: {
    color: '#888888',
  },
  servicoDuracao: {
    color: '#555555',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
