# Gaio
## Um bot para ler comentários utilizando o IBM Watson Text to Speech.

#### View para layouts grandes
![Web](https://i.imgur.com/OOJdxelh.png)

#### View para layouts pequenos (mobile)
![Mobile](https://i.imgur.com/CSDF683l.png)

#### 1 - Como rodar
1.1 - Na pasta backend:
npm install para instalar as dependências e npm start para inicializar o servidor.

1.2 - Na pasta frontend:
npm install para instalar as dependências e npm start para inicializar a aplicação React.

#### 2 - Descrição e tecnologias utilizadas

##### 2.1 - Banco de dados:
Foi utilizado um cluster do [Scalegrid](https://scalegrid.io/mysql.html), com um banco mySQL como um SQL as a service e o [Sequelize ORM](https://sequelize.org/).

No banco constam duas tabelas, users e comments:

A tabela users contém 3 colunas: id, created_at e updated_at. A tabela user funciona mais como um "controle de sessão", onde cada user_id contém seus próprios comentários.

Já a tabela comments, contém 5 colunas: id, user_id, como chave estrangeira, text, que é o texto do comentário em si, created_at e updated_at.

A tabela user possui um relacionamento 1-N com a tabela comments.

Ambas as tabelas possuem um model e uma migration para criação-exclusão de suas respectivas tabelas, ambos desenvolvidos com o Sequelize.

##### 2.2 - Backend:

Foi utilizado o framework [Express](https://expressjs.com/pt-br/) para a construção de uma API Rest. A API conta com as seguintes rotas:

Users:
- '/users/' - GET - index - Consulta o banco retornando todos os usuários cadastrados.
- '/users/' - POST - store - Cria um novo usuário no banco, retorna o usuário criado.

Comments:
- '/users/:user_id/comments' - GET - index - Consulta o banco e retorna todos os comentários criados pelo o usuário pertencente ao user_id, passado pelos route params.
- '/users/:user_id/comments' - POST - store - Cria no banco um comentário associado ao user_id, passado pelo route params. O texto do comentário é passado pelo body da requisição.
- '/users/:user_id/comments/:comment_id' - DELETE - destroy - Deleta no banco o comentário associado ao user_id e comment_id, passado pelos route params, retorna a quantidade de itens removidos.

Watson:
- '/synthesize' - POST - store - Utiliza a API do Watson para sintetizar um texto em voz, retorna o arquivo de áudio em formato .wav, através de uma string base64.

Cada conjunto de rota possui seu próprio controller.

O SDK do [IBM Watson Text-to-Speech](https://www.ibm.com/br-pt/cloud/watson-text-to-speech) também foi incluído, para realizar a sintetização de texto para voz.

Além disso, o [Cors](https://www.npmjs.com/package/cors) também foi utilizado. Atualmente o Cors se encontra liberado para todas as origens.

##### 2.3 - Frontend:

Foi utilizado [React](https://pt-br.reactjs.org/) e [Material-UI](https://material-ui.com/) para o desenvolvimento do frontend web, além do [Axios](https://github.com/axios/axios) para fazer as requisições AJAX para a API e o [React Audio Player](https://www.npmjs.com/package/react-audio-player), para criação do player.

#### Funcionalidades

A aplicação conta com:
- Um design responsivo, minimalista e com elementos do Material Desgin, além uma visão pra mobile;
- Persistência da sessão, utilizando o localStorage;
- Um player com opção de play/pause, duração, volume e opção de download do arquivo de áudio;
- Um id de sessão, podendo ser mudado para outras sessões ou solicidada uma sessão nova através de botões;
- Botões para escutar e apagar comentários;
- Todos as strings base64 dos áudios já sintetizados são armazenados no sessionStorage, para que não precise ser feita outra requisição e sintetização ao escutar um áudio já sintetizado, e duram até o navegador ser fechado.



