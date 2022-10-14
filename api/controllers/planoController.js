const planos = require('../data/plans.json');
const beneficiarioModel = require('../models/beneficiarioModel');
const planoModel = require('../models/planoModel');


exports.mostrarPlanos = (req, res) => {

    return res.json(planoModel.pegarPlanos());

}