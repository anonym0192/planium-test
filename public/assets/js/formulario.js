$( document ).ready(function() {
    pegarListaDePlanos();
});

const pegarListaDePlanos =  () => {

      fetch('api/v1/planos')
        .then((response) => response.json())
        .then((data) => {
            data.forEach(plano => {
                $('#plano').append(`<option value="${plano.registro}">${plano.nome}</option>`)   
            });

        }).catch(console.error);
};

const mostrarCamposDeFormulario = (e) => {

    const qtBeneficiarios = e.target.value;

    $("#beneficiarios").html("");

    for(let i = 0 ; i < qtBeneficiarios ; ++i){
        $("#beneficiarios").append(`
        <div class="form-row">
            <div class="form-group col-md-9">
                <label for="nome${i+1}">Nome Completo:</label>
                <input type="text" class="form-control" id="nome${i+1}" name="nome${i+1}" required">
            </div>
            <div class="form-group col-md-3">
                <label for="idade${i+1}">Idade:</label>
                <input type="number" class="form-control" id="idade${i+1}" name="idade${i+1}"  min="1" max="100" required>
            </div>
        </div>`);
    }
    

}

const enviarDados = (e) => {

    e.preventDefault();

    const qtBeneficiarios = $("#qtBeneficiarios").val();

    const plano = $("#plano").val();

    const beneficiarios = [];

    for(let i = 0 ; i < qtBeneficiarios ; ++i){

        const beneficiarioNome = $(`#nome${i+1}`).val();
        const beneficiarioIdade = $(`#idade${i+1}`).val();
        
        beneficiarios.push({nome: beneficiarioNome, idade: beneficiarioIdade});

    }

    const body = {beneficiarios, qtBeneficiarios, plano};

    fetch('api/v1/assinar', { 
        method: 'post',
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'                
            },
        body: JSON.stringify(body)})
            .then((response) => response.json())
            .then((data) => {

            if(data.error){
                mostrarMensagemDeErro(data.error);
                return;
            }

            localStorage.setItem('proposta', JSON.stringify(data));

            document.location.href = `/proposta`;
            
        }).catch((error) => {

            mostrarMensagemDeErro(error.message);
            console.error(error.message);
        });
}

const mostrarMensagemDeErro = (mensagem) => {

    $('#alert').html(mensagem);
    $('#alert').removeClass( "d-none" );
    $('#alert').addClass( "alert-danger" );

}

const mostrarMensagemDeSucesso = (mensagem) => {

    $('#alert').html(mensagem);
    $('#alert').removeClass( "d-none" );
    $('#alert').addClass( "alert-success" );

}