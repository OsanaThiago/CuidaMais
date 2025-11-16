const btnRegister = document.querySelector("#btnregister")
const nameInput = document.querySelector("#input-nome")
const senhaInput = document.querySelector("#input-senha")
const emailInput = document.querySelector("#input-email")
const nascimentoInput = document.querySelector("#input-nascimento")
const senhaInputConfirmar = document.querySelector("#input-senha-confirmar")
const btnLogar = document.querySelector("#btnLogar")
let usuarios = new Array()

btnRegister.addEventListener("click", (e) =>{
    if(senhaInput.value !== senhaInputConfirmar.value ){
        alert("As senhas são diferentes") 
    }
    else if(senhaInput.value == "" || senhaInputConfirmar.value == ""){
        alert("Informe as senhas")
    }
    else{
        e.preventDefault()
        
        if(localStorage.hasOwnProperty("usuarios")){
            usuarios = JSON.parse(localStorage.getItem("usuarios"))
        }
        
        let usuario = {
            nome: nameInput.value,
            email: emailInput.value,
            nascimento: nascimentoInput.value,
            senha: senhaInput.value
        }

        usuarios.push(usuario)
        
    
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
    
        nameInput.value = ""
        senhaInput.value = ""
        emailInput.value = ""
        nascimentoInput.value = ""
        senhaInputConfirmar.value = ""

        window.location.href="login.html"
    }
})

btnLogar.addEventListener("click" , (e) =>{
    tryLogin()
})

function tryLogin(){
    usuarios.forEach(usuario => {
        console.log(usuario)
    });
}