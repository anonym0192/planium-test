const {lerArquivoJson} = require('../../utils');


exports.pegarPlanos =  () => {

    return lerArquivoJson("api/data/plans.json");
    
}

exports.pegarPlanoPeloRegistro =  (registro) => {

    const planosDatabase = lerArquivoJson("api/data/plans.json");
    
    const resultado = planosDatabase.find((item) => item.registro == registro);
    
    if(!resultado){
        return null;
    }

    return resultado;

}

exports.pegarTodosOsPrecos =  () => {

    return lerArquivoJson("api/data/prices.json");

}