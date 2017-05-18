//code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543

var express = require('express');
var bodyParser = require('body-parser');

var connection = require('./BackEnd/connection');
var cidadeService = require('./BackEnd/cidadeService');
var clienteService = require('./BackEnd/clienteService');
var profissaoService = require('./BackEnd/profissaoService');
var bairroService = require('./BackEnd/bairroService');
//var morgan = require("morgan");
var jwt = require("jsonwebtoken");

var port = process.env.PORT || 3000;


var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


//app.use(morgan("dev"));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

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
        if (req.query.cmd === "Count") {
            cidadeService.select(db, req.query, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
        if (req.query.cmd === "Delete") {
            cidadeService.exclude(db, req.query, function (err) {
                if (err) {
                    res.end('{"error" : "error", "status" : 500}');
                };
                res.end('{"success" : "success", "status" : 200}');
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


//app.get('/clientes', ensureAuthorized, function (req, res) {
     //var jxx = jwt.sign("marcos", "1234");
    //console.log(jxx);
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


function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        //console.log(bearerHeader);
        next();
    } else {
        res.sendStatus(403);
    }
}

app.post('/cliente', function (req, res) {
    var cliente = req.body;
    clienteService.save(db, cliente, function (result) {
        res.end('{"success" : "success", "status" : 200}');
    });
});



app.get('/profissoes', function (req, res) {
    if (req.query["cmd"] != null) {
        if (req.query.cmd === "Select") {
            profissaoService.select(db, req.query, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
        if (req.query.cmd === "Count") {
            profissaoService.select(db, req.query, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
        if (req.query.cmd === "Delete") {
            profissaoService.exclude(db, req.query, function (err) {
                if (err) {
                    res.end('{"error" : "error", "status" : 500}');
                };
                res.end('{"success" : "success", "status" : 200}');
            });

        }
    }
});


app.post('/profissao', function (req, res) {
    var profissao = req.body;
    profissaoService.save(db, profissao, function (result) {
        res.end('{"success" : "success", "status" : 200}');
    });
});


app.get('/bairros', function (req, res) {
    if (req.query["cmd"] != null) {
        bairroService.select(db, req.query, function (rows) {
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
});


process.on('uncaughtException', function (err) {
    console.log(err);
});

var server = app.listen(port);
console.log('Servidor Express iniciado na porta %s', server.address().port);