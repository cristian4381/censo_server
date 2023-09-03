drop database censo;
create database censo;
use censo;

-- TABLAS para la vivienda 
CREATE TABLE piso (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(50)
);

CREATE TABLE pared (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(50)
);

CREATE TABLE techo (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(50)
);

CREATE TABLE ambiente (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(50)
);

CREATE TABLE ubicacion_cocina (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ubicacion VARCHAR(50)
);

CREATE TABLE tipo_cocina (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(50)
);

CREATE TABLE tenencia (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(50)
);

CREATE TABLE vivienda(
  id INT PRIMARY KEY AUTO_INCREMENT,
  no_vivienda int,
  cielo ENUM('tiene', 'no tiene'),
  ventilacion ENUM('buena', 'mala'),
  iluminacion ENUM('buena', 'mala'),
  piso int,
  pared int,
  techo int,
  ambiente int,
  ubicacion_cocina int,
  tipo_cocina int,
  tenencia int,
  FOREIGN KEY (piso) REFERENCES piso(id),
  FOREIGN KEY (pared) REFERENCES pared(id),
  FOREIGN KEY (techo) REFERENCES techo(id),
  FOREIGN KEY (ambiente) REFERENCES ambiente(id),
  FOREIGN KEY (ubicacion_cocina) REFERENCES ubicacion_cocina(id),
  FOREIGN KEY (tipo_cocina) REFERENCES tipo_cocina(id),
  FOREIGN KEY (tenencia) REFERENCES tenencia(id)
);

-- TABLAS para gestion_ambiental
CREATE TABLE abastecimiento_agua (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(50)
);

CREATE TABLE disposicion_excretas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(50)
);

CREATE TABLE disposicion_aguas_reciduales (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(50)
);

CREATE TABLE disposicion_desechos_solidos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(50)
);

CREATE TABLE gestion_ambiental (
  id INT PRIMARY KEY AUTO_INCREMENT,
  abastecimiento_agua int,
  disposicion_excretas int,
  disposicion_aguas_reciduales int,
  disposicion_desechos_solidos int,
  FOREIGN KEY (abastecimiento_agua) REFERENCES abastecimiento_agua(id),
  FOREIGN KEY (disposicion_excretas) REFERENCES disposicion_excretas(id),
  FOREIGN KEY (disposicion_aguas_reciduales) REFERENCES disposicion_aguas_reciduales(id),
  FOREIGN KEY (disposicion_desechos_solidos) REFERENCES disposicion_desechos_solidos(id)
);

-- TABLAS persona
CREATE TABLE escolaridad (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(50)
);

CREATE TABLE persona (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50),
  sexo ENUM('Masculino', 'Femenino'),
  fecha_nacimiento DATE,
  ocupacion VARCHAR(75),
  sabe_leer ENUM('si', 'no','No aplica'),
  escolaridad int,
  FOREIGN KEY (escolaridad) REFERENCES escolaridad(id)
);
CREATE TABLE estado_civil (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(50)
);
CREATE TABLE religion (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(50)
);
CREATE TABLE procedencia (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(50)
);
CREATE TABLE jefe_familia(
  id INT PRIMARY KEY AUTO_INCREMENT,
  persona int,
  estado_civil int,
  religion int,
  procedencia int,
  FOREIGN KEY (persona) REFERENCES persona(id),
  FOREIGN KEY (estado_civil) REFERENCES estado_civil(id),
  FOREIGN KEY (religion) REFERENCES religion(id),
  FOREIGN KEY (procedencia) REFERENCES procedencia(id)
);

-- TABLAS para familia
CREATE TABLE comunidad (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100)
);

CREATE TABLE sector (
  id INT PRIMARY KEY AUTO_INCREMENT,
  comunidad INT,
  nombre VARCHAR(100),
  FOREIGN KEY (comunidad) REFERENCES comunidad(id)
);

