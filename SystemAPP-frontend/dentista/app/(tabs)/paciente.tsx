import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function AgendaScreen() {
  const [pacientesAgendados, setPacientesAgendados] = useState([
    { id: '1', nome: 'Paciente 1', servico: 'Limpeza', hora: '10:00 AM', email: 'xxx@example.com' },
    { id: '2', nome: 'Paciente 2', servico: 'Obturação', hora: '11:30 AM', email: 'zzz@example.com' },
  ]);

  const [proximosAgendamentos, setProximosAgendamentos] = useState([
    { id: '3', nome: 'Paciente 3', servico: 'Limpeza', hora: '2:00 PM', email: 'yyy@example.com' },
    { id: '4', nome: 'Paciente 4', servico: 'Obturação', hora: '3:30 PM', email: 'zzz@example.com' },
  ]);

  const [servicosDisponiveis, setServicosDisponiveis] = useState([
    { id: '1', nome: 'Limpeza', preco: 'R$50', duracao: '30 mins', icon: 'tooth-outline' },
    { id: '2', nome: 'Obturação', preco: 'R$100', duracao: '45 mins', icon: 'toothbrush-paste' },
  ]);

  const renderPaciente = ({ item }) => (
    <View style={styles.pacienteItem}>
      <View style={styles.pacienteInfo}>
        <Text style={styles.pacienteNome}>{item.nome}</Text>
        <Text style={styles.pacienteServico}>{item.servico}</Text>
      </View>
      <Text style={styles.pacienteHora}>{item.hora}</Text>
      <TouchableOpacity style={styles.infoButton}>
        <FontAwesome name="info-circle" size={20} color="#555" />
      </TouchableOpacity>
    </View>
  );

  const renderServico = ({ item }) => (
    <View style={styles.servicoItem}>
      <MaterialCommunityIcons name={item.icon} size={40} color="#007bff" style={styles.servicoIcon} />
      <Text style={styles.servicoPreco}>{item.preco}</Text>
      <Text style={styles.servicoNome}>{item.nome}</Text>
      <Text style={styles.servicoDuracao}>{item.duracao}</Text>
    </View>
  );

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Agenda</Text>

        <Text style={styles.sectionTitle}>Pacientes Agendados</Text>
        <FlatList
          data={pacientesAgendados}
          renderItem={renderPaciente}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
        <TouchableOpacity style={styles.agendarButton}>
          <Text style={styles.agendarButtonText}>Novo Agendamento</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Serviços Disponíveis</Text>
        <FlatList
          data={servicosDisponiveis}
          renderItem={renderServico}
          keyExtractor={(item) => item.id}
          horizontal
          style={styles.servicosList}
        />
        <TouchableOpacity style={styles.agendarButton}>
          <Text style={styles.agendarButtonText}>Mais Serviços</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Próximos Agendamentos</Text>
        <FlatList
          data={proximosAgendamentos}
          renderItem={renderPaciente}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  container: {
    width: width > 600 ? 500 : '90%', // Largura máxima de 500 para telas maiores
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  list: {
    marginVertical: 10,
  },
  pacienteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  pacienteInfo: {
    flex: 1,
  },
  pacienteNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  pacienteServico: {
    fontSize: 14,
    color: '#888',
  },
  pacienteHora: {
    fontSize: 14,
    color: '#555',
    marginRight: 10,
  },
  infoButton: {
    padding: 5,
  },
  agendarButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  agendarButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  servicosList: {
    marginVertical: 10,
  },
  servicoItem: {
    width: 150,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  servicoIcon: {
    marginBottom: 5,
  },
  servicoPreco: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
  },
  servicoNome: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  servicoDuracao: {
    fontSize: 12,
    color: '#888',
  },
});
