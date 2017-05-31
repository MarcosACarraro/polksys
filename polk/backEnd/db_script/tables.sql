use bd_Sistema;


CREATE TABLE Profissao(
    CodProfissao INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	DescProfissao varchar(50) NULL
);

CREATE TABLE Cidade(
	CodCidade INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	NomeCidade varchar(50) NULL,
	Estado varchar(2)
);


CREATE TABLE Bairro (
    CodBairro INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    NomeBairro VARCHAR(50) NULL,
    CodCidade INT(6) UNSIGNED NULL,
    FOREIGN KEY (CodCidade) REFERENCES Cidade(CodCidade)
);

CREATE TABLE Cliente (
    CodCliente INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	Nome varchar(80) NULL,
	Endereco varchar(80) NULL,
	CodCidade INT(6) UNSIGNED NULL,
	CodBairro INT(6) UNSIGNED NULL,
	CEP varchar(10) NULL,
	DataNasc datetime NULL,
	FoneCom VARCHAR(20) NULL,
	FoneRes VARCHAR(20) NULL,
	Celular VARCHAR(20) NULL,
	Email VARCHAR(50) NULL,
	RG VARCHAR(20) NULL,
	CPF VARCHAR(20) NULL,
	Sexo VARCHAR(1) NULL,
	EstadoCivil VARCHAR(10) NULL,
	DataCadastro TIMESTAMP,
	CodProfissao INT(6) UNSIGNED NULL,
	Situacao VARCHAR(10) NULL,
	Obs varchar(250) NULL,
    FOREIGN KEY (CodCidade) REFERENCES Cidade(CodCidade),
    FOREIGN KEY (CodBairro) REFERENCES Bairro(CodBairro),
    FOREIGN KEY (CodProfissao) REFERENCES Profissao(CodProfissao)
 );
 
 CREATE TABLE GrupoAcesso (
  CodGrupoAcesso int(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  Descricao varchar(20) DEFAULT NULL
); 

 CREATE TABLE Menu (
  idMenu varchar(3)  PRIMARY KEY,
  Nome varchar(80) DEFAULT NULL
); 


 CREATE TABLE DireitoAcesso (
  CodGrupoAcesso int(6) UNSIGNED NULL,
  idMenu varchar(3) DEFAULT NULL,
  FOREIGN KEY (idMenu) REFERENCES Menu(idMenu),
  FOREIGN KEY (CodGrupoAcesso) REFERENCES GrupoAcesso(CodGrupoAcesso)
); 

 
CREATE TABLE Usuario(
    CodUsuario  int(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	Login varchar(20) NOT NULL,
	Nome varchar(40) NULL,
	Senha varchar(15) NULL,
	Situacao varchar(1) NULL,
	CodGrupoAcesso INT(6) UNSIGNED NULL,
    FOREIGN KEY (CodGrupoAcesso) REFERENCES GrupoAcesso(CodGrupoAcesso)
);


CREATE TABLE Profissional (
    CodProfissional INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Login varchar(20) NOT NULL,
	Nome varchar(80) NULL,
    Senha varchar(15) NULL,
	CodGrupoAcesso INT(6) UNSIGNED NULL,
	Endereco varchar(80) NULL,
	CodCidade INT(6) UNSIGNED NULL,
	CodBairro INT(6) UNSIGNED NULL,
	CEP varchar(10) NULL,
	DataNasc datetime NULL,
	FoneCom VARCHAR(20) NULL,
	FoneRes VARCHAR(20) NULL,
	Celular VARCHAR(20) NULL,
	Email VARCHAR(50) NULL,
	RG VARCHAR(20) NULL,
	CPF VARCHAR(20) NULL,
	Sexo VARCHAR(1) NULL,
	EstadoCivil VARCHAR(10) NULL,
	DataCadastro TIMESTAMP,
	Situacao varchar(1) NULL,
	Obs varchar(250) NULL,
    FOREIGN KEY (CodCidade) REFERENCES Cidade(CodCidade),
    FOREIGN KEY (CodBairro) REFERENCES Bairro(CodBairro),
    FOREIGN KEY (CodGrupoAcesso) REFERENCES GrupoAcesso(CodGrupoAcesso)
 );



 CREATE TABLE ContaLancamento (
  CodContaLancamento INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  Descricao varchar(20) NULL,
  DataEmissao datetime NULL,
  DataVencimento datetime NULL,
  Valor decimal(13,2) NULL,
  ValorTotal decimal(13,2) NULL
); 


 CREATE TABLE ContaBaixa (
  CodContaBaixa INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  Descricao varchar(20) NULL,
  Valor decimal(13,2) NULL,
  ValorTotal decimal(13,2) NULL
); 