CREATE TABLE familia (
  id INT PRIMARY KEY AUTO_INCREMENT,
  no_familia INT,
  comunidad INT,
  sector INT,
  vivienda INT,
  jefe_familia INT,
  FOREIGN KEY (comunidad) REFERENCES comunidad(id),
  FOREIGN KEY (sector) REFERENCES sector(id),
  FOREIGN KEY (vivienda) REFERENCES vivienda(id),
  FOREIGN KEY (jefe_familia) REFERENCES persona(id)
);

CREATE TABLE detalle_familia (
  id INT PRIMARY KEY AUTO_INCREMENT,
  familia INT,
  miembro INT,
  FOREIGN KEY (familia) REFERENCES familia(id),
  FOREIGN KEY (miembro) REFERENCES persona(id)
);

-- TABLAS de mascotas
CREATE TABLE tipo_mascota (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(50)
);

CREATE TABLE mascotas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  familia INT,
  tipo_mascota INT,
  ubicacion ENUM('Adecuado', 'Inadecuado'),
  cantidad INT,
  FOREIGN KEY (familia) REFERENCES familia(id),
  FOREIGN KEY (tipo_mascota) REFERENCES tipo_mascota(id)
);

-- TABLAS establecmientos publicos
CREATE TABLE tipo_establecimiento (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(50)
);

CREATE TABLE establecimientos_publicos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  familia INT,
  tipo INT,
  FOREIGN KEY (familia) REFERENCES familia(id),
  FOREIGN KEY (tipo) REFERENCES tipo_establecimiento(id)
);
-- Tabla nececidad observacion 
CREATE TABLE embarazada (
  id INT PRIMARY KEY AUTO_INCREMENT,
  persona INT,
  tiempo_gestacion VARCHAR(500),
  lleva_control ENUM('Si', 'No'),
  lugar_control VARCHAR(500),
  telefono Varchar(8),
  FOREIGN KEY (persona) REFERENCES persona(id)
);

-- ubicacion
CREATE TABLE ubicacion (
  id INT PRIMARY KEY AUTO_INCREMENT,
  familia INT,
  longitud DOUBLE,
  latitud DOUBLE,
  FOREIGN KEY (familia) REFERENCES familia(id)
);

-- TABLAS para usuario
CREATE TABLE rol (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(50)
);

CREATE TABLE usuario (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50),
  correo VARCHAR(50),
  telefono VARCHAR(8),
  password VARCHAR(100),
  rol INT,
  FOREIGN KEY (rol) REFERENCES rol(id)
);

-- TABLA para el censo
CREATE TABLE censo (
  id INT PRIMARY KEY AUTO_INCREMENT,
  familia INT,
  comunidad INT,
  sector INT,
  gestion_ambiental INT,
  registro INT,
  fecha_registro DATETIME,
  FOREIGN KEY (familia) REFERENCES familia(id),
  FOREIGN KEY (comunidad) REFERENCES comunidad(id),
  FOREIGN KEY (sector) REFERENCES sector(id),
  FOREIGN KEY (gestion_ambiental) REFERENCES gestion_ambiental(id),
  FOREIGN KEY (registro) REFERENCES usuario(id)
);

INSERT INTO rol (tipo) VALUES 
  ('Administrador'),
  ('Cencista'),
  ('Encargado');

/*select * from usuario;

select u.* , r.tipo from usuario u
Inner join rol r on r.id = u.rol;*/


-- DATOS que foman una Vivienda
INSERT INTO piso (tipo) VALUES
  ('Cemento'),
  ('Ceramico'),
  ('Madera'),
  ('Tierra');

INSERT INTO pared (tipo) VALUES
  ('Block'),
  ('Ladrillo'),
  ('Adobe'),
  ('Bahareque'),
  ('Madera/Lamina');
  

INSERT INTO techo (tipo) VALUES
  ('Lamina'),
  ('Duralita/Teja'),
  ('Manaca'),
  ('Terraza/Cemento');
  
INSERT INTO ambiente (tipo) VALUES
  ('Ambiente unico'),
  ('Ambiente separado');
  
