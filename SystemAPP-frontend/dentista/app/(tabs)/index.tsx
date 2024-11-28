import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

export default function AgendaScreen() {
  const [pacientesAgendados, setPacientesAgendados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('http://192.168.18.8:5000/clientes');
        if (response.ok) {
          let data = await response.json();
          data = data.sort((a, b) => new Date(a.datahora) - new Date(b.datahora));
          setPacientesAgendados(data);
        } else {
          Alert.alert('Erro', 'Não foi possível carregar os dados.');
        }
      } catch (error) {
        Alert.alert('Erro', 'Erro ao conectar com o servidor.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientes();
  }, []);

  const deleteCliente = async (id) => {
    try {

      const response = await fetch(`http://192.168.18.8:5000/clientes/${id}`, { method: 'DELETE' });
      if (response.ok) {
        Alert.alert('Sucesso', 'Cliente excluído com sucesso!');
        setPacientesAgendados((prev) => prev.filter((cliente) => cliente.id !== id)); 
      } else {
        Alert.alert('Erro', 'Não foi possível excluir o cliente.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar com o servidor.');
    }
  };

  const renderPaciente = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.nome} {item.sobrenome}</Text>
      <Text style={styles.cardText}><Text style={styles.label}>Serviço:</Text> {item.servico}</Text>
      <Text style={styles.cardText}><Text style={styles.label}>Data:</Text> {item.datahora}</Text>
      <Text style={styles.cardText}><Text style={styles.label}>Email:</Text> {item.email}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteCliente(item.id)}>
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pacientes Agendados</Text>
      <FlatList
        data={pacientesAgendados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPaciente}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    marginTop: 50,
  },

  listContainer: {
    alignItems: 'center',
  },

  card: {
    width: width * 0.8, 
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'flex-start', // Alinhamento dos itens no card
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },

  cardText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },

  label: {
    fontWeight: 'bold',
    color: '#000',
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteButton: {
    marginTop: 10,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.4,  // Ajuste o tamanho do botão de exclusão para 40% da largura
  },

  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
