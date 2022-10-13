const express =  require('express');
const planoController = require('./api/controllers/planoController');
const assinaturaController = require('./api/controllers/assinaturaController');
//const usuarioController = require('./api/controllers/usuarioController');

/* Definição de rotas */
const router = express.Router();

router.get('/' , function( req, res ){

    res.send('hellow world');
});

router.get('/api/v1/planos' , planoController.mostrarPlanos );

router.post('/api/v1/assinar' , assinaturaController.criarAssinatura );

router.put('/api/v1/assinatura' , assinaturaController.mudarAssinatura );

module.exports = router;