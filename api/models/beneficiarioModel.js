const {atualizarArquivoJson, lerArquivoJson} = require('../../utils');


exports.pegarTodosBeneficiarios =  () => {

    return lerArquivoJson("api/data/beneficiarios.json");
    
}

exports.adicionarBeneficiarios =  (beneficiarios) => {


    const beneficiariosDatabase = lerArquivoJson("api/data/beneficiarios.json")

    const databaseUpdate = [...beneficiariosDatabase, beneficiarios];

    atualizarArquivoJson('api/data/beneficiarios.json', databaseUpdate );

}

exports.acharListaDeBeneficiariosPeloId =  (id) => {

    const beneficiariosDatabase = lerArquivoJson("api/data/beneficiarios.json");
    
    const resultado = beneficiariosDatabase.find((item) => item.id == id);
    
    if(!resultado){
        return null;
    }

    return resultado;

}
    