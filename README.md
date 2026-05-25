# 💬 Chat Real-Time com Next.js & MongoDB Atlas

Este projeto é um aplicativo de chat em tempo real desenvolvido com **Next.js** no frontend e um servidor **Socket.io** no backend, integrado ao banco de dados NoSQL **MongoDB Atlas** para persistência de mensagens.

---

## 🚀 Funcionalidades

- **Comunicação em Tempo Real:** Envio e recebimento instantâneo de mensagens por meio de conexões WebSocket via Socket.io.
- **Histórico de Mensagens:** As mensagens são persistidas no banco de dados MongoDB. Ao se conectar ao chat, o usuário recebe todo o histórico de mensagens anteriores automaticamente.
- **Identificação do Usuário:** Interface interativa para definir o nome de usuário que será exibido no chat.
- **Diferenciação Visual de Mensagens:** Mensagens enviadas pelo próprio usuário aparecem do lado direito (destacadas em verde), enquanto as de outros usuários aparecem do lado esquerdo (em cinza), acompanhadas da inicial do nome do usuário.
- **Marcação Temporal:** Exibição da data e hora exata de envio da mensagem no fuso horário do Brasil (`America/Sao_Paulo`).
- **Interface Moderna:** UI estilizada com cores agradáveis (tons de verde baseados no MongoDB) e responsiva.
- **Inicialização Simplificada:** Execução concomitante do frontend (Next.js) e backend (servidor Socket.io) utilizando um único comando.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:**
  - [Next.js](https://nextjs.org/) (App Router & React 19)
  - [Tailwind CSS v4](https://tailwindcss.com/) (Estilização)
  - [React Icons](https://react-icons.github.io/react-icons/) (Ícones)
  - [Socket.io-client](https://socket.io/docs/v4/client-api/) (Integração WebSocket no cliente)
- **Backend:**
  - [Node.js](https://nodejs.org/) (Servidor HTTP Nativo)
  - [Socket.io](https://socket.io/) (Gerenciamento de conexões WebSockets)
  - [Mongoose / MongoDB Atlas](https://mongoosejs.com/) (Modelagem de dados e banco de dados em nuvem)
- **Utilitários:**
  - [Concurrently](https://www.npmjs.com/package/concurrently) (Para rodar múltiplos servidores com apenas um comando)
  - [Dotenv](https://www.npmjs.com/package/dotenv) (Gerenciamento de variáveis de ambiente)

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (Recomendado v18+)
- Uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (ou uma instância local do MongoDB) para obter a URI de conexão.

---

## ⚙️ Configuração do Ambiente

1. Clone o repositório ou navegue até o diretório do projeto.
2. Na raiz do projeto, crie ou configure o arquivo `.env` para apontar para a sua URI do MongoDB. O arquivo deve ter a seguinte estrutura:

```env
MONGO_URL=sua_uri_de_conexao_do_mongodb_aqui
```

> [!NOTE]
> Uma URI padrão de exemplo do MongoDB Atlas se assemelha a: `mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<nome_do_banco>?retryWrites=true&w=majority`

---

## 🏁 Como Inicializar o Projeto

Siga os passos abaixo para colocar o projeto em funcionamento:

### 1. Instalar as Dependências

Na raiz do projeto, instale os pacotes necessários rodando:

```bash
npm install
```

### 2. Executar o Projeto em Modo de Desenvolvimento

Para iniciar tanto o **servidor frontend (Next.js)** quanto o **servidor backend (Socket.io)** ao mesmo tempo, execute o comando:

```bash
npm run dev
```

Este comando utiliza o pacote `concurrently` por baixo dos panos para rodar:
- O frontend Next.js na porta `http://localhost:3000`
- O servidor Socket.io/Node na porta `http://localhost:3001`

### 3. Acessar o Chat

Após a execução, abra o seu navegador e acesse:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📂 Estrutura de Pastas Principal

```text
├── app/                  # Páginas e roteamento do Next.js (Frontend)
├── components/           # Componentes React reutilizáveis (Message, etc.)
├── server/               # Servidor Node.js com Socket.io e conexão MongoDB (Backend)
├── services/             # Instanciação e exportação do cliente Socket.io
├── types/                # Definições de tipagem TypeScript do projeto
├── .env                  # Variáveis de ambiente (ex: MONGO_URL)
└── package.json          # Gerenciamento de scripts e dependências do projeto
```
