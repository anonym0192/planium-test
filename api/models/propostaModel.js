const {lerArquivoJson, atualizarArquivoJson} = require('../../utils');

exports.pegarListaDePropostas =  () => {

    return lerArquivoJson("api/data/propostas.json");
    
}

exports.adicionarProposta =  (proposta) => {


    const propostasDatabase = lerArquivoJson("api/data/propostas.json")

    const databaseUpdate = [...propostasDatabase, proposta];

    atualizarArquivoJson('api/data/propostas.json', databaseUpdate );

}