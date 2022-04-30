const express = require('express')

const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sqlCreate = `CREATE TABLE IF NOT EXISTS people (id int not null auto_increment, name varchar(255) not null, primary key(id));`
connection.query(sqlCreate)

const sqlInsert = `INSERT INTO people(name) VALUES ('Osdeni')`
connection.query(sqlInsert)

connection.end()

app.get('/', async (req, res) => {
    const connection = mysql.createConnection(config)

    let msg = `<h1>Full Cycle Rocks!</h1>`

    connection.query('SELECT * FROM people;', function (err, result) {
        if (err) {
            msg += 'Nenhum nome não encontrado'
            res.send(msg)
            return
        }

        msg += '<h3>Nomes cadastrados:</h3>'
        result.forEach(row => {
            msg += `<p>* ${row.id} - ${row.name}</p>`
        });

        res.send(msg)

    }).on('error', function (err) {
        console.log("[mysql error]", err);
        msg += 'Erro ao buscar nomes'
        res.send(msg)
    });
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})