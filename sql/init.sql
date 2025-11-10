CREATE TABLE Time (
    id SERIAL CONSTRAINT time_pk PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE Jogador (
    id SERIAL CONSTRAINT jog_pk PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    salario NUMERIC(10,2) CONSTRAINT jog_ck CHECK (salario > 0),
    id_time INTEGER CONSTRAINT jog_time_fk REFERENCES Time(id)
);

CREATE TABLE Campeonato (
    id SERIAL CONSTRAINT camp_pk PRIMARY KEY,
    nome VARCHAR(30) NOT NULL
);

CREATE TABLE Time_Campeonato (
    id_time INTEGER CONSTRAINT time_camp_time_fk REFERENCES Time(id),
    id_campeonato INTEGER CONSTRAINT time_camp_camp_fk REFERENCES Campeonato(id),
    CONSTRAINT time_camp_pk PRIMARY KEY (id_time, id_campeonato)
);

INSERT INTO Time (nome) VALUES ('Corinthians');
INSERT INTO Time (nome) VALUES ('Real Madrid');
INSERT INTO Time (nome) VALUES ('Chelsea');

INSERT INTO Jogador (nome, salario, id_time) VALUES ('Rodrigo Garro', 800000, 1);
INSERT INTO Jogador (nome, salario, id_time) VALUES ('Memphis Depay', 2000000, 1);
INSERT INTO Jogador (nome, salario, id_time) VALUES ('Vinicius Junior', 20000000, 2);
INSERT INTO Jogador (nome, salario, id_time) VALUES ('Cole Palmer', 15000000, 3);

INSERT INTO Campeonato (nome) VALUES ('Mundial de clubes');

INSERT INTO Time_Campeonato VALUES (1,1);
INSERT INTO Time_Campeonato VALUES (2,1);
INSERT INTO Time_Campeonato VALUES (3,1);
