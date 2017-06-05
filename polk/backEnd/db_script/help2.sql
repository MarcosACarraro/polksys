use bd_sistema



SELECT COUNT(*) AS Total FROM ContaLancamento WHERE Descricao like '%%'

SELECT COUNT(*) AS Total FROM Cliente WHERE Nome

SELECT *  FROM Cliente WHERE Nome like '%Marcos%'



/*drop table ContaLancamento*/
/*drop table ContaBaixa*/

select * from ContaLancamento
select * from ContaBaixa

SELECT ContaLancamento.CodContaLancamento,
       ContaLancamento.Descricao,  
       ContaLancamento.DataEmissao,  
       ContaLancamento.DataVencimento, 
       ContaLancamento.Valor 
FROM ContaLancamento 
LEFT JOIN ContaBaixa ON ContaLancamento.CodContaLancamento = ContaBaixa.CodContaLancamento
WHERE ContaBaixa.Situacao is NULL
