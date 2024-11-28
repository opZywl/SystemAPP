import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router'; 
const { width, height } = Dimensions.get('window');

export default function PacientesScreen() {
  const [pacientes, setPacientes] = useState([]);
  const router = useRouter();

  const fetchPacientes = async () => {
    try {

      const response = await axios.get('http://192.168.18.8:5000/clientes');
      setPacientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
    }
  };
  

  useEffect(() => {
    fetchPacientes();
  }, []);

  const renderPacienteItem = ({ item }) => (
    <View style={styles.pacienteItem}>
      <FontAwesome name="user-circle" size={24} color="#007bff" />
      <View style={styles.pacienteInfo}>
        <Text style={styles.pacienteNome}>{item.nome}</Text>
        <Text style={styles.pacienteEmail}>{item.email}</Text>
      </View>
      <Text style={styles.pacienteTelefone}>{item.telefone}</Text>
    </View>
  );

  const handleCadastrarPaciente = () => {
    router.push('/agendesorriso'); 
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Pacientes</Text>
        <FlatList
          data={pacientes}
          renderItem={renderPacienteItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <TouchableOpacity style={styles.cadastrarButton} onPress={handleCadastrarPaciente}>
          <Text style={styles.cadastrarButtonText}>Cadastrar Paciente</Text>
        </TouchableOpacity>
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
    width: width > 600 ? 450 : '90%', 
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
  pacienteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pacienteInfo: {
    flex: 1,
    marginLeft: 10,
  },
  pacienteNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  pacienteEmail: {
    fontSize: 14,
    color: '#888',
  },
  pacienteTelefone: {
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  cadastrarButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  cadastrarButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
