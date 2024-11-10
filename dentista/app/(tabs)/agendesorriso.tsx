import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity, Modal, FlatList } from 'react-native';

export default function AgendamentoScreen() {
  const [nome, setNome] = useState('');
  const [hora, setHora] = useState('');
  const [servico, setServico] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const servicosDisponiveis = [
    { id: '1', nome: 'Limpeza' },
    { id: '2', nome: 'Obturação' },
    { id: '3', nome: 'Canal' },
  ];

  const handleAgendar = () => {
    if (!nome || !hora || !servico) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    Alert.alert('Agendamento Realizado', `Nome: ${nome}\nHora: ${hora}\nServiço: ${servico}`);
  };

  const renderServicoItem = ({ item }) => (
    <TouchableOpacity
      style={styles.servicoItem}
      onPress={() => {
        setServico(item.nome);
        setModalVisible(false);
      }}
    >
      <Text style={styles.servicoText}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Serviço</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome do Paciente"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora do Agendamento"
        value={hora}
        onChangeText={setHora}
      />

      <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
        <Text style={styles.placeholder}>{servico || 'Selecionar Serviço'}</Text>
      </TouchableOpacity>

      <Button title="Agendar" onPress={handleAgendar} />

      {/* Modal para selecionar o serviço */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione um Serviço</Text>
            <FlatList
              data={servicosDisponiveis}
              renderItem={renderServicoItem}
              keyExtractor={(item) => item.id}
            />
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  placeholder: {
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  servicoItem: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  servicoText: {
    fontSize: 16,
  },
});
