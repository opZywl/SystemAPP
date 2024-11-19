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

const { width, height } = Dimensions.get('window');

export default function AgendamentoScreen() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [servico, setServico] = useState('');

  const handleSubmit = async () => {
    console.log("Função handleSubmit chamada");
    if (!nome || !sobrenome || !telefone || !email || !dataHora || !servico) {
      let missingFields = [];
      if (!nome) missingFields.push('Nome');
      if (!sobrenome) missingFields.push('Sobrenome');
      if (!telefone) missingFields.push('Telefone');
      if (!email) missingFields.push('E-mail');
      if (!dataHora) missingFields.push('Data e Hora');
      if (!servico) missingFields.push('Serviço');
      
      Alert.alert('Erro', `Por favor, preencha os seguintes campos: ${missingFields.join(', ')}`);
      return;
    }
  
    const clienteData = { nome, sobrenome, telefone, email, dataHora, servico };
  
    try {
      console.log("Tentando enviar dados para o servidor...");
      const response = await fetch('http://127.0.0.1:5000/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clienteData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        Alert.alert('Sucesso', result.message || 'Agendamento realizado com sucesso!');
 
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
      console.error("Erro ao conectar com o servidor", error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
    }
  };
  

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>AgendeSorriso</Text>

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
          placeholder="Data e Hora"
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
          <Text style={styles.buttonText}>Agendar Consulta</Text>
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
    backgroundColor: '#f0f0f0',
  },
  container: {
    width: width * 0.8,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
