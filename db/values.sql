INSERT INTO plan VALUES (0, 'Administrador', 1000.00);
INSERT INTO plan VALUES (1, 'Basico', 99.00);
INSERT INTO plan VALUES (2, 'Estándar', 249.00);
INSERT INTO plan VALUES (3, 'Premium', 499.00);
INSERT INTO usuario VALUES (null, "Diego", "Hernandez","Rueda", 0, "admin@gmail.com", MD5("pass"));
INSERT INTO asignatura VALUES (1,'Matemáticas');
INSERT INTO asignatura VALUES (2,'Comunicación');
INSERT INTO asignatura VALUES (3,'Inglés');
INSERT INTO asignatura VALUES (4,'Historia');
INSERT INTO asignatura VALUES (5,'Ciencias');
INSERT INTO curso VALUES (1,'Curso 1','Descripción del curso 1',1);
INSERT INTO test VALUES (1, 'Test 1',1,null,8);
INSERT INTO test VALUES (2, 'Test 2',1,null,7);
INSERT INTO test VALUES (3, 'Test 3',1,null,8);
INSERT INTO test VALUES (4, 'Test 4',2,'00:00:20',9);
INSERT INTO test VALUES (5, 'Test 5',1,null,10);
INSERT INTO test VALUES (6, 'Test 6',1,null,6);
INSERT INTO clase VALUES (1, 'Clase 1',"Aquí encontrarás más información al respecto de la clase","CONTENIDO");
INSERT INTO clase VALUES (2, 'Clase 2',"Aquí encontrarás más información al respecto de la clase","CONTENIDO");
INSERT INTO clase VALUES (3, 'Clase 3',"Aquí encontrarás más información al respecto de la clase","CONTENIDO");
INSERT INTO modulos VALUES (1, null, 1, 1, 1,1);
INSERT INTO modulos VALUES (2, null, 2, 1, 2,1);
INSERT INTO modulos VALUES (3, 1, null, 2, 3,1);
INSERT INTO modulos VALUES (4, null, 3, 1, 4,1);
INSERT INTO modulos VALUES (5, 2, null, 2, 5,1);
INSERT INTO pregunta VALUES (1, '¿Cuánto es 2+2?','Dos veces 2 es igual a 4',null,1,1);
INSERT INTO respuesta VALUES (null, '1',null,0,1);
INSERT INTO respuesta VALUES (null, '2',null,0,1);
INSERT INTO respuesta VALUES (null, '3',null,0,1);
INSERT INTO respuesta VALUES (null, '4',null,1,1);
INSERT INTO pregunta VALUES (2, '¿En qué año se inició la independencia de México?','La independencia de México comenzó la madrugada del 16 de Septiembre de 1810',null,2,1);
INSERT INTO respuesta VALUES (null, '1910',null,0,2);
INSERT INTO respuesta VALUES (null, '1914',null,0,2);
INSERT INTO respuesta VALUES (null, '1810',null,1,2);
INSERT INTO respuesta VALUES (null, '1492',null,0,2);
INSERT INTO pregunta VALUES (3, '¿Cuál es la capital de México?','La Ciudad de México (antes llamada Distrito Federal) es la capital de los Estados Unidos Mexicanos',null,3,1);
INSERT INTO respuesta VALUES (null, 'Guadalajara',null,0,3);
INSERT INTO respuesta VALUES (null, 'Cancún',null,0,3);
INSERT INTO respuesta VALUES (null, 'Monterrey',null,0,3);
INSERT INTO respuesta VALUES (null, 'Ciudad de México',null,1,3);
INSERT INTO pregunta VALUES (4, '¿Cuál es el resultado de la suma 3+5?','3 unidades sumadas a 5 unidades da como resultado 8 unidades',null,4,1);
INSERT INTO respuesta VALUES (null, '8',null,1,4);
INSERT INTO respuesta VALUES (null, '7',null,0,4);
INSERT INTO respuesta VALUES (null, '9',null,0,4);
INSERT INTO respuesta VALUES (null, '10',null,0,4);
INSERT INTO pregunta VALUES (5, '¿Qué animal es conocido por ser el rey de la selva?','El león es considerado el rey de la selva por su capacidad de dominar a la manada',null,5,1);
INSERT INTO respuesta VALUES (null, 'Elefante',null,0,5);
INSERT INTO respuesta VALUES (null, 'Tigre',null,0,5);
INSERT INTO respuesta VALUES (null, 'Gorila',null,0,5);
INSERT INTO respuesta VALUES (null, 'León',null,1,5);
INSERT INTO pregunta VALUES (6, '¿Cuál es el río más largo del mundo?','El río Nilo es el más largo del mundo con 6,650 kilómetros de longitud',null,1,2);
INSERT INTO respuesta VALUES (null, 'Nilo',null,1,6);
INSERT INTO respuesta VALUES (null, 'Amazonas',null,0,6);
INSERT INTO respuesta VALUES (null, 'Yangtsé',null,0,6);
INSERT INTO respuesta VALUES (null, 'Misisipi',null,0,6);
INSERT INTO pregunta VALUES (7, '¿Quién escribió la obra literaria "Don Quijote de la Mancha"?','La novela Don Quijote de la Mancha​ es una novela escrita por el español Miguel de Cervantes Saavedra',null,2,2);
INSERT INTO respuesta VALUES (null, 'Federico García Lorca',null,0,7);
INSERT INTO respuesta VALUES (null, 'Miguel de Cervantes',null,1,7);
INSERT INTO respuesta VALUES (null, 'Gabriel García Márquez',null,0,7);
INSERT INTO respuesta VALUES (null, 'Mario Vargas Llosa',null,0,7);
INSERT INTO pregunta VALUES (8, '¿Cuál es el planeta más cercano al sol?','Mercurio es el planeta más cercano al sol, y es también el más pequeño de nuestro sistema solar',null,3,2);
INSERT INTO respuesta VALUES (null, 'Júpiter',null,0,8);
INSERT INTO respuesta VALUES (null, 'Venus',null,0,8);
INSERT INTO respuesta VALUES (null, 'Mercurio',null,1,8);
INSERT INTO respuesta VALUES (null, 'Tierra',null,0,8);
INSERT INTO pregunta VALUES (9, '¿Quién es el presidente actual de los Estados Unidos?','Joe Biden es el 46.º y actual presidente de los Estados Unidos desde el 20 de enero de 2021',null,4,2);
INSERT INTO respuesta VALUES (null, 'Donald Trump',null,0,9);
INSERT INTO respuesta VALUES (null, 'Joe Biden',null,1,9);
INSERT INTO respuesta VALUES (null, 'Barack Obama',null,0,9);
INSERT INTO respuesta VALUES (null, 'George W. Bush',null,0,9);
INSERT INTO pregunta VALUES (10, '¿Cuál es el continente más grande del mundo?','Asia es el continente más grande del mundo, con una extensión de 44.5 millones de kilómetros cuadrados',null,5,2);
INSERT INTO respuesta VALUES (null, 'Asia',null,1,10);
INSERT INTO respuesta VALUES (null, 'América',null,0,10);
INSERT INTO respuesta VALUES (null, 'África',null,0,10);
INSERT INTO respuesta VALUES (null, 'Europa',null,0,10);
INSERT INTO pregunta VALUES (11, '¿Cuál es la capital de Argentina?','Buenos Aires es la capital y ciudad más poblada de la República Argentina',null,1,3);
INSERT INTO respuesta VALUES (null, 'Santiago de Chile',null,0,11);
INSERT INTO respuesta VALUES (null, 'Montevideo',null,0,11);
INSERT INTO respuesta VALUES (null, 'Buenos Aires',null,1,11);
INSERT INTO respuesta VALUES (null, 'Lima',null,0,11);
INSERT INTO pregunta VALUES (12, '¿Cuál es el resultado de sumar los ángulos internos de un triángulo?','La suma de los ángulos interiores de un triángulo es igual a 180°. Un ángulo interior y exterior de un triángulo son suplementarios, es decir, suman 180º',null,2,3);
INSERT INTO respuesta VALUES (null, '90 grados',null,0,12);
INSERT INTO respuesta VALUES (null, '180 grados',null,1,12);
INSERT INTO respuesta VALUES (null, '360 grados',null,0,12);
INSERT INTO respuesta VALUES (null, '720 grados',null,0,12);
INSERT INTO pregunta VALUES (13, '¿Cuál es la fórmula química del agua?','El agua es una sustancia cuya molécula está compuesta por dos átomos de hidrógeno y uno de oxígeno unidos por un enlace covalente',null,3,3);
INSERT INTO respuesta VALUES (null, 'H2SO4',null,0,13);
INSERT INTO respuesta VALUES (null, 'NaCl',null,0,13);
INSERT INTO respuesta VALUES (null, 'CH4',null,0,13);
INSERT INTO respuesta VALUES (null, 'H2O',null,1,13);
INSERT INTO pregunta VALUES (14, '¿Cuál es el resultado de multiplicar 5 x 6?','5 veces 6 unidades es igual al 30 unidades',null,4,3);
INSERT INTO respuesta VALUES (null, '20',null,0,14);
INSERT INTO respuesta VALUES (null, '25',null,0,14);
INSERT INTO respuesta VALUES (null, '30',null,1,14);
INSERT INTO respuesta VALUES (null, '15',null,0,14);
INSERT INTO pregunta VALUES (15, '¿Cuál es el resultado de restar 7 - 3?','7 unidades menos 3 unidades es igual a 4 unidades',null,5,3);
INSERT INTO respuesta VALUES (null, '5',null,0,15);
INSERT INTO respuesta VALUES (null, '4',null,1,15);
INSERT INTO respuesta VALUES (null, '2',null,0,15);
INSERT INTO respuesta VALUES (null, '3',null,0,15);
INSERT INTO pregunta VALUES (16, '¿Cuál es el nombre de la estructura que protege el cerebro?','El cráneo es una caja ósea que protege de golpes y contiene al cerebro principalmente',null,1,4);
INSERT INTO respuesta VALUES (null, 'Cráneo',null,1,16);
INSERT INTO respuesta VALUES (null, 'Columna vertebral',null,0,16);
INSERT INTO respuesta VALUES (null, 'Costillas',null,0,16);
INSERT INTO respuesta VALUES (null, 'Pelvis',null,0,16);
INSERT INTO pregunta VALUES (17, '¿Cuál es el resultado de dividir 20 entre 5?','20 unidades repartidas en 5 partes iguales es igual a 4 unidades',null,2,4);
INSERT INTO respuesta VALUES (null, '5',null,0,17);
INSERT INTO respuesta VALUES (null, '10',null,0,17);
INSERT INTO respuesta VALUES (null, '15',null,0,17);
INSERT INTO respuesta VALUES (null, '4',null,1,17);
INSERT INTO pregunta VALUES (18, '¿Cuál es la capital de España?','Madrid es un municipio y una ciudad de España, con categoría histórica de villa, es la capital del Estado y de la Comunidad de Madrid',null,3,4);
INSERT INTO respuesta VALUES (null, 'París',null,0,18);
INSERT INTO respuesta VALUES (null, 'Roma',null,0,18);
INSERT INTO respuesta VALUES (null, 'Madrid',null,1,18);
INSERT INTO respuesta VALUES (null, 'Berlín',null,0,18);
INSERT INTO pregunta VALUES (19, '¿Cuántos planetas hay en nuestro sistema solar?','Los planetas del sistema solar son 8: Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano, Neptuno. Más allá de Neptuno podemos encontrar varios planetas enanos, como Plutón, que hasta el año 2006 se consideraba el noveno planeta del sistema solar',null,4,4);
INSERT INTO respuesta VALUES (null, '8',null,1,19);
INSERT INTO respuesta VALUES (null, '7',null,0,19);
INSERT INTO respuesta VALUES (null, '9',null,0,19);
INSERT INTO respuesta VALUES (null, '10',null,0,19);
INSERT INTO pregunta VALUES (20, '¿Quién fue el primer presidente de México?','José Miguel Ramón Adaucto Fernández y Félix, conocido como Guadalupe Victoria, fue el primer presidente de México, en el periodo del 10 de octubre de 1824 al 31 de marzo de 1829',null,5,4);
INSERT INTO respuesta VALUES (null, 'Benito Juárez',null,0,20);
INSERT INTO respuesta VALUES (null, 'Porfirio Díaz',null,0,20);
INSERT INTO respuesta VALUES (null, 'Miguel Hidalgo',null,0,20);
INSERT INTO respuesta VALUES (null, 'Guadalupe Victoria',null,1,20);