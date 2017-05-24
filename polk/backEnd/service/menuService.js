var menuService = (function () {
    var _menu = [
        { id: "101", nome: "Cadatro->Usuario" },
        { id: "102", nome: "Cadatro->Grupo Usuario" },
        { id: "103", nome: "Cadatro->Cliente" },
        { id: "104", nome: "Cadatro->Cidade" },
        { id: "105", nome: "Cadatro->Bairro" },
        { id: "106", nome: "Cadatro->Profissao" },
        { id: "107", nome: "Cadatro->Fornecedor" },
        { id: "108", nome: "Cadatro->Profissional" },
        { id: "109", nome: "Cadatro->Grupo Profissional" },
        { id: "110", nome: "Cadatro->Produto" },
        { id: "111", nome: "Cadatro->Tipo Material" },
        { id: "112", nome: "Cadatro->Unidade" },
        { id: "113", nome: "Cadatro->Servico" },
        { id: "114", nome: "Cadatro->Mao Obra" },
        { id: "115", nome: "Cadatro->Cond. Pagto" },
        { id: "116", nome: "Cadatro->Comanda" },
        { id: "117", nome: "Cadastro->Motivos" },
        { id: "118", nome: "Cadastro->Ramo Produto" },
        { id: "201", nome: "Movimento->Associar Comanda" },
        { id: "202", nome: "Movimento->Ordem Servico" },
        { id: "203", nome: "Movimento->Requisicao" },
        { id: "204", nome: "Movimento->Pedido" },
        { id: "205", nome: "Movimento->Comissao Servicos" },
        { id: "206", nome: "Movimento->Comissao Vendas" },
        { id: "207", nome: "Movimento->Entrada Notas" },
        { id: "208", nome: "Movimento->Fechar Arquivo OS" },
        { id: "209", nome: "Movimento->Fechar Arquivo PED" },
        { id: "210", nome: "Movimento->Reabrir OS" },
        { id: "211", nome: "Movimento->Reabrir PED" },
        { id: "212", nome: "Movimento->Inventario Estoque" },
        { id: "213", nome: "Movimento->Baixa Boleto OS" },
        { id: "214", nome: "Movimento->Baixa Boleto PED" },
        { id: "215", nome: "Movimento->Fechamento Mensal" },
        { id: "216", nome: "Movimento->Agenda" },
        { id: "217", nome: "Movimento->Fechar Caixa" },
        { id: "301", nome: "Consulta->Situacao OS" },
        { id: "302", nome: "Consulta->Localizar OS" },
        { id: "303", nome: "Consulta->Localizar Pedido" },
        { id: "304", nome: "Consulta->Localizar Req" },
        { id: "305", nome: "Consulta->Comandas Abertas" },
        { id: "306", nome: "Consulta->Faturamento Servicos" },
        { id: "307", nome: "Consulta->Faturamento Vendas" },
        { id: "308", nome: "Consulta->Faturamento Geral" },
        { id: "309", nome: "Consulta->Fatura Comissao" },
        { id: "310", nome: "Consulta->Fatura Vendas" },
        { id: "311", nome: "Consulta->Resumo Movimento" },
        { id: "312", nome: "Consulta->Produto Movimento" },
        { id: "313", nome: "Consulta->Fechamento Caixa" },
        { id: "314", nome: "Consulta->Comandas Movimento" },
        { id: "401", nome: "Relatorio->Clientes" },
        { id: "402", nome: "Relatorio->Estoque Produtos" },
        { id: "403", nome: "Relatorio->Vendas Produtos" },
        { id: "404", nome: "Relatorio->Recurso Produtos" },
        { id: "405", nome: "Relatorio->Requis. Produtos" },
        { id: "406", nome: "Relatorio->Entrada Produtos" },
        { id: "407", nome: "Relatorio->Servicos" },
        { id: "408", nome: "Relatorio->Tributos" },
        { id: "409", nome: "Relatorio->Arquivos" },
        { id: "410", nome: "Relatorio->Boletos" },
        { id: "411", nome: "Relatorio->Mala Direta" },
        { id: "501", nome: "Financeiro" }
    ];

    var _select = function (db, filtro, callback) {
        var queryString = 'SELECT * FROM Menu WHERE idMenu not in(select idMenu from DireitoAcesso where CodGrupoAcesso = ?)';
        var list = db.query(queryString, [filtro.CodGrupoAcesso], function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }

    //_select = function () {
    //    return _menu;
    //}

    return {
        select: _select,
    }
})();

module.exports = menuService;
