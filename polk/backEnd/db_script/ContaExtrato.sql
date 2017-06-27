DELIMITER $$
create procedure ContaExtrato(IN intCodConta INT(6), IN dtConsulta date)
BEGIN
     DECLARE dtDataAnterior date;
     SELECT  LAST_DAY(DATE_ADD(dtConsulta ,INTERVAL -1 MONTH)) into dtDataAnterior;
     
     SELECT CodContaBaixa,
            CodContaLancamento,
            Desconto,
            DataPagamento,
            Valor,
            Desconto,
            Juros,
            Multa,
            case Lancamento
               when 'D' then (ValorTotal * -1 )
               when 'C' then ValorTotal
            end as ValorTotal,
            Situacao,
            Lancamento
      FROM ContaBaixa  
      WHERE CodConta = intCodConta
       AND DataPagamento >  dtDataAnterior
       AND DataPagamento <= dtConsulta;

END $$
DELIMITER ;

