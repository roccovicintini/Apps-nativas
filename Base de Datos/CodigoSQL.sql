
CREATE TABLE Usuarios (
    id_usuario INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    fecha_registro DATE NOT NULL,
    perfil VARCHAR(20) NOT NULL CHECK (perfil IN ('Cliente', 'Proveedor'))
);


CREATE TABLE Cliente (
    id_cliente INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_usuario INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    fecha_nacimiento DATE,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);


CREATE TABLE Carrito (
    id_carrito INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_usuario INT,
    fecha_creacion DATE,
    estado VARCHAR(100),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);


CREATE TABLE Direccion (
    id_direccion INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_usuario INT,
    pais VARCHAR(50) NOT NULL,
    calle VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    provincia VARCHAR(100) NOT NULL,
    localidad VARCHAR(100) NOT NULL,
    codigo_postal VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);


CREATE TABLE Ordenes (
    id_ordenes INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_direccion INT,
    id_carrito INT,
    estado VARCHAR(50) NOT NULL, -- ej. demorado, a tiempo
    total VARCHAR(50) NOT NULL,
    fecha_orden DATE,
    fecha_envio DATE,
    FOREIGN KEY (id_carrito) REFERENCES Carrito(id_carrito),
    FOREIGN KEY (id_direccion) REFERENCES Direccion(id_direccion)
);


CREATE TABLE Envios (
    id_envios INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_ordenes INT,
    carrier VARCHAR(75) NOT NULL, -- ej.: andreani, correo arg., etc.
    numero_seguimiento VARCHAR(10) NOT NULL,
    estado VARCHAR(30) NOT NULL,
    fecha_envio DATE,
    fecha_estimada_entrega DATE,
    FOREIGN KEY (id_ordenes) REFERENCES Ordenes(id_ordenes)
);


CREATE TABLE Pagos (
    id_pagos INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_ordenes INT,
    metodo_pago VARCHAR(100),
    estado_pago VARCHAR(100),
    monto VARCHAR(100) NOT NULL,
    moneda VARCHAR(100) NOT NULL,
    fecha_pago VARCHAR(100) NOT NULL,
    comprobante VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_ordenes) REFERENCES Ordenes(id_ordenes)
);

CREATE TABLE Pais (
    id_pais INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Categoria (
    id_categoria INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(100)
);

CREATE TABLE Proveedores (
    id_proveedor INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_pais INT,
    nombre VARCHAR(100) NOT NULL,
    pais VARCHAR(50) NOT NULL,
    contacto VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(25) NOT NULL,
    FOREIGN KEY (id_pais) REFERENCES Pais(id_pais)
);


CREATE TABLE Productos (
    id_productos INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_pais INT,
    id_categoria INT,
    id_proveedor INT,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(50) NOT NULL,
    precio_usd VARCHAR(100) NOT NULL,
    precio_moneda_local VARCHAR(25) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    pais_origen VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_pais) REFERENCES Pais(id_pais),
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria),
    FOREIGN KEY (id_proveedor) REFERENCES Proveedores(id_proveedor)
);


CREATE TABLE Items_Carrito (
    id_items_carrito INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_carrito INT,
    id_producto INT,
    cantidad VARCHAR(100) NOT NULL,
    precio_unitario VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_carrito) REFERENCES Carrito(id_carrito),
    FOREIGN KEY (id_producto) REFERENCES Productos(id_productos)
);


CREATE TABLE Resena (
    id_resena INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_productos INT,
    id_usuario INT,
    calificacion VARCHAR(100) NOT NULL,
    comentario VARCHAR(100) NOT NULL,
    fecha_comentario DATE,
    FOREIGN KEY (id_productos) REFERENCES Productos(id_productos),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);