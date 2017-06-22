DELIMITER $$
create procedure ContaExtratoCompleto(IN dtConsulta date)
BEGIN
     DECLARE dtDataAnterior date;
     SELECT  LAST_DAY(DATE_ADD(dtConsulta ,INTERVAL -1 MONTH)) into dtDataAnterior;
     
     SELECT  * 
     FROM ContaBaixa 
     WHERE DataPagamento >  dtDataAnterior
       and DataPagamento <= dtConsulta;
     
   
END $$
DELIMITER ;

