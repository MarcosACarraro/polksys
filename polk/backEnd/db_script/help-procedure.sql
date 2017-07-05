CREATE TEMPORARY TABLE IF NOT EXISTS TContaBaixa AS (SELECT * FROM ContaBaixa)
 CREATE TEMPORARY TABLE IF NOT EXISTS ValorTotal AS (SELECT sum(ValorTotal) as ValorTotal FROM ContaBaixa);
 CREATE TEMPORARY TABLE IF NOT EXISTS Valor AS (SELECT sum(Valor) as Valor FROM ContaBaixa);

 SET @ValorTotal = 0;
    SELECT sum(ValorTotal)  FROM ContaBaixa;

use bd_Sistema;


call ContaListaPeriodos();

call ContaSaldos(1,'2017-06-26');
call ContaExtrato(1,'2017-06-26');
call ContaExtrato(1,'2017-01-08');

drop procedure ContaExtrato
drop procedure ContaSaldos
drop procedure ContaListaPeriodos
select * from ContaBaixa;

DELIMITER $$

CREATE PROCEDURE ContaExtrato(INOUT numero INT)
BEGIN
	SET numero = numero * numero;
END $$
DELIMITER ;

SET @valor = 5;
CALL Elevar_Ao_Quadrado(@valor);
SELECT @valor;


drop PROCEDURE lista

select * from Profissional

DELIMITER $$
create procedure lista()
BEGIN

  DECLARE mValorTotal  decimal(13,2);s
  DECLARE mValor  decimal(13,2);
  
  SELECT sum(ValorTotal) into mValorTotal FROM ContaBaixa;
  SELECT sum(Valor) into mValor FROM ContaBaixa;
  SELECT mValor,mValorTotal;
   
END $$
DELIMITER ;


call lista()

select * from ContaBaixa;
select * from contalancamento;

drop table  ContaLancamento
drop table ContaBaixa