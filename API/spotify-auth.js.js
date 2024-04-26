const axios = require('axios');
const btoa = require('btoa');

const client_id = '1aa055640a654a319b37359d9642d9f2';
const client_secret = '35c376bf5ee243f4be749d429eaf7aaa';

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

axios.post(url, data, { headers })
    .then(response => {
        const access_token = response.data.access_token;
        console.log("Token de acesso:", access_token);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
