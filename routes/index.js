const express =  require('express');

/* Definição de rotas */
const router = express.Router();

router.get('/' , function( req, res ){

    res.send('hellow world!');
});

module.exports = router;