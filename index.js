const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Servidor de Agencia de Perfumes Activo');
});

app.listen(port, () => {
  console.log(`Bot escuchando en puerto ${port}`);
});
