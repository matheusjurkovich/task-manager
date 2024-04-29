# Task Manager

Bem-vindo ao repositório da aplicação Task Manager, uma ferramenta de to-do list desenvolvida para ajudar usuários a organizar suas tarefas de maneira simples e eficaz. Este README fornece todas as informações necessárias para entender melhor o projeto, suas tecnologias e como configurá-lo localmente.

## Tecnologias Utilizadas

### Front-end

- **Next.js**: Um framework React que proporciona funcionalidades como server-side rendering e geração de sites estáticos.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática ao código, melhorando a segurança e desenvolvimento.
- **Tailwind CSS**: Framework CSS que utiliza classes de utilidade para um design rápido e responsivo.
- **ShadCn**: Uma biblioteca de componentes customizados que segue as melhores práticas de design e acessibilidade.
- **Axios**: Cliente HTTP baseado em promessas para fazer requisições.
- **Phosphor Icons**: Uma biblioteca flexível de ícones que facilita a implementação e personalização de ícones no UI.
- **ESLint**: Ferramenta de linting que ajuda a manter o código limpo e consistente.

### Backend

- **Node.js**: Ambiente de execução JavaScript do lado do servidor.
- **TypeScript**: Usado no backend para melhorar a manutenção do código e reduzir erros em tempo de execução.
- **Fastify**: Framework web altamente focado em fornecer o máximo de performance para aplicações HTTP.
- **Prisma ORM**: Ferramenta ORM para Node.js e TypeScript, que facilita o trabalho com banco de dados através de um modelo de acesso a dados seguro e escalável.

## Funcionalidades

- **Criação de tarefas**: Os usuários podem adicionar novas tarefas à sua lista.
- **Edição de tarefas**: Modificar detalhes de tarefas já existentes.
- **Exclusão de tarefas**: Remover tarefas que não são mais necessárias.
- **Marcação de tarefas concluídas**: Marcar tarefas como concluídas para melhor rastreamento do progresso.

## Instalação e Configuração

Para rodar o Task Manager localmente, siga os passos abaixo:

### Pré-requisitos

- Node.js
- npm ou yarn

### Passos para Configuração

1. **Clonar o repositório**
   ```bash
   git clone https://github.com/matheusjurkovich/to-do-list.git
   cd task-manager
   ```

2. **Instalar as dependências**
   - Front-end:
     ```bash
     cd frontend
     npm install
     # ou
     yarn install
     ```
   - Backend:
     
    Node Modules
     ```bash
     cd ../backend
     npm install
     # ou
     yarn install
     ```
    Docker
    ```bash
     docker compose up -D
     ```

3. **Configurar as variáveis de ambiente**
   - No diretório do backend, crie um arquivo `.env` seguindo o exemplo em `.env.example`.
     ```bash
     DATABASE_URL="postgresql://docker:docker@localhost:5432/todolist?schema=public"      
     ```

4. **Iniciar o servidor backend**
   ```bash
   npm run start
   # ou
   yarn start
   ```

5. **Iniciar o servidor frontend**
   ```bash
   cd ../web
   npm run dev
   # ou
   yarn dev
   ```

Após esses passos, a aplicação estará rodando localmente e acessível através do navegador.

## Contribuição

Contribuições são sempre bem-vindas! Se você tem alguma sugestão para melhorar o código, adicionar novas funcionalidades ou correções de bugs, por favor, sinta-se à vontade para criar uma pull request.
