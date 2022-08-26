const $modal = document.querySelector('.modal-overlay');
const $modal2 = document.querySelector('.modal-overlay2');
const $hyperlinkElements = document.getElementsByTagName('a');

const toogleActiveModal = modal => modal.classList.toggle('active');

const functionsHyperlink = {
    'register': () => toogleActiveModal($modal),
    'btn-cancel': () => toogleActiveModal($modal),
    'forgetPassword': () => toogleActiveModal($modal2),
    'btn2-cancel': () => toogleActiveModal($modal2),
}

for(let i=0; i < $hyperlinkElements.length; i++) {
    $hyperlinkElements[i].addEventListener('click', () => {
        if(functionsHyperlink[$hyperlinkElements[i].id]){
            functionsHyperlink[$hyperlinkElements[i].id]();
        }
    });
}

function cleanField($field) {
    $field.value = '';
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
    user: document.querySelector('#name'),
    password: document.querySelector('#pass'),

    getValues() {
        return {
            user: Cadastro.user.value,
            password: Cadastro.password.value,
        }
    },

    validateFields(){
        const { user, password } = Cadastro.getValues();

        if(user.trim() === "" && password.trim() === ""){
            return false;
        } else {
            Storage.set();
            toogleActiveModal($modal);
            cleanField(Cadastro.user);
            cleanField(Cadastro.password);
            
            return true;
        }
    },
    
    submit(event){
        event.preventDefault();
        
        try {
            let response = Cadastro.validateFields();
            if(response)
                alert('Operação realizada com sucesso.');
            else 
                alert('Informe usuário e senha.');

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

const ForgetPassword = {
    newPassword: document.querySelector("#newPassword"),
    repeatNewPassword: document.querySelector("#repeatNewPassword"),
    
    validateNewPass: function () {
        
        if (ForgetPassword.newPassword.value != ForgetPassword.repeatNewPassword.value) {
            return false;
        }
        else {
            localStorage.setItem('password', ForgetPassword.newPassword.value);
            toogleActiveModal($modal2);
            cleanField(ForgetPassword.newPassword);
            cleanField(ForgetPassword.repeatNewPassword);
            return true;
        }
    },
    
    submit: function(e) {
        e.preventDefault();
        
        try {
            let response = ForgetPassword.validateNewPass();
            if(response)
                alert('Operação realizada com sucesso.');
            else 
                alert("BAAAMMM !!! Atenção senhas diferentes !!! ");
        }
        catch(e) {
            alert(e.message);
        }
    }
};