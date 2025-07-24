window.addEventListener("DOMContentLoaded", () => { //Tem como intuito ao recarregar a pagina, fazer alguma ação
    document.getElementById("email").value = localStorage.getItem("email") || ""; 

    document.getElementById("email").addEventListener("blur", (e) => {
        localStorage.setItem("email", e.target.value);
    })
})
