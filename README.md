<h1 align="center">
  <img alt="Logo" title="Logo Gympoint" src="https://github.com/denisonfer/gympoint/blob/master/.github/logo_gympoint.png" width="250px"
</h1>


# 📝 Sobre  
**O Gympoint** está sendo desenvolvido conforme o andamento do <a href="https://rocketseat.com.br/bootcamp" target="_blank">GoStack Bootcamp da Rocketseat</a>, a imersão tem um período de 6 semanas.
Neste projeto desenvolvo do **ZERO** uma aplicação para o gerenciamento de uma acadêmia, ultilizando as seguintes tecnologias:  
- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org)
- [React Native](https://facebook.github.io/react-native/)

## 🎛️ Backend com Node.JS
No backend é ultilizado o <a href="https://expressjs.com/" target="_blank">Express</a>. Para criar a estrutura do app ultilizei as seguintes ferramentas:
- **Sucrase + Nodemon**: _Uso da nova sintaxe do ECMAScript(ES6) com sucrase e o Nodemon ajuda a monitorar o código e reiniciar o servidor_;
- **ESLint + Prettier + EditorConfig**: _Esses plugins ajudam na padronização do código_;
- **Sequelize (Utilizei o PostgreSQL)**: _Ultilizo o Sequelize para o mapeamento de dados relacionais e uso o PostgresSQL como banco de dados_;

### Funcionalidades
**1. Autenticação**  
_Permita que um usuário se autentique em sua aplicação utilizando e-mail e uma senha. Usa-se o **JWT.**_  
**2. Cadastro de alunos**  
_Permita que alunos sejam mantidos (cadastrados/atualizados) na aplicação utilizando nome, email, idade, peso e altura._  
**3. Gestão de planos e matrículas(Usuário)**  
_Permita que o usuário possa cadastrar planos para matrícula de alunos. Criação de matrícula referenciando o plano e o aluno._  
_Envio de email para o aluno quando a matrícula for realizada. Usa-se o **Nodemailer com templates engine.**_  
**4. Chekins e pedidos de auxílio(Alunos)**  
_Quando o aluno chega na academia o mesmo realiza um check-in apenas informando seu ID de cadastro. Esse check-in serve para monitorar quantas vezes o usuário frequentou a academia na semana._    
_O aluno pode criar pedidos de auxílio para a academia em relação a algum exercício, alimentação ou instrução qualquer._

### Estrutura
Todo arquivo de código eu gosto de botar dentro de um pasta **src**, estruturando meu projeto da seguinte forma:  
<h1>
  <img alt="Logo" title="Logo Gympoint" src="https://github.com/denisonfer/gympoint/blob/master/.github/estrutura.png" width="450px"
</h1>

#### Descrição
- **app:** arquivos de código do servidor em si.
- **app/controllers:** controladores das rotas.
- **app/middlewares:** arquivos intermediadores de rotas.
- **app/models:** modelos representando as tabelas do banco de dados relacional.
- **app/schemas:** schamas do mongoDB.
- **config:** arquivos de configurações em geral, banco de dados, autorização, email, etc.
- **database:** migrations do banco de dados relacional.
- **lib:** utilitarios, pode se chamado de util se preferir.
- **app.js:** Main da aplicação.
- **routes.js:** Rotas do servidor.
- **server.js:** inicializar o servidor, usando o arquivo app.js. Pode ser chamado de index.js se preferir.
  
## 🖥️📱 Front-end com React.Js & React Native 
> Em desenvolvimento...
<h1 align="center">
  <img alt="gif desenvolvimento" title="Em desenvolvimento" src="https://media.giphy.com/media/iIqmM5tTjmpOB9mpbn/giphy.gif" width="250px"
</h1>  
