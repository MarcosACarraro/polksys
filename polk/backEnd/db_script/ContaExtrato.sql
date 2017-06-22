DELIMITER $$
create procedure ContaExtrato(IN dtConsulta date)
BEGIN
 
     DECLARE dtDataAnterior date;
     DECLARE CreditoAnterior  decimal(13,2);
     DECLARE CreditoAtual  decimal(13,2);
     
     DECLARE DebitoAnterior  decimal(13,2);
     DECLARE DebitoAtual  decimal(13,2);
     
     select  LAST_DAY(DATE_ADD(dtConsulta ,INTERVAL -1 MONTH)) into dtDataAnterior;
     
     SELECT SUM(ValorTotal) into CreditoAnterior 
     FROM ContaBaixa 
     WHERE Lancamento ='C'
     AND DataPagamento <= dtDataAnterior;
     
     SELECT SUM(ValorTotal) into CreditoAtual 
     FROM ContaBaixa 
     WHERE Lancamento ='C'
     AND DataPagamento <= dtConsulta;

     SELECT SUM(ValorTotal) into DebitoAnterior 
     FROM ContaBaixa 
     WHERE Lancamento ='D'
     AND DataPagamento <= dtDataAnterior;
     
     SELECT SUM(ValorTotal) into DebitoAtual 
     FROM ContaBaixa 
     WHERE Lancamento ='D'
     AND DataPagamento <= dtConsulta;

     
     SELECT dtDataAnterior as DataSaldoAnterior,
            COALESCE(DebitoAnterior,0) AS DebitoAnterior,
            COALESCE(CreditoAnterior,0) AS CreditoAnterior,
            COALESCE(CreditoAnterior,0) - COALESCE(DebitoAnterior,0) as SaldoAnterior,
            dtConsulta as DataSaldoConsulta,
            COALESCE(DebitoAtual,0) AS DebitoAtual, 
            COALESCE(CreditoAtual,0) AS CreditoAtual, 
            COALESCE(CreditoAtual,0) - COALESCE(DebitoAtual,0) as SaldoAtual;
   
END $$
DELIMITER ;

