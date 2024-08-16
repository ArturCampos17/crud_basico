const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const db = require('./db/connection');
const clientesRoutes = require('./src/cliente');

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`O Express está rodando na porta ${PORT}`);
});
  
// Sincroniza os modelos com o banco de dados
// sync cria as tabelas no banco de dados de acordo com os modelos definidos na aplicação. 
// O parâmetro { force: true } indica que, se as tabelas já existirem, elas serão excluídas e recriadas, o que implica em perda de dados nas tabelas afetadas.
/*
db.sync({ force: true }).then(() => {
  console.log('Database synchronized');
});
*/
db.authenticate()
  .then(() => {
    console.log("Conectou ao banco com sucesso");
  })
  .catch(err => {
    console.log("Ocorreu um erro ao conectar", err);
  });


  app.get('/', (req, res) => {
    res.send("API rodando");
  });

  // Usa as rotas
app.use('/cliente', clientesRoutes);