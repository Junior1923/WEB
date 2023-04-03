const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const port = 3000;

app.use(bodyParser.json());

//Enlistar
app.get('/contactos', (req, res) => {
  request('http://www.raydelto.org/agenda.php', (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      res.status(500).send('Error al obtener los contactos');
    }
  });
});

//Almacenar
app.post('/contactos', (req, res) => {
  const contacto = req.body;
  const url = 'http://www.raydelto.org/agenda.php/agregar';

  request.post(url, { form: contacto }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send('Contacto almacenado correctamente');
    } else {
      res.status(500).send('Error al almacenar el contacto');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor en el puerto ${port}`);
});

