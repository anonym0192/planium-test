const express =  require('express');
const planoController = require('./api/controllers/planoController');
const assinaturaController = require('./api/controllers/assinaturaController');


/* Definição de rotas */
const router = express.Router();

/* Rotas de páginas de teste front-end */
router.get('/' , function( req, res ){
    res.render('formulario');
});

router.get('/proposta' , function( req, res ){
    res.render('proposta');
});


/* Rotas de API */
router.get('/api/v1/planos' , planoController.mostrarPlanos );

router.post('/api/v1/assinar' , assinaturaController.calcularAssinatura );

router.post('/api/v1/proposta' , assinaturaController.aceitarProposta );

module.exports = router;