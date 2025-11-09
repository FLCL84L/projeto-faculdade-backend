CREATE TABLE Time (
    id SMALLINT SERIAL CONSTRAINT time_pk PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE Jogador (
    id SMALLINT SERIAL CONSTRAINT jog_pk PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    salario NUMERIC(8,2) CONSTRAINT jog_ck CHECK (salario > 0),
    id_time SMALLINT CONSTRAINT jog_time_fk FOREIGN KEY REFERENCES Time(id)
);

CREATE TABLE Campeonato (
    id SMALLINT SERIAL CONSTRAINT camp_pk PRIMARY KEY,
    nome VARCHAR(30) NOT NULL
);

CREATE TABLE Time_Campeonato (
    id_time SMALLINT CONSTRAINT time_camp_time_fk FOREIGN KEY REFERENCES Time(id),
    id_campeonato SMALLINT CONSTRAINT time_camp_camp_fk FOREIGN KEY REFERENCES Campeonato(id),
    CONSTRAINT time_camp_pk PRIMARY KEY (id_time, id_campeonato)
);

INSERT INTO Time (nome) VALUES ('admin123');