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

CREATE TABLE modulo (
    id INT(3) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(250),
    descripcion VARCHAR(400),
    curso INT(2),
    CONSTRAINT fk_curso_modulo FOREIGN KEY(curso) REFERENCES curso(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE test (
    id INT(3) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(250),
    tipo INT(1),
    modulo INT(3),
    CONSTRAINT fk_modulo_test FOREIGN KEY(modulo) REFERENCES modulo(id) ON DELETE CASCADE ON UPDATE CASCADE
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

CREATE TABLE intento (
    id INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    puntaje INT(3),
    usuario INT(5),
    test INT(3),
    CONSTRAINT fk_usuario_intento FOREIGN KEY(usuario) REFERENCES usuario(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_test_intento FOREIGN KEY(test) REFERENCES test(id) ON DELETE CASCADE ON UPDATE CASCADE
);

