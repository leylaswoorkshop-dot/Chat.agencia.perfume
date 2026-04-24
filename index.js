const express = require('express');
const axios = require('axios');
const app = express(); // <--- Aquí estaba el error, ya está corregido
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor de Perfumes Activo');
});

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === 'my_token_secret') {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', async (req, res) => {
  const body = req.body;
  if (body.object === 'whatsapp_business_account') {
    try {
      // Tu URL de Make
      await axios.post('https://hook.eu1.make.com/r2w8hakcl13gp1pk2pk14958qf81npxp', body);
      console.log("¡MENSAJE ENVIADO A MAKE EXITOSAMENTE!");
    } catch (error) {
      console.log("Error al enviar a Make:", error.message);
    }
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Servidor en puerto ${port}`);
});
