const express = require('express');
const app = express();
const path = require('path');
const authenticateSpotify = require('./spotify-auth');

// Rota para o arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Rota para obter o token de acesso do Spotify
app.get('/getAccessToken', async (req, res) => {
    try {
        const token = await authenticateSpotify(); // Chame a função de autenticação
        res.send(token); // Envie o token de acesso como resposta
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).send('Erro ao obter o token de acesso do Spotify');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
