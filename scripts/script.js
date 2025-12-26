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

const enviarBtn = document.querySelector('.enviar-icon');
const textsumir = document.querySelector('.text');
const containerTriagem = document.querySelector('.triagem-ia');
const triagemInput = document.getElementById('triagem');

enviarBtn.addEventListener('click', ()=>{
    const userInput = triagemInput.value;
    console.log("Usuário digitou: " + userInput);
    triagemInput.value = '';
    textsumir.style.display = 'none';
    containerTriagem.style.justifyContent = 'flex-end';
});
triagemInput.addEventListener('keypress', (event)=>{
    if(event.key === 'Enter'){
        enviarBtn.click();
    }
});