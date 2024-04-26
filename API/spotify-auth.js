require('dotenv').config();
const axios = require('axios');
const btoa = require('btoa');

const authenticateSpotify = async () => {
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;

    // Verifica se as variáveis de ambiente foram carregadas corretamente
    if (!client_id || !client_secret) {
        throw new Error('CLIENT_ID ou CLIENT_SECRET não definidos no arquivo .env');
    }

    // Conversão da Autenticação para base64
    const string = client_id + ':' + client_secret;
    const base64String = btoa(string);

    // Requisição
    const url = 'https://accounts.spotify.com/api/token';

    const headers = {
        'Authorization': 'Basic ' + base64String,
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');

    try {
        const response = await axios.post(url, data, { headers });
        const access_token = response.data.access_token;
        return access_token;
    } catch (error) {
        console.error('Erro:', error);
        throw new Error('Erro ao obter o token de acesso do Spotify');
    }
};

module.exports = authenticateSpotify;