INSERT INTO ubicacion_cocina (ubicacion) VALUES
  ('Separado de los ambientes'),
  ('No Separado de los ambientes');

INSERT INTO tipo_cocina (tipo) VALUES
  ('Estufa de gas'),
  ('Poyo'),
  ('En el suelo');

INSERT INTO tenencia (tipo) VALUES
  ('Propia'),
  ('Alquilada'),
  ('Prestada');
  

INSERT INTO comunidad(nombre) VALUES 
("BRISAS DE XULA"),
("CANDELARIA"),
("CANTON  ICAN"),
("CHACALTE APARICIO NO. 1."),
("CHACALTE SIS"),
("CHACALTE ZONA 2"),
("COLONIA GUADALUPE"),
("EL PROGRESO"),
("CONCEPCION LA CEIBA"),
("GUACHIPILIN ZONA  1."),
("GUACHIPILIN ZONA 2."),
("LA FRANJA "),
("LOS LLANOS"),
("LOTIFICACION SICAN"),
("SANTA TERESA"),
("PALMERAS"),
("PARROQUIA"),
("TULULA"),
("FINCA SANDOVALES");

INSERT INTO sector (comunidad,nombre) VALUES
(1,"parte alta"),
(1,"parte Baja"),
(2,"La escuela"),
(2,"Tienda de Don Emilio"),
(2,"parte de arriba"),
(2,"finca olimpo"),
(3,"Delirio"),
(3,"Lotificación la Paz"),
(3,"Villa Esperanza"),
(3,"Residenciales Margarita"),
(3,"Calle de la Cruz lado de arriba"),
(3,"calle de la estaciòn Banrural"),
(4,"Mata Palo"),
(4,"Tienda el Milagro"),
(4,"Matina Jut"),
(4,"Entrada Kilometro"),
(4,"olivos de Sinaì"),
(4,"escuela de  Parvulos"),
(4,"La joya"),
(4,"Porton Verde"),
(4,"Lotificacion Fredy"),
(4,"La Bautista"),
(4,"La Jabonera"),
(4,"Don Aroldo"),
(4,"Chaparral"),
(4,"La Palma"),
(4,"Iglesia Catolica"),
(4,"Iglesia Eloim"),
(4,"Mangalito"),
(4,"De la Academia"),
(4,"Conacaste"),
(4,"La talaquera"),
(4,"Taller Coronado"),
(4,"La Flecha"),
(4,"Naranjales"),
(4,"Limonaria"),
(4,"La Cruz"),
(4,"Caimital"),
(4,"Pollon"),
(4,"Primer Callejon"),
(4,"Segundo Callejon"),
(4,"Uclesam"),
(5,"San Eugenio"),
(5,"San Isidro"),
(5,"Calle Adoquinada"),
(5,"Calle de Jesucristo"),
(5,"Disco Laser"),
(5,"La Planicie"),
(5,"El Jordan"),
(5,"Iglesia Catolica"),
(5,"El Tubo"),
(5,"Sector Escuela"),
(5,"San Luis"),
(5,"Juana Carillo"),
(6,"Las flores "),
(6,"Mario Guatzin"),
(6,"Cuchilla"),
(6,"San Juan"),
(6,"Manantial"),
(6,"Trinidad"),
(6,"escuela"),
(6,"la Isla"),
(7,"taller Chabelo"),
(7,"Primera Calle"),
(7,"Segunda Calle"),
(8,"Sector uno"),
(8,"cooperativa"),
(9,"calle pricipal"),
(9,"primera calle"),
(9,"segunda calle"),
(9,"La Escuela"),
(9,"Iglesia Catolica "),
(10,"la puerta es cristo"),
(10,"sector A  la escuela"),
(10,"rambutan"),
(10,"la pollera"),
(10,"molino de doña Maria"),
(10," la Escuelas sector b "),
(10,"los Arcos"),
(11,"Hotel California"),
(11,"Calle 18 Adoquinada"),
(11,"Guadalupe"),
(11,"San Alberto"),
(11,"la escuela  "),
(11,"tienda la Bendicion"),
(11,"Finca   Mercedez"),
(11,"Lotificación Aceituno"),
(11,"Lotificación  La Ceiba"),
(11,"Santa Isabel"),
(11,"Labor la Esperanza"),
(11,"Labor Cabañas"),
(12,"LA FRANJA"),
(12,"el guayabal"),
(13,"primera Calle"),
(13,"segunda Calle"),
(13,"Sector Tanquez"),
(14,"Sican"),
(14,"Brisas de sican"),
(15,"Inarsa"),
(15,"La bendicion"),
(15,"Amparo"),
(15,"Marquezote"),
(15,"Campo de la Feria"),
(15,"Linea Ferrea"),
(15,"Callejon 3"),
(15,"Callejon 5"),
(15,"Callejon 6"),
(15,"Trebol"),
(15,"Olimpo"),
(16,"Rio Ican"),
(16,"Rio Sis"),
(17,"atrás de la parroquia"),
(17,"calle 3 reyes"),
(17,"calle de los gil y sanchez"),
(17,"Rastro viejo"),
(17,"calle del cementerio"),
(18,"Callejon de la cruz"),
(18,"Calle Bazan"),
(18,"Balsamito"),
(18,"utima calle terraceria"),
(18,"Calle de la Cuchilla"),
(18,"callejon de Ministerio Publico"),
(18,"Callejon  Gollo Sanchez"),
(18,"Rastro"),
(18,"Calle Principal "),
(18,"Fonda de Don Julian"),
(19,"Uno"),
(19,"Dos");

