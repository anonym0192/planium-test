const express =  require('express');

/* Definição de rotas */
const router = express.Router();

router.get('/api/v1' , function( req, res ){

    res.send('hellow world!');
});

module.exports = router;