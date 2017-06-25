DELIMITER $$
create procedure ContaListaPeriodos()
BEGIN
     select  DATE_FORMAT(DataPagamento, '%Y%m') as strData,
             month(DataPagamento) as Mes, 
             year(DataPagamento) as Ano
     from ContaBaixa
     group by DATE_FORMAT(DataPagamento, '%Y%m') 
     order by DATE_FORMAT(DataPagamento, '%Y%m') 
     limit 6;
END $$
DELIMITER 
