const axios = require('axios');
app.post('/webhook', async (req, res) => {
  const body = req.body;
  if (body.object === 'whatsapp_business_account') {
    try {
      // Reemplaza TODA esta línea con tu URL de Make
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

