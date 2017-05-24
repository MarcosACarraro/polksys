//code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543
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
            //console.log(req.query);
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




app.get('/loginVerify', function (req, res) {
    var token = req.query.token;

    jwt.verify(token, 'polk', function (err, decoded) {
        if (err) {
            res.end('{"login" : "error", "status" : 500}');
        }
       
        var _login = {
            login: "success",
            CodProfissional:decoded.CodProfissional,
            Nome: decoded.Nome,
            CodGrupoAcesso: decoded.CodGrupoAcesso,
            status: 200
        };
        //console.log(_login);
        res.write(JSON.stringify(_login));
        //res.write(_login);
        res.end();
        //res.end('{"login" : "success", "status" : 200}');
    });
});


app.post('/profissional', function (req, res) {
    var profissional = req.body;
    profissionalService.save(db, profissional, function (result) {
        res.end('{"success" : "success", "status" : 200}');
    });
});

app.post("/upload/:id",upload.single('file'),function (req, res) {

    //http://stackoverflow.com/questions/36477145/how-to-upload-image-file-and-display-using-express-nodejs

    var id = req.params.id;
    //console.log(req.file);
    //var file = __dirname + '/uploads/' + req.file.filename +".jpg";
    var file = __dirname + '/uploads/' + id + req.file.originalname;
    fs.rename(req.file.path, file, function (err) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.json({
                message: 'File uploaded successfully',
                filename: req.file.filename
            });
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

//app.get('/menus', function (req, res) {
//    if (req.query["cmd"] != null) {
//        if (req.query.cmd === "Select") {
//            var rows = menuService.select();
//            res.write(JSON.stringify(rows));
//            res.end();
//        }
//    }
//});

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


app.post('/direitoAcesso', function (req, res) {
    var direitoAcesso = req.body;
    direitoAcessoService.save(db, direitoAcesso, function (result) {
        res.end('{"success" : "success", "status" : 200}');
    });
});


//app.post("/upload"), function (req, res) { 
//});

    //req.form.complete(function(err,fields,files){
    //    async.series([
    //       function(cb){
    //           fs.rename(files.image.path+files.image.name,'./public/image/'+files.image.name,function(err){

    //               connection.query('INSERT INTO RestaurantGalleryImages (Images,RestName) VALUES (?,?)', [fields.name,files.image.path+'/'+files.filename],
    //                  function(err){
    //                      cb();
    //                  });
    //           });
    //    );
    //       });
    //});


var server = app.listen(port);
console.log('Servidor Express iniciado na porta %s', server.address().port);