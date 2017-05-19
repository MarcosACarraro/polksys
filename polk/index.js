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



app.post('/login', function (req, res) {
    var usuario = req.body;

    var token = jwt.sign(usuario, 'polk', { expiresIn: '2h' });
    console.log(usuario);
    res.end('{"success" : "success", "status" : 200}');
    //var token = jwt.sign({ nome: 'marcos', sobrenome: "carraro" }, 'polk', { expiresIn: '2h' });
});

app.get('/login', function (req, res) {
    var usuario = {
        usuario:req.query.usuario,
        senha: req.query.senha,
        //exp: Math.floor(Date.now() / 1000) + (60 * 60)
        exp: 1500
    }; 

    var token = jwt.sign(usuario, 'polk');
    res.write(token);
    res.end();
});


app.get('/loginVerify', function (req, res) {
    var token = req.query.token;

     jwt.verify(token, 'polk', function (err, decoded) {
         if (err) {
             //err = {
             //    name: 'TokenExpiredError',
             //    message: 'jwt expired',
             //    expiredAt: 1408621000
             //}
             res.end('{"error" : "jwt expired", "status" : 500}');
             //res.write(err);
             //res.end();
         }
         res.end('{"success" : "success", "status" : 200}');
     });
});






//app.get('/token', ensureAuthorized, function (req, res) {
app.get('/token', function (req, res) {
    //var token = jwt.sign({ nome: 'marcos', sobrenome: "carraro" }, 'polk', { expiresIn: '2h' });
    //res.write(token);
    //res.end();


    //var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwb2xrIiwiaWF0IjoxNDYzNjg0NzUzLCJleHAiOjE0NjM2ODQ3NjksImF1ZCI6Ind3dy5wb2xrc3lzdGVtLmNvbSIsInN1YiI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJHaXZlbk5hbWUiOiJtYXJjb3MifQ.ktjJ2xtHtrqe7ITl5fr1qhFfdBu6o0oIf1iFMENF3xg";
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJub21lIjoibWFyY29zIiwic29icmVub21lIjoiY2FycmFybyIsImlhdCI6MTQ5NTIxOTQyOX0.NMiY5QjFTmtoybRBvKpuNquelrBNmpbHJ-fTY1s2LK4";

    jwt.verify(token, 'polk', function (err, decoded) {
        console.log(decoded) // bar
        if (err) {
              err = {
                name: 'TokenExpiredError',
                message: 'jwt expired',
                expiredAt: 1408621000
              }
              console.log(err);
        }
    });

    
    res.write("ok");
    res.end();
    
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