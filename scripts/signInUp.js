let page = document.body.id
let usuarios = new Array()

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
                window.location.href = "https://youtu.be/Km71Rr9K-Bw?t=141"
            }
            else{
                alert("Email e/ou senha incorreto")
            }
        }
    })

    function logwgoogle(response) {
        window.location.href = "https://www.youtube.com/watch?v=lPngofMbsNk"
    }

    window.onload = function () {

    google.accounts.id.initialize({
        client_id: "140621001944-0na9t6a88sm5g2qs85iinapvihg3ebhi.apps.googleusercontent.com",
        callback: logwgoogle
    });

    google.accounts.id.renderButton(
        document.getElementById("logingoogle"),{
            theme: "outline", 
            size: "large",
            type:"standard",
            shape:"pill",
            text:"continue_with",
            logo_alignment:"left"             
        } 
    );

    google.accounts.id.prompt(); 
    }
}


function cadastro(){
    const btnRegister = document.querySelector("#btnregister")
    const nameInput = document.querySelector("#input-nome")
    const senhaInput = document.querySelector("#input-senha")
    const emailInput = document.querySelector("#input-email")
    const nascimentoInput = document.querySelector("#input-nascimento")
    const senhaInputConfirmar = document.querySelector("#input-senha-confirmar")

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
}