INSERT INTO escolaridad(tipo) VALUES
  ('No aplica'),
  ('Primaria'),
  ('Basico'),
  ('Diversificado'),
  ('Universitaria');

INSERT INTO abastecimiento_agua (tipo) VALUES
  ('Conexion Domiciliaria'),
  ('Llenan cantaros'),
  ('Pozo'),
  ('Manantial'),
  ('Rio'),
  ('Otros');
INSERT INTO disposicion_excretas (tipo) VALUES
  ('Inodoros'),
  ('Letrina'),
  ('Letrinas insanitaria'),
  ('A flor de tierra');
INSERT INTO disposicion_aguas_reciduales (tipo) VALUES
  ('Drenaje/Alcantarillado'),
  ('Fosa septica'),
  ('Pozo/Sumidero'),
  ('A flor de tierra');
INSERT INTO disposicion_desechos_solidos (tipo) VALUES
  ('Tren de aseo'),
  ('Clasifican'),
  ('La entierran'),
  ('La queman'),
  ('Al aire libre'),
  ('Otros');
  
INSERT INTO tipo_establecimiento (tipo) VALUES
  ('Tienda'),
  ('Molinos'),
  ('Farmacias'),
  ('Comedores'),
  ('Otros');
  
INSERT INTO tipo_mascota (tipo) VALUES
  ('Gato'),
  ('Perro'),
  ('Otros');
  
INSERT INTO estado_civil (tipo) VALUES
  ('No aplica'),
  ('Soltero/a'),
  ('Casado/a'),
  ('Viudo/a'),
  ('Divorciado/a'),
  ('Separado/a'),
  ('union libre');
  
INSERT INTO religion (tipo) VALUES
  ('No aplica'),
  ('Catolica'),
  ('Evangelica'),
  ('Testigo de jehova'),
  ('Santos de los Últimos Días(Mormones)'),
  ('Buditas'),
  ('Islam'),
  ('Maya'),
  ('Judaísmo');
  
INSERT INTO procedencia (tipo) VALUES
  ('Cuyotenango'),
  ('San Andrés villaseca'),
  ('Retalhuleu'),
  ('Mazatenango'),
  ('San José la máquina'),
  ('Muluá'),
  ('Otro');