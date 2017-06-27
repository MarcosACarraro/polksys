var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require("fs");

var connection = require('./BackEnd/service/connection');
var cidadeService = require('./BackEnd/service/cidadeService');
var clienteService = require('./BackEnd/service/clienteService');
var profissaoService = require('./BackEnd/service/profissaoService');
var bairroService = require('./BackEnd/service/bairroService');
var profissionalService = require('./BackEnd/service/profissionalService');
var grupoAcessoService = require('./BackEnd/service/grupoAcessoService');
var menuService = require('./BackEnd/service/menuService');
var direitoAcessoService = require('./BackEnd/service/direitoAcessoService');
var contaLancamentoService = require('./BackEnd/service/contaLancamentoService');
var contaBaixaService = require('./BackEnd/service/contaBaixaService');
var contaExtratoService = require('./BackEnd/service/contaExtratoService');
var contaService = require('./BackEnd/service/contaService');

//var morgan = require("morgan");
var jwt = require("jsonwebtoken");
var upload = multer({ dest: 'uploads/' });
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


app.post('/login', function (req, res) {
    var usuario = req.body;

    var token = jwt.sign(usuario, 'polk', { expiresIn: '2h' });
    console.log(usuario);
    res.end('{"success" : "success", "status" : 200}');
});

app.get('/login', function (req, res) {
    var usuario = {
        usuario:req.query.usuario,
        senha: req.query.senha,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }; 

    var token = jwt.sign(usuario, 'polk');
    res.write(token);
    res.end();
});

function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}


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

