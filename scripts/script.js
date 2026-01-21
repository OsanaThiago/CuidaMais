import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai";

const API_KEY = "AIzaSyA82XuBzQk517_JPnfwghZEvVHZsIsK6H8";
const ia = new GoogleGenerativeAI(API_KEY);


// Script para menu hamburguer
const myMenu = document.querySelector('.hamburguer');


myMenu.addEventListener('click', ()=>{
    const sideMenu = document.querySelector('.menu-side');
    if(sideMenu.className === 'menu-side'){
        sideMenu.className += ' responsivo';
    } else {
        sideMenu.className = 'menu-side';
    }
});

// Script para triagem CuidaIA+


async function CuidaIA(mensagem) {
    try {
        const model = ia.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `Você é um assistente de saúde chamado CuidaIA+. 
        Responda de forma clara e empática sobre questões de saúde e bem-estar.
        Pergunta do usuário: ${mensagem}`;
        
        const result = await model.generateContent(prompt);
        const resposta = result.response.text();
        
        return resposta;
    } catch (error) {
        console.error("Erro ao chamar API do Google:", error);
        return "Desculpe, houve um erro ao processar sua solicitação.";
    }
}

const enviarBtn = document.querySelector('.enviar-icon');
const textSumir = document.querySelector('.text');
const containerTriagem = document.querySelector('.triagem-ia');
const triagemInput = document.getElementById('triagem');
const paginaConversa = document.querySelector('.pagina-conversa');


enviarBtn.addEventListener('click', async ()=>{
    const userInput = triagemInput.value;

    if (userInput.trim() === '') {
        return;
    }
    
    triagemInput.value = '';
    textSumir.style.display = 'none';

    
    const mensagemUsuario = document.createElement('div');
    mensagemUsuario.className = 'mensagem-usuario';
    mensagemUsuario.textContent = userInput;
    mensagemUsuario.style.alignSelf = 'flex-end';
    paginaConversa.appendChild(mensagemUsuario);

    const indicadorCarregamento = document.createElement('div');
    indicadorCarregamento.className = 'carregamento';
    indicadorCarregamento.textContent = 'CuidaIA+ está digitando...';
    paginaConversa.appendChild(indicadorCarregamento);

    const respostaIA = await CuidaIA(userInput);
    
    indicadorCarregamento.remove();

    const mensagemIA = document.createElement('div');
    mensagemIA.className = 'resposta-ia';
    mensagemIA.textContent = respostaIA;
    mensagemIA.style.alignSelf = 'flex-start';
    paginaConversa.appendChild(mensagemIA);

    containerTriagem.scrollTop = containerTriagem.scrollHeight;
});


triagemInput.addEventListener('keypress', (event)=>{
    if(event.key === 'Enter'){
        enviarBtn.click();
    }
});


const botaoAnexo = document.querySelector('.anexo-icon');
botaoAnexo.addEventListener('click', ()=>{''
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.txt,.doc,.docx';
    input.click();

    input.addEventListener('change', (event) => {
        const arquivo = event.target.files[0];
        if(arquivo) {
            console.log("Arquivo selecionado: " + arquivo.name);
            // Aqui você poderia processar o arquivo se necessário
            triagemInput.value = `📎${arquivo.name}`;
        }
    });
});

