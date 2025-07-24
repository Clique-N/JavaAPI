window.addEventListener("DOMContentLoaded", () => { //Tem como intuito ao recarregar a pagina, fazer alguma ação
    document.getElementById("nome").value = localStorage.getItem("nome") || ""; //Puxa os dados do localstorage preenchidos da ultima vez
    document.getElementById("emailForm").value = localStorage.getItem("emailForm") || ""; 
    document.getElementById("cep").value = localStorage.getItem("cep") || "";
    document.getElementById("cidade").value = localStorage.getItem("cidade") || "";
    document.getElementById("estado").value = localStorage.getItem("estado") || "";
    document.getElementById("rua").value = localStorage.getItem("rua") || "";
    document.getElementById("bairro").value = localStorage.getItem("bairro") || "";
    document.getElementById("numeroCasa").value = localStorage.getItem("numeroCasa") || "";
    
    const dadosManuais = ["nome", "emailForm", "numeroCasa"];
    dadosManuais.forEach(campo => {
        document.getElementById(campo).addEventListener("blur", (e) => {
            localStorage.setItem(campo, e.target.value);
        })
    })
})

document.getElementById("cep").addEventListener("blur",(evento)=> {
    const elemento = evento.target;
    const cepInformado = elemento.value;
    localStorage.setItem("cep", cepInformado);

    if (cepInformado.length !==8){
        alert("Insira o CEP corretamente");
    }
    else{
    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`) // Fetch tem como objetivo puxar o CEP do VIACEP, pelo Json
        .then(response => response.json())
        .then(data =>{
            if(!data.erro){
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
                document.getElementById('rua').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;

                //Local storage de cada valor puxado automatico
                localStorage.setItem("cidade", data.localidade);
                localStorage.setItem("estado", data.uf);
                localStorage.setItem("rua", data.logradouro);
                localStorage.setItem("bairro", data.bairro);

            }else{
                alert("CEP não encontrado.")
            }
        })
        .catch(error => alert("Erro ao buscar ao CEP: ", error));
    }    
})