app.get('/grupoacessos', function (req, res) {
    if (req.query["cmd"] != null) {
        if (req.query.cmd === "Select") {
            grupoAcessoService.select(db, req.query, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
        if (req.query.cmd === "Count") {
            grupoAcessoService.select(db, req.query, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
        if (req.query.cmd === "Delete") {
            grupoAcessoService.exclude(db, req.query, function (err) {
                if (err) {
                    res.end('{"error" : "error", "status" : 500}');
                };
                res.end('{"success" : "success", "status" : 200}');
            });
        }
    }
});


app.post('/grupoacesso', function (req, res) {
    var grupoacesso = req.body;
    grupoAcessoService.save(db, grupoacesso, function (result) {
        res.end('{"success" : "success", "status" : 200}');
    });
});


app.get('/bairros', function (req, res) {
    if (req.query["cmd"] != null) {
        if (req.query.cmd === "Select") {
            bairroService.select(db, req.query, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
        if (req.query.cmd === "Delete") {
            bairroService.exclude(db, req.query, function (err) {
                if (err) {
                    res.end('{"error" : "error", "status" : 500}');
                };
                res.end('{"success" : "success", "status" : 200}');
            });
        }
    }
});

app.post('/bairro', function (req, res) {
    var bairro = req.body;
    bairroService.save(db, bairro, function (result) {
        res.end('{"success" : "success", "status" : 200}');
    });
});


process.on('uncaughtException', function (err) {
    console.log(err);
});


app.get('/profissionais', function (req, res) {
    if (req.query["cmd"] != null) {
        if (req.query.cmd === "Select") {
            profissionalService.select(db, req.query, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
        if (req.query.cmd === "Count") {
            profissionalService.select(db, req.query, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
        if (req.query.cmd === "Delete") {
            profissionalService.exclude(db, req.query, function (err) {
                if (err) {
                    res.end('{"error" : "error", "status" : 500}');
                };
                res.end('{"success" : "success", "status" : 200}');
            });
        }
        if (req.query.cmd === "Logar") {
            profissionalService.logar(db, req.query, function (rows) {
                if (rows.length > 0) {
                    var usuario = {
                         CodProfissional: rows[0].CodProfissional,
                         Nome:  rows[0].Nome,
                         CodGrupoAcesso:rows[0].CodGrupoAcesso,
                         exp: Math.floor(Date.now() / 1000) + (60 * 60)
                    };
                    var token = jwt.sign(usuario, 'polk');
                    res.write(token);
                    res.end();
                } else {
                    res.write("error");
                    res.end();
                }
                res.end();
            });
        }
    }
});

app.post('/profissional', function (req, res) {
    var profissional = req.body;
    profissionalService.save(db, profissional, function (result) {
        res.end('{"success" : "success", "status" : 200}');
    });
});


app.get('/loginVerify', function (req, res) {
    var token = req.query.token;

    jwt.verify(token, 'polk', function (err, decoded) {
        if (err) {
            res.end('{"login" : "error", "status" : 500}');
        } else {
            var _login = {
                login: "success",
                CodProfissional: decoded.CodProfissional,
                Nome: decoded.Nome,
                CodGrupoAcesso: decoded.CodGrupoAcesso,
                status: 200
            }
            res.write(JSON.stringify(_login));
            res.end();
        }
    });
});


app.get('/menus', function (req, res) {
    if (req.query["cmd"] != null) {
        if (req.query.cmd === "Select") {
            menuService.select(db, req.query, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
    }
});

app.get('/direitosAcesso', function (req, res) {
    if (req.query["cmd"] != null) {
        if (req.query.cmd === "Select") {
            direitoAcessoService.select(db, req.query, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
        if (req.query.cmd === "Delete") {
            direitoAcessoService.exclude(db, req.query, function (err) {
                if (err) {
                    res.end('{"error" : "error", "status" : 500}');
                };
                res.end('{"success" : "success", "status" : 200}');
            });
        }
    }
});

app.get('/contasLancamentos', function (req, res) {
    if (req.query["cmd"] != null) {
        if (req.query.cmd === "Select") {
            contaLancamentoService.select(db, req.query, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
        if (req.query.cmd === "Count") {
            contaLancamentoService.select(db, req.query, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
        if (req.query.cmd === "Delete") {
            contaLancamentoService.exclude(db, req.query, function (err) {
                if (err) {
                    res.end('{"error" : "error", "status" : 500}');
                };
                res.end('{"success" : "success", "status" : 200}');
            });
        }
    }
});


app.post('/contaLancamento', function (req, res) {
    var contaLancamento = req.body;
    contaLancamentoService.save(db, contaLancamento, function (result) {
        res.end('{"success" : "success", "status" : 200}');
    });
});

app.get('/contasBaixas', function (req, res) {
    if (req.query["cmd"] != null) {
        if (req.query.cmd === "Select") {
            contaBaixaService.select(db, req.query, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
        if (req.query.cmd === "Count") {
            contaBaixaService.select(db, req.query, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
        if (req.query.cmd === "Delete") {
            contaBaixaService.exclude(db, req.query, function (err) {
                if (err) {
                    res.end('{"error" : "error", "status" : 500}');
                };
                res.end('{"success" : "success", "status" : 200}');
            });
        }
    }
});


app.post('/contaBaixa', function (req, res) {
    var contaBaixa = req.body;
    contaBaixaService.save(db, contaBaixa, function (result) {
        res.end('{"success" : "success", "status" : 200}');
    });
});

app.get('/contaExtrato', function (req, res) {
    if (req.query["cmd"] != null) {
        if (req.query.cmd === "Select") {
            contaExtratoService.extrato(db, req.query, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
    }
});

app.get('/contaSaldos', function (req, res) {
    if (req.query["cmd"] != null) {
        if (req.query.cmd === "Select") {
            contaExtratoService.saldos(db, req.query, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
    }
});


app.get('/periodos', function (req, res) {
    if (req.query["cmd"] != null) {
        if (req.query.cmd === "Select") {
            contaExtratoService.periodos(db, req.query, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
    }
});


app.get('/contas', function (req, res) {
    if (req.query["cmd"] != null) {
        if (req.query.cmd === "Select") {
            contaService.select(db, req.query, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
        if (req.query.cmd === "Count") {
            contaService.select(db, req.query, function (rows) {
                res.write(JSON.stringify(rows));
                res.end();
            });
        }
        if (req.query.cmd === "Delete") {
            contaService.exclude(db, req.query, function (err) {
                if (err) {
                    res.end('{"error" : "error", "status" : 500}');
                };
                res.end('{"success" : "success", "status" : 200}');
            });
        }
    }
});


app.post('/conta', function (req, res) {
    var conta = req.body;
    contaService.save(db, conta, function (result) {
        res.end('{"success" : "success", "status" : 200}');
    });
});

var server = app.listen(port);
console.log('Servidor Express iniciado na porta %s', server.address().port);