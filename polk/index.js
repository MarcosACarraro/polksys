var express = require('express');
var bodyParser = require('body-parser');

var connection = require('./BackEnd/connection');
var cidadeService = require('./BackEnd/cidadeService');
var clienteService = require('./BackEnd/clienteService');
var profissaoService = require('./BackEnd/profissaoService');
var bairroService = require('./BackEnd/bairroService');


app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var db = connection.db;
db.connect();

app.use(express.static(__dirname + '/frontEnd'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/frontEnd/Index.html');
});


app.get('/cidades', function (req, res) {
    if (req.query["cmd"] != null) {
        if (req.query.cmd === "Select") {
            cidadeService.select(db, req.query, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
    }
});

app.post('/cidade', function (req, res) {
    var cidade = req.body;

    cidadeService.save(db, cidade, function (result) {
        res.end('{"success" : "success", "status" : 200}');
    });
});

app.get('/cidade/getById/:id', function (req, res) {
    var id = req.params.id;
    cidadeService.getById(db, id, function (rows) {
        res.write(JSON.stringify(rows));
        res.end();
    });
});

app.get('/cidade/exclude/:id', function (req, res) {
    var id = req.params.id;
    cidadeService.exclude(db, id, function (err, result) {
        if (err) {
            res.end('{"error" : "error", "status" : 500}');
        };
            res.end('{"success" : "success", "status" : 200}');
    });
});


app.get('/clientes', function (req, res) {
    if (req.query["cmd"] != null) {
        if (req.query.cmd === "Select") {
            clienteService.select(db, req.query, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
        if (req.query.cmd === "Count") {
            clienteService.select(db, req.query, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
        if (req.query.cmd === "Delete") {
            clienteService.exclude(db, req.query, function (err) {
                if (err) {
                    res.end('{"error" : "error", "status" : 500}');
                };
                res.end('{"success" : "success", "status" : 200}');
            });

        }
    }
});

app.post('/cliente', function (req, res) {
    var cliente = req.body;
    clienteService.save(db, cliente, function (result) {
        res.end('{"success" : "success", "status" : 200}');
    });
});



app.get('/profissoes', function (req, res) {
    if (req.query["cmd"] != null) {
        profissaoService.select(db, req.query, function (rows) {
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
});

app.get('/bairros', function (req, res) {
    if (req.query["cmd"] != null) {
        bairroService.select(db, req.query, function (rows) {
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
});


var server = app.listen(3000);
console.log('Servidor Express iniciado na porta %s', server.address().port);