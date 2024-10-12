
-- Criação da tabela de clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(50) NOT NULL,
    telefone VARCHAR(15),
    email VARCHAR(100)
);

-- Criação da tabela de dentistas
CREATE TABLE dentistas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(50) NOT NULL,
    especialidade VARCHAR(100),
    telefone VARCHAR(15),
    email VARCHAR(100)
);

-- Criação da tabela de agendamentos
CREATE TABLE agendamentos (
    id SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_dentista INT NOT NULL,
    date TIMESTAMP NOT NULL,  -- Data do serviço
    service TEXT,  -- Descrição do atendimento
    status VARCHAR(20) DEFAULT 'Agendado',
    FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (id_dentista) REFERENCES dentistas(id) ON DELETE CASCADE
);
