var express = require('express');
var bodyParser = require('body-parser');

var connection = require('./BackEnd/connection');
var cidadeService = require('./BackEnd/cidadeService');

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
            var filtro = {
                cmd:req.query.cmd,
                descCidade: req.query.descCidade,
                skip: req.query.skip,
                take: req.query.take
            };

            cidadeService.select(db, filtro, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
        if (req.query.cmd === "Count") {
            var filtro = {
                cmd: req.query.cmd,
                descCidade: req.query.descCidade
            };

            cidadeService.select(db, filtro, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
    }
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

app.post('/cidades', function (req, res) {
    var cidade = req.body;

    cidadeService.save(db, cidade, function (result) {
        res.end('{"success" : "success", "status" : 200}');
    });
});

var server = app.listen(3000);
console.log('Servidor Express iniciado na porta %s', server.address().port);