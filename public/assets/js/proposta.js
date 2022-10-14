const proposta = JSON.parse(localStorage.getItem('proposta'));

$( document ).ready(function() {

    montarFormularioDeProposta();
});

const montarFormularioDeProposta = (e) => {

    $('#planoEscolhido').html(proposta.nomeDoPlano);

    proposta.beneficiariosDados.forEach(beneficiario=>{

        $('#tabelaDeBeneficiarios tbody').append(`
        <tr>
            <td>${beneficiario.nome}</td>
            <td>${beneficiario.idade}</td>
            <td>R$ ${beneficiario.preco?.toFixed(2)}</td>
            <td>${beneficiario.faixaDePreco}</td>
        </tr>`);
    });

    $('#total').html(`R$ ${proposta.total?.toFixed(2)}`);
    

}

const aceitarProposta = (e) => {

    e.preventDefault();

    const idDaProposta = proposta.id;

    fetch('api/v1/proposta', { 
        method: 'post',
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'                
            },
        body: JSON.stringify({idDaProposta})
        })  
        .then((response) => response.json())
        .then((data) => {

            if(data.error){
                mostrarMensagemDeErro(data.error);
                return;
            }

            mostrarMensagemDeSucesso("Proposta aceita!");

            setTimeout(() => {
                document.location.href = "/";
            }, 5000)
        })
        .catch((error) => {
            mostrarMensagemDeErro(error.message);
            console.error(error.message);
        });

}

const cancelarProposta = () => {

    localStorage.removeItem('proposta');
    
    document.location.href = "/";

}