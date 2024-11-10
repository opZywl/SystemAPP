import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, FlatList, Dimensions } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function AgendamentoScreen() {
  const [nome, setNome] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [servico, setServico] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [convenio, setConvenio] = useState('');

  const servicosDisponiveis = [
    { id: '1', nome: 'Limpeza', icon: 'tooth-outline' },
    { id: '2', nome: 'Restauração', icon: 'toothbrush-paste' },
  ];

  const handleAgendar = () => {
    if (!nome || !dataHora || !servico) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    Alert.alert('Agendamento Realizado', `Nome: ${nome}\nData e Hora: ${dataHora}\nServiço: ${servico}`);
  };

  const renderServicoItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.servicoItem, servico === item.nome && styles.servicoItemSelecionado]}
      onPress={() => {
        setServico(item.nome);
        setModalVisible(false);
      }}
    >
      <MaterialCommunityIcons name={item.icon} size={24} color="#007bff" />
      <Text style={styles.servicoText}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>AgendeSorriso</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do Paciente"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Data e Hora"
          value={dataHora}
          onChangeText={setDataHora}
        />

        <Text style={styles.sectionTitle}>Convênios:</Text>
        <View style={styles.conveniosContainer}>
          <TouchableOpacity
            style={[styles.convenioButton, convenio === 'Unimed' && styles.convenioButtonSelecionado]}
            onPress={() => setConvenio('Unimed')}
          >
            <Text style={styles.convenioButtonText}>Unimed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.convenioButton, convenio === 'SUS' && styles.convenioButtonSelecionado]}
            onPress={() => setConvenio('SUS')}
          >
            <Text style={styles.convenioButtonText}>Bradesco</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Serviços</Text>
        <FlatList
          data={servicosDisponiveis}
          renderItem={renderServicoItem}
          keyExtractor={(item) => item.id}
          horizontal
          style={styles.servicosList}
        />

        <Text style={styles.sectionTitle}>Visualize o agendamento</Text>
        <View style={styles.agendamentoPreview}>
          <FontAwesome name="calendar" size={40} color="#007bff" />
          <View style={styles.agendamentoInfo}>
            <Text style={styles.pacienteNome}>Paciente</Text>
            <Text style={styles.agendamentoData}>10/11/2024 às 00:00</Text>
            <TouchableOpacity style={styles.infoButton}>
              <FontAwesome name="info-circle" size={20} color="#555" />
              <Text style={styles.infoButtonText}>Detalhes</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.agendarButton} onPress={handleAgendar}>
          <Text style={styles.agendarButtonText}>Agendar consulta</Text>
        </TouchableOpacity>
      </View>

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
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  conveniosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  convenioButton: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  convenioButtonSelecionado: {
    backgroundColor: '#007bff',
  },
  convenioButtonText: {
    color: '#333',
  },
  servicosList: {
    marginBottom: 20,
  },
  servicoItem: {
    width: 100,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  servicoItemSelecionado: {
    backgroundColor: '#d0e7ff',
  },
  servicoText: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
  agendamentoPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  agendamentoInfo: {
    marginLeft: 15,
  },
  pacienteNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  agendamentoData: {
    color: '#888',
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  infoButtonText: {
    marginLeft: 5,
    color: '#007bff',
    fontSize: 14,
  },
  agendarButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  agendarButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
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
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
  },
});
