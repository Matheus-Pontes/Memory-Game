let modal = document.querySelector('.modal-overlay');
let modal2 = document.querySelector('.modal-overlay2');
const buttonGame = document.querySelector('#btn');
const escudosNFLElement = document.querySelector('#escudosTimesNfl');
const hyperlinkElements = document.getElementsByTagName('a');

const toogleModal = modal => modal.classList.toggle('active');

const functionsHyperlink = {
    'register': () => toogleModal(modal),
    'btn-cancel': () => toogleModal(modal),
    'forgetPassword': () => toogleModal(modal2),
    'btn2-cancel': () => toogleModal(modal2),
}

for(let i=0; i < hyperlinkElements.length; i++) {
    hyperlinkElements[i].addEventListener('click', () => {
        if(functionsHyperlink[hyperlinkElements[i].id]){
            functionsHyperlink[hyperlinkElements[i].id]();
        }
    });
}

// Principal form [user, password, button-Game]
const Form = {
    user: document.querySelector('#user'),
    password: document.querySelector('#password'),

    getValues() {
        return {
            user: Form.user.value,
            password: Form.password.value
        }
    },

    validateFields() {
        const { user, password } = Form.getValues();

        const { userName, passwordName } = Storage.get();

        if(user.trim() === "" && password.trim() === ""){
            throw new Error('Por favor, cadastre-se!');
        } else if (user !== userName && password !== passwordName ){
            throw new Error('Por favor, cadastre-se!')
        } else if(user === userName && password === passwordName ){
            window.open('./src/html/game.html', 'GAME')
        }

    }, 
    submit(event){
        event.preventDefault();

        try {
            Form.validateFields();
        } catch (error) {
            alert(error.message);
        }
    }   
}

// form cadastro 
// salve afther click
// verify to login

const Cadastro = {
    // user and password
    user: document.querySelector('#name'),
    password: document.querySelector('#pass'),

    getValues(){
        return {
            user: Cadastro.user.value,
            password: Cadastro.password.value,
        }
    },

    validateFields(){
        const { user, password } = Cadastro.getValues();

        if(user.trim() === "" && password.trim() === ""){
            throw new Error('Digite usuário e senha. Clique no botão SALVAR.')
        } else {
            Storage.set();
            modal.classList.remove('active');
            
        }
    },

    submit(event){
        event.preventDefault();

        try {
            Cadastro.validateFields();
        } catch (error) {
            alert(error.message);
        }
    }   
} 

const Storage = {
    get(){
        return{
            userName: localStorage.getItem('user') || [],
            passwordName: localStorage.getItem('password') || [],
        }
    },
    set(){
        localStorage.setItem('user', Cadastro.user.value);
        localStorage.setItem('password', Cadastro.password.value);
    }
}