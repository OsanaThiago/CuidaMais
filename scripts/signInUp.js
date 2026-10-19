let page = document.body.id
const apiUrl = "http://localhost:8081"

const showsenha = document.querySelectorAll("i.fa-regular.fa-eye-slash") 

// Esta é uma declaração switch que verifica o valor de 'page' e executa códigos diferentes com base no que é.
switch(page){
    // Se 'page' for 'loginPage', chama a função 'login' e sai do switch.
    case 'loginPage': login(); break;
    // Se 'page' for 'cadastroPage', chama a função 'cadastro' e sai do switch.
    case 'cadastroPage': cadastro(); break;
}


function login(){
    const btnLogar = document.querySelector("#btnLogar")
    const senhaInput = document.querySelector("#input-senha")
    const emailInput = document.querySelector("#input-email")

    btnLogar.addEventListener("click" , async (e) =>{
        e.preventDefault()

        const usuario = await verificarUsuario(emailInput.value, senhaInput.value)
        if (usuario) {
            setTimeout(() => {
                window.location.href = "menuDoUsuario.html"
            }, 2000);
        }
    })


    async function logWgoogle(resposta) {
        if (!resposta || !resposta.credential) {
            return null;
        }

        try {
            // Decodifica o JWT e extrai o payload, depois converte de JSON para objeto JavaScript
            const payload = JSON.parse(atob(resposta.credential.split('.')[1]));
            
            // Armazena os dados do Google em uma variável
            const dadosGoogle = {
                email: payload.email,
                nome: payload.name
            };
            
            // Extrai o email do payload do Google
            const email = dadosGoogle.email;

            // Faz uma requisição GET para buscar pacientes com este email no servidor
            const response = await fetch(`${apiUrl}/pacientes?email=${encodeURIComponent(email)}`);
            if (!response.ok) {
                throw new Error("Erro ao buscar usuário");
            }

            const data = await response.json();
            if (data.length > 0) {
                window.location.href = "areadopaciente.html";
                return data[0];
            }

            const createResponse = await fetch(`${apiUrl}/pacientes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosGoogle)
            });

            if (!createResponse.ok) {
                throw new Error("Erro ao cadastrar");
            }

            const created = await createResponse.json();
            console.log(created);
            window.location.href = "index.html";
            return created;
        } catch (error) {
            console.error(error);
            alert("Erro no login com Google");
            return null;
        }
    }

    // Esta linha configura código para executar quando a janela (página) terminar de carregar.
    window.onload = function (){

        // Esta linha inicializa o Google Sign-In com um client ID.
        google.accounts.id.initialize({
            client_id: "323644328325-elbo76e26jq0i5q9fkfd9ckiklo2hoda.apps.googleusercontent.com",
            callback: logWgoogle
        });

        // Esta linha renderiza um botão de Google Sign-In no elemento com id 'logingoogle', com estilos especificados.
        google.accounts.id.renderButton(
            document.getElementById("logingoogle"),{
                theme: "outline", 
                size: "large",
                type:"standard",
                shape:"pill",
                text:"",
                logo_alignment:"center",
                width: "400px"           
            } 
        );
        // Esta linha solicita ao usuário para fazer login com Google, se possível.
        google.accounts.id.prompt(); 
        
    }
    async function getUsuarioPorEmailESenha(email, senha) {
        // Esta função é assíncrona, o que significa que ela pode esperar por operações que levam tempo, como buscar dados da internet, sem bloquear o resto do código.
        try {
            // Tentamos executar este bloco de código. Se algo der errado, vamos para o 'catch'.
            
            // Busca o paciente no backend local pela porta configurada.
            // encodeURIComponent garante que caracteres especiais no email sejam codificados corretamente para a URL.
            const resposta = await fetch(`${apiUrl}/pacientes?email=${encodeURIComponent(email)}`)
            
    
            if (!resposta.ok) {
                throw new Error("Erro ao buscar usuário")
            }
            
            // Convertemos a resposta em formato JSON para um objeto JavaScript que podemos usar.
            const data = await resposta.json()
            const usuario = data[0]
            if (!usuario) {
                alert("Email não cadastrado")
                return null
            }
            if (usuario.senha !== senha) {
                alert("Senha incorreta")
                return null
            }
            return usuario
        } catch (error) {
            // Se qualquer erro ocorreu no bloco 'try', executamos este bloco.
            // Imprimimos o erro no console do navegador para depuração.
            console.error(error)
            alert(error.message)
            
            // Retornamos null para indicar que não conseguimos buscar o usuário.
            return null
        }
    
    }
    
    async function verificarUsuario(email, senha) {
        const usuario = await getUsuarioPorEmailESenha(email, senha)
        return usuario
    }
}



// Esta linha define uma função chamada 'cadastro' que lida com o processo de registro.
function cadastro(){
    const btnRegister = document.querySelector("#btnregister")
    const formCadastro = document.querySelector("#login-info")
    const nameInput = document.querySelector("#input-nome")
    const senhaInput = document.querySelector("#input-senha")
    const senhaInputConfirmar = document.querySelector("#input-senha-confirmar")
    const emailInput = document.querySelector("#input-email")
    const nascimentoInput = document.querySelector("#input-nascimento")


    // Esta linha adiciona um ouvinte de evento ao formulário 'formCadastro'. Quando enviado, executa o código dentro e previne o envio padrão do formulário.
    formCadastro.addEventListener("submit", async (e)=>{
        e.preventDefault()

        // Esta linha verifica se a senha e a confirmação de senha não correspondem, e se for o caso, mostra um alerta e para.
        if (senhaInput.value !== senhaInputConfirmar.value) {
            alert("As senhas são diferentes")
            return
        }

        // Esta linha verifica se algum dos campos de senha está vazio, e se for o caso, mostra um alerta e para.
        if (senhaInput.value === "" || senhaInputConfirmar.value === "") {
            alert("Informe as senhas")
            return
        }
        
        /* Esta linha verifica se o local storage tem 'usuarios', e se tiver, carrega-os no array.
        if(localStorage.hasOwnProperty("usuarios")){
            usuarios = JSON.parse(localStorage.getItem("usuarios"))
        }*/

        // Esta linha cria um objeto chamado 'usuario' com os valores dos campos de entrada.
        let usuario = {
            nome: nameInput.value,
            email: emailInput.value,
            dataNascimento: nascimentoInput.value,
            senha: senhaInput.value
        }

        const resposta = await fetch(`${apiUrl}/pacientes`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
            
        })
        // Esta linha lida com a resposta do servidor.
        .then(resposta => {
            // Se a resposta não estiver ok, lança um erro.
            if (!resposta.ok) {
                throw new Error("Erro ao cadastrar");
            }
            // Caso contrário, analisa a resposta como JSON.
            return resposta.json();
        })
        // Esta linha lida com os dados bem-sucedidos do servidor.
        .then(data => {
            alert("Cadastro realizado com sucesso!");
            // Registra os dados no console.
            console.log(data);
            window.location.href="areadopaciente.html"
        })
        // Esta linha lida com quaisquer erros que ocorreram.
        .catch(error => {
            // Mostra um alerta de erro.
            alert("Erro no cadastro");
            // Registra o erro no console.
            console.error(error);
        });
        console.log(usuario.nascimento)
        
        // Esta linha redireciona para 'login.html'.

    })
}

// Esta linha percorre cada elemento em 'showsenha' (os ícones de mostrar/ocultar senha).
showsenha.forEach(senhas=>{
    // Para cada ícone, adiciona um ouvinte de evento de clique.
    senhas.addEventListener("click", (e)=>{
        // Esta linha obtém o campo de entrada logo antes do ícone.
        let input = senhas.previousElementSibling
        // Esta linha alterna o tipo de entrada entre 'password' (oculto) e 'text' (visível).
        input.type = input.type === "password" ? "text" : "password"
        // Esta linha alterna as classes do ícone para mudar o ícone do olho de cortado para aberto ou vice-versa.
        senhas.classList.toggle("fa-eye")
        senhas.classList.toggle("fa-eye-slash")
    })
})
