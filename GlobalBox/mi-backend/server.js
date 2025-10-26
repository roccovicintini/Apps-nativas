
// importamos express y usamos pool pq la otra no me anda
const express = require('express');
const cors = require('cors'); 
const { Pool } = require('pg');

// configuración de la conexión con la db
const pool = new Pool({
    user: 'postgres.gehltasvljdhiptdtzre',
    host: 'aws-1-us-east-2.pooler.supabase.com',
    database: 'postgres',
    password: 'sup4B4se03!',
    port: 6543,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 8000,
    pool_mode: 'session',
});


pool
    .query('SELECT 1')
    .then(() => console.log('Conectado a su PostgreSQL'))
    .catch((err) => console.error('Error de conexión', err.stack));

// creamos una instancia de la aplicación express
const app = express();
const PORT = 3000;

// configuración de CORS para permitir la comunicación con Ionic/Angular
const corsOptions = {
    // orígenes permitidos (puerto estándar de Ionic/Capacitor y Angular)
    origin: ['http://localhost:8100', 'http://localhost:4200'], 
    // Métodos permitidos (para POST, PUT, DELETE, etc.)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

    credentials: true, 
    optionsSuccessStatus: 204
};

// aplicamos CORS como dijo el profe
app.use(cors(corsOptions)); 
app.use(express.json());


// definimos la primera ruta get
app.get('/', (req, res) => {
  res.send('Hola desde el Backend Servidor Express funcionando');
});

// ruta post para crear producto
app.post('/api/productos', async (req, res) => {
  const { 
        nombre, 
         precio_usd, 
         precio_ars, 
         imagen, 
         id_pais, 
         id_categoria, 
         id_proveedor, 
         envio_gratis, 
         descuento, 
         flag, 
         reviews, 
         stock, 
         resena 
     } = req.body;

     const query = `INSERT INTO productos 
         (nombre, precio_usd, precio_ars, imagen, id_pais, id_categoria, id_proveedor, envio_gratis, descuento, flag, reviews, stock, resena) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
         RETURNING *`;
 
     const values = [
         nombre, precio_usd, precio_ars, imagen, id_pais, id_categoria, 
         id_proveedor, envio_gratis, descuento, flag, reviews, stock, resena
    ];

     try {
         const resultado = await pool.query(query, values); 
         res.status(201).json(resultado.rows[0]);
     } catch (error) {
         console.error('Error al crear producto:', error);
         res.status(500).json({ error: 'Error al crear producto' });
     }
});

// ruta get para obtener todos los productos
app.get('/api/productos', async (req, res) => {
     const query = 'SELECT * FROM productos ORDER BY id_productos ASC';

     try {
         const resultado = await pool.query(query); 
         res.json(resultado.rows); 
     } catch (err) {
         console.error(err);
         res.status(500).send('Error al obtener productos'); 
     }
});

// ruta put para actualizar producto
app.put('/api/productos/:id', async (req, res) => {
     const id = req.params.id;
     const { 
        nombre, 
         precio_usd, 
         precio_ars, 
         imagen, 
         id_pais, 
         id_categoria, 
         id_proveedor, 
         envio_gratis, 
         descuento, 
         flag, 
         reviews, 
         stock, 
         resena 
         } = req.body;

     const query = `UPDATE productos 
         SET nombre=$1, precio_usd=$2, precio_ars=$3, imagen=$4, id_pais=$5, 
             id_categoria=$6, id_proveedor=$7, envio_gratis=$8, descuento=$9, 
             flag=$10, reviews=$11, stock=$12, resena=$13 
         WHERE id_productos=$14 
         RETURNING *`;
 
     const values = [
         nombre, precio_usd, precio_ars, imagen, id_pais, id_categoria, 
         id_proveedor, envio_gratis, descuento, flag, reviews, stock, resena, id
    ];
 
     try {
         const resultado = await pool.query(query, values); 
         if (resultado.rowCount === 0) {
             return res.status(404).send('Producto no encontrado'); 
            }
         res.json(resultado.rows[0]);
     } catch (err) {
         console.error(err); 
         res.status(500).send('Error al actualizar el producto'); 
        }
});

// ruta delete para eliminar producto
app.delete('/api/productos/:id', async (req, res) => {
     const id = req.params.id;
     const query = 'DELETE FROM productos WHERE id_productos = $1';
     const values = [id]; 

     try {
         const resultado = await pool.query(query, values); 
         if (resultado.rowCount === 0) {
         return res.status(404).send('Producto no encontrado'); 
        }
         res.status(204).send();
     } catch (err) {
         console.error(err); 
         res.status(500).send('Error al eliminar producto');
     }
});

// ruta get para obtener producto por id
// revisar y usar para botón de + productos
app.get('/api/productos/:id', async (req, res) => {
     const id = req.params.id;
     const query = 'SELECT * FROM productos WHERE id_productos = $1';
     const values = [id];

     try {
         const resultado = await pool.query(query, values);
         if (resultado.rows.length === 0) {
         return res.status(404).send('Producto no encontrado');
        }
     res.json(resultado.rows[0]);
     } catch (err) {
         console.error(err);
         res.status(500).send('Error al obtener producto');
     }
});

app.listen(PORT, () => {
     console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});

app.post('/api/usuarios', async (req, res) => {
    const { nombre, email, password } = req.body;
    
    try {
        const query = 'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *';
        const values = [nombre, email, password];
        const resultado = await pool.query(query, values);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
});

app.post('/api/cliente', async (req, res) => {
    const { nombre, email, telefono } = req.body;

    try {
        const query = 'INSERT INTO cliente (nombre, email, telefono) VALUES ($1, $2, $3) RETURNING *';
        const values = [nombre, email, telefono];
        const resultado = await pool.query(query, values);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error('Error al crear cliente:', error);
        res.status(500).json({ error: 'Error al crear cliente' });
    }
});

app.post('/api/direccion', async (req, res) => {
    const { calle, ciudad, provincia, codigo_postal } = req.body;

    try {
        const query = 'INSERT INTO direccion (calle, ciudad, provincia, codigo_postal) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [calle, ciudad, provincia, codigo_postal];
        const resultado = await pool.query(query, values);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error('Error al crear dirección:', error);
        res.status(500).json({ error: 'Error al crear dirección' });
    }
});