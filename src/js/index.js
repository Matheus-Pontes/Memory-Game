
// Principal form [user, password, button-Game]
const Form = {
    user: document.querySelector('#user'),

    getValues() {
        return {
            user: Form.user.value,
        }
    },
    submit(event){
        event.preventDefault();
        Storage.set();
        window.open('./src/html/game.html', 'GAME')
        this.user.value = "";
    }   
}

const Storage = {
    get(){
        return{
            userName: localStorage.getItem('user') || [],
        }
    },
    set(){
        localStorage.setItem('user', Form.getValues().user);
    }
}
