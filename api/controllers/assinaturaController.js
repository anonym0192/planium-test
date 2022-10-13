const beneficiarios = require('../data/beneficiarios.json');
const planos = require('../data/plans.json');
const precos = require('../data/prices.json');
const uuid = require('uuid');
const {atualizarArquivoJson} = require('../../utils');

/*Pessoas de 0 a 17 anos vão para a faixa1.
Pessoas de 18 a 40 anos vão para a faixa2.
Pessoas com mais de 40 anos vão para a faixa3.

Quantidade de beneficiários
Idade de cada beneficiário
Nome de cada beneficiário
Registro do plano escolhido (deve ser um dos registros listados na tabela de plano)
Caso o usuário liste um registro inexistente, deve mostrar mensagem de erro.
*/
exports.criarAssinatura = (req, res) => {


    let planoSelecionado = req.body.plano;

    let qtBeneficiarios = req.body.qtBeneficiarios

    let beneficiarios = req.body.beneficiarios  || [];
    
    console.log(precos);
    //console.log(qtBeneficiarios)

    console.log(precos.filter((item) => item.codigo == planoSelecionado && item.minimo_vidas < qtBeneficiarios  ) );

    beneficiarios.map((beneficiario  , index ) => {
        console.log(beneficiario.nome+"\n");

        if(beneficiario.idade < 18){


        }

        if(beneficiario.idade >= 18 && beneficiario.idade <= 40){
            

        }

        if(beneficiario.idade > 40){


        }



    });
    
    /* Total de beneficiarios contando com o titular do plano
    let totalBeneficiarios = dependentes.length + 1;
    */


    

    //res.json([...titular, ...dependentes]);
    res.json({ id: uuid.v4() , beneficiarios });

}

exports.mudarAssinatura = (req, res) => {


}

exports.excluirAssinatura = (req, res) => {


}

const selectionarPrecoDoPlano = () => {

}