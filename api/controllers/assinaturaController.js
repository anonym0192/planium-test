const uuid = require('uuid');
const beneficiarioModel = require('../models/beneficiarioModel');
const planoModel = require('../models/planoModel');
const propostaModel = require('../models/propostaModel');

exports.calcularAssinatura =  (req, res) => {


    let planoSelecionado = req.body.plano;

    let qtBeneficiarios = req.body.qtBeneficiarios

    let beneficiariosDados = req.body.beneficiarios;

    
    /* Pega os dados do plano escolhido*/
    const planoDados = planoModel.pegarPlanoPeloRegistro(planoSelecionado);

    /* Se o registro do plano for invalido retorna um json com mensagem de erro  */
    if(!planoDados){
        res.status(400).json({error: "Registro de Plano de saúde inválido!"})
    }
    if(!beneficiariosDados || beneficiariosDados.length < 1){
        res.status(400).json({error: "Nenhum beneficiário enviado!"})
    }
    if(!qtBeneficiarios || qtBeneficiarios < 1){
        res.status(400).json({error: "Quantidade de beneficiários não informada ou inválida!"})
    }

    beneficiariosDados?.forEach((beneficiario) => {
        if(!beneficiario.nome || !beneficiario.idade ){
            res.status(400).json({error: "Não é permitido campos em branco!"})
        }
    });
    
    /* Pega os precos do plano de acordo com o codigo e com o numero de beneficiarios */

    let precoDoPlano = planoModel.pegarTodosOsPrecos()?.filter((item) => item.codigo == planoDados.codigo &&  qtBeneficiarios >= item.minimo_vidas  )

    /* Se não tiver nenhum plano que a condição minimo_vidas e com o mesmo código retorna uma mensagem de erro  */
    if(!precoDoPlano || precoDoPlano.length < 1){
        res.status(400).json({error: "Plano não disponível para essa quantidade de beneficiários"});
    }

    /* Escolhe o que tem o minimo_vidas mais alto e tem o mesmo codigo */
    precoDoPlano = precoDoPlano.reduce((precoA, precoB) =>{ 
                                    if(precoB.minimo_vidas >= precoA.minimo_vidas)  precoA = precoB; 
                                    return precoA; 
                            });

    /* Percorre cada beneficiario no array e pega a faixa de preco de acordo com a idade */
    beneficiariosDados = beneficiariosDados.map((beneficiario  , index ) => {
            
            if(beneficiario.idade < 18){
                beneficiario.preco = precoDoPlano['faixa1'];
                beneficiario.faixaDePreco = 'faixa1';

            }else if(beneficiario.idade >= 18 && beneficiario.idade <= 40){
                beneficiario.preco = precoDoPlano['faixa2'];
                beneficiario.faixaDePreco = 'faixa2';

            }else{
                beneficiario.preco = precoDoPlano['faixa3'];
                beneficiario.faixaDePreco = 'faixa3';
            }

            return beneficiario;

        });


    /* Calcula o total a pagar de acordo com o preço de cada um*/
    const totalAPagar = beneficiariosDados.map((beneficiario => beneficiario.preco))
        .reduce((valor1 , valor2 ) => valor1 + valor2);
    

    const beneficiarios = {id: uuid.v4() , beneficiariosDados, qtBeneficiarios , plano: planoSelecionado , total: totalAPagar };

    /* Salva os dados no arquivo Json beneficiarios*/
    beneficiarioModel.adicionarBeneficiarios(beneficiarios);


    /* Retorna um json com dados e informação de proposta para os beneficiarios  */
    res.json({...beneficiarios, nomeDoPlano: planoDados.nome});

}

exports.aceitarProposta = (req, res) => {

    const idDaProposta = req.body.idDaProposta;


    const beneficiariosDaProposta = beneficiarioModel.acharListaDeBeneficiariosPeloId(idDaProposta);


    /* Pega os dados do plano escolhido */
    
    const dadosDoPlano = planoModel.pegarPlanos().find((plano) => plano.registro == beneficiariosDaProposta?.plano);
        
    

    /* Junta todos os dados gera uma proposta e salva */
    const proposta =  { id: uuid.v4() , planoInfo: dadosDoPlano , beneficiarios: beneficiariosDaProposta };

    propostaModel.adicionarProposta(proposta);

    res.json(proposta);

}