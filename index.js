const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const host = 'localhost'
const port = 3000

const app = express()

// configurando bodyParser para pegar POSTS
app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json())

// definindo rotas
const router = express.Router()
router.get('/', (req, res) => res.json({ message : 'Funcionando!' }))

app.use('/', router)

app.listen(port)
console.log(`API online em ${host}:${port}`)

// 
function executeSqlQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : '123',
    database : 'nodejs_mysql_db'
  });
 
  connection.query(sqlQry, (error, results, fields) => {
      (error) ? res.json(error) : res.json(results)
      connection.end()
      console.log('executou!')
      console.log(results)
  });
}

router.get('/costumers/:id?', (req, res) => {
    let filter = ''
    if (req.params.id)
        filter = ' WHERE id = '+ parseInt(req.params.id);
    query = 'SELECT * FROM costumer '
    executeSqlQuery(query + filter, res)
})

router.delete('/costumers/:id?', (req, res) => {
    filter = ' WHERE id = ' + parseInt(req.params.id)
    query = 'DELETE FROM costumer '
    executeSqlQuery(query + filter, res)
})

router.post('/costumers', (req, res) => {
    const name = req.body.name.substring(0, 150);
    const cpf =  req.body.cpf.substring(0, 14);
    query = `INSERT INTO costumer (name, cpf) VALUES ('${name}', '${cpf}')`
    executeSqlQuery(query, res)
})

router.patch('/costumers/:id?', (req, res) => {
    const id = parseInt(req.params.id)
    const name = req.body.name.substring(0, 150)
    const cpf = req.body.cpf.substring(0, 14)
    query = `UPDATE costumer SET name = '${name}', cpf = '${cpf}' WHERE id = '${id}';`
    executeSqlQuery(query, res)
})