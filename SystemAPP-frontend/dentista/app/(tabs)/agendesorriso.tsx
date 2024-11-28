import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function AgendamentoScreen() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [servico, setServico] = useState('');

  const handleSubmit = async () => {
    if (!nome || !sobrenome || !telefone || !email || !dataHora || !servico) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
  
    const clienteData = {
      nome,
      sobrenome,
      telefone,
      email,
      datahora: dataHora,
      servico,
    };
  
    try {

      const response = await fetch('http://192.168.18.8:5000/create_clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clienteData),
      });
  
      if (response.ok) {
        const result = await response.json();
        Alert.alert('Sucesso', result.message || 'Cliente cadastrado com sucesso!');
        setNome('');
        setSobrenome('');
        setTelefone('');
        setEmail('');
        setDataHora('');
        setServico('');
      } else {
        const error = await response.json();
        Alert.alert('Erro', error.message || 'Falha ao cadastrar cliente');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
    }
  };
  

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro de Cliente</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Sobrenome"
          value={sobrenome}
          onChangeText={setSobrenome}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Data e Hora (YYYY-MM-DD HH:mm:ss)"
          value={dataHora}
          onChangeText={setDataHora}
        />
        <TextInput
          style={styles.input}
          placeholder="Serviço"
          value={servico}
          onChangeText={setServico}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Cadastrar</Text>
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
    width: width > 600 ? 500 : '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
