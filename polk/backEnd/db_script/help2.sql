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


select * from ContaBaixa
WHERE (DataPagamento BETWEEN '2017-01-01 14:15:55' AND '2017-01-08 10:15:55')

select * from ContaBaixa
WHERE (DataPagamento < '2017-01-01 14:15:55')


select sum(valor) from  ContaBaixa
