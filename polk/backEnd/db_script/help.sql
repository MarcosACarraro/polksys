use bd_Sistema

select * from Cidade

drop table Profissao;
drop table Cidade;
drop table Cliente;
drop table Bairro;

create database bd_Sistema


drop table Cliente
drop table Cidade

 drop table GrupoAcesso
drop table Usuario
                          -- skip - take
SELECT * FROM Profissao limit 10,5

select * from Cliente

select * from Profissional
select * from GrupoAcesso
select * from DireitoAcesso

 drop table DireitoAcesso
truncate table DireitoAcesso

select * from Profissao

update Cliente set CodProfissao = null where CodCliente = 2

select * from Bairro
select * from Cidade

update Cidade set codCidade = 6 where codCidade=32

delete from Cidade where codCidade =20
insert into Cidade (NomeCidade,Estado)values("São Pedro","SP");
insert into Cidade (CodCidade,NomeCidade,Estado)values("6","São Pedro","SP");

delete from Cidade where codCidade >=20

insert into Cliente (Nome,Endereco,CodCidade,codProfissao,codBairro)values("Marcos","Rua A",7,1,13);


select * from Menu
drop table DireitoAcesso
drop table Menu

insert into Menu(idMenu,Nome) values("101","Cadatro->Usuario")
truncate table Menu

delete from Menu where idMenu ="101"
