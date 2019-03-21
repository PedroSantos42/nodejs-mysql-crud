const mysql = require('mysql')
const connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : '123',
    database : 'nodejs_mysql_db'
});

connection.connect(err => {
    (err) ? console.log(err.sqlMessage) : console.log('conectou!');
    createTable(connection);
    addRows(connection);
});

function createTable(conn) {
    const sql = "CREATE TABLE IF NOT EXISTS `costumer` (\n"+
                  " id INT PRIMARY KEY AUTO_INCREMENT, \n"+
                  " `name` VARCHAR(150) NOT NULL, \n"+
                  " cpf VARCHAR(14) NOT NULL \n"+
                  ");";

    conn.query(sql, (error, results, fields) => (error) ? console.log(error) : console.log('criou tabela!'));
};

function addRows(conn) {
    const sql = 'INSERT INTO costumer (name, cpf) VALUES ?'
    const values = [
        ['Alberto', '111.111.111-11'],
        ['Bruna', '222.222.222-22'],
        ['Carlos', '333.333.333-33']
    ]

    conn.query(sql, [values], (error, results, fields) => {
        (error) ? console.log(error.sqlMessage) : console.log('inseriu registros!');
        conn.end();
    });
}