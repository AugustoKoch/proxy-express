const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Requisição de GET
app.get('/get', (req, res) => {
    res.send('Olá mundo!');
});

// Requisição de POST
app.post('/post', (req, res) => {
    res.send('Cadastrado com sucesso!');
});


// Configurando o proxy para a rota /api
app.use('/api', createProxyMiddleware({
    target: 'https://google.com', // Redirecionando a requisição para o Google
    changeOrigin: true,  // Altera o cabeçalho 'Host' da requisição para o alvo
    pathRewrite: {
        '^/api': '', // Remove '/api' da URL antes de encaminhar a requisição
    },
}));

app.listen(3000, () => {
    console.log('Proxy rodando na porta 3000');
});
