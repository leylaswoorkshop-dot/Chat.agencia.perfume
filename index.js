const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Ruta principal para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('Servidor de Agencia de Perfumes Activo');
});

// Ruta del Webhook para Meta
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  // Aquí usamos la palabra secreta: my_token_secret
  if (mode && token) {
    if (mode === 'subscribe' && token === 'my_token_secret') {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

app.listen(port, () => {
  console.log(`Bot escuchando en puerto ${port}`);
});
