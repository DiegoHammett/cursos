CREATE DATABASE cursos;

USE cursos;

CREATE TABLE asignatura (
    id INT(2) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100)
);

CREATE TABLE curso (
    id INT(2) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100),
    descripcion VARCHAR(400),
    asignatura INT(2),
    CONSTRAINT fk_asignatura_curso FOREIGN KEY(asignatura) REFERENCES asignatura(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE clase (
    id INT(3) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(250),
    descripcion VARCHAR(400),
    contenido VARCHAR(600)
);

CREATE TABLE test (
    id INT(3) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(250),
    tipo INT(1),
    aprobacion DECIMAL(3,1)
);

CREATE TABLE modulos (
    id INT(5) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_test INT(3),
    id_clase INT(3),
    tipo INT(1),
    orden INT(3),
    curso INT(2),
    CONSTRAINT fk_modulo_test FOREIGN KEY(id_test) REFERENCES test(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_modulo_clase FOREIGN KEY(id_clase) REFERENCES clase(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_modulo_curso FOREIGN KEY(curso) REFERENCES curso(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE pregunta (
    id INT(5) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    pregunta VARCHAR(1000),
    retro VARCHAR(1000),
    orden INT(3),
    test INT(3),
    CONSTRAINT fk_test_pregunta FOREIGN KEY(test) REFERENCES test(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE respuesta (
    id INT(1) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    respuesta VARCHAR(500),
    tipo INT(1),
    pregunta INT(5),
    CONSTRAINT fk_pregunta_respuesta FOREIGN KEY(pregunta) REFERENCES pregunta(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE usuario (
    id INT(5) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100),
    apellido_p VARCHAR(100),
    apellido_m VARCHAR(100),
    nivel INT(1),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
);

CREATE TABLE modulo_usuario (
    id INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    completado INT(2),
    modulo INT(5),
    usuario INT(5),
    CONSTRAINT fk_mu_usuario FOREIGN KEY(usuario) REFERENCES usuario(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_mu_modulo FOREIGN KEY(modulo) REFERENCES modulos(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE intento (
    id INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    puntaje INT(3),
    usuario INT(5),
    test INT(3),
    CONSTRAINT fk_usuario_intento FOREIGN KEY(usuario) REFERENCES usuario(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_test_intento FOREIGN KEY(test) REFERENCES test(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE VIEW lista_modulos AS
(SELECT modulos.id as modulo, test.id, test.nombre, modulos.tipo, modulos.orden, modulos.curso FROM test, modulos WHERE modulos.id_test = test.id
UNION
SELECT modulos.id as modulo, clase.id, clase.nombre, modulos.tipo, modulos.orden, modulos.curso FROM clase, modulos WHERE modulos.id_clase = clase.id) ORDER BY orden