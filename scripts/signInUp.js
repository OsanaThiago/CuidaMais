let page = document.body.id
let usuarios = new Array()
const showsenha = document.querySelectorAll("i.fa-regular.fa-eye-slash") 

switch(page){
    case 'loginPage': login(); break;
    case 'cadastroPage': cadastro(); break;
}

function login(){
    const btnLogar = document.querySelector("#btnLogar")
    const senhaInput = document.querySelector("#input-senha")
    const emailInput = document.querySelector("#input-email")

    if(localStorage.hasOwnProperty("usuarios")){
        usuarios = JSON.parse(localStorage.getItem("usuarios"))
    }

    btnLogar.addEventListener("click" , (e) =>{
        for(let i = 0; i<usuarios.length;i++){
            if(usuarios[i].email === emailInput.value && usuarios[i].senha === senhaInput.value){
                window.location.href = "index.html"
                return
            }
        }
        x
    })

    function logWgoogle(response) {
        window.location.href = "index.html"
    }

    window.onload = function () {

    google.accounts.id.initialize({
        client_id: "140621001944-0na9t6a88sm5g2qs85iinapvihg3ebhi.apps.googleusercontent.com",
        callback: logWgoogle
    });

    google.accounts.id.renderButton(
        document.getElementById("logingoogle"),{
            theme: "outline", 
            size: "large",
            type:"standard",
            shape:"pill",
            text:"continue_with",
            logo_alignment:"left",
            width: "199px"           
        } 
    );
    google.accounts.id.prompt(); 
    }
}

function cadastro(){
    const btnRegister = document.querySelector("#btnregister")
    const formCadastro = document.querySelector("#login-info")
    const nameInput = document.querySelector("#input-nome")
    const senhaInput = document.querySelector("#input-senha")
    const senhaInputConfirmar = document.querySelector("#input-senha-confirmar")
    const emailInput = document.querySelector("#input-email")
    const nascimentoInput = document.querySelector("#input-nascimento")


    formCadastro.addEventListener("submit", (e)=>{
        e.preventDefault()

        if (senhaInput.value !== senhaInputConfirmar.value) {
            alert("As senhas são diferentes")
            return
        }

        if (senhaInput.value === "" || senhaInputConfirmar.value === "") {
            alert("Informe as senhas")
            return
        }
        
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

        fetch("http://localhost:5501/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })
        .then(response => {
            if (!response.ok) {
            throw new Error("Erro ao cadastrar");
        }
        return response.json();
            })
        .then(data => {
            alert("Cadastro realizado com sucesso!");
            console.log(data);
        })
        .catch(error => {
            alert("Erro no cadastro");
            console.error(error);
        });
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
        window.location.href="login.html"

    })
}

showsenha.forEach(senhas=>{
    senhas.addEventListener("click", (e)=>{
        let input = senhas.previousElementSibling
        input.type = input.type === "password" ? "text" : "password"
        senhas.classList.toggle("fa-eye")
        senhas.classList.toggle("fa-eye-slash")
    })
})


