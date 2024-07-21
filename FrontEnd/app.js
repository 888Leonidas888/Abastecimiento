const express = require('express');
const app = express();
const port = 3000;

// Configurar EJS como el motor de plantillas
app.set('view engine', 'ejs');

// Configurar la carpeta de vistas
app.set('views', __dirname + '/views');

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/menu', (req, res) => {
  res.render('menu');
});

app.get('/products', (req, res) => {
  res.render('products');
});

app.get('/users', (req, res) => {
  res.render('users');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
