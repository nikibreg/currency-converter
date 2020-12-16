const state = {
    user: null, 
    errors: {
        username: null,
        password: null,
        age: null
    }
}

function updateErrors(errorMessage, name) {
    if(name){
        document.getElementById(name).nextElementSibling.innerText = errorMessage;
    } else {
        document.querySelector('section > span').closest('.validation-error').innerText = errorMessage;
    }
}

function validate(inputEl){
    const { validity } = inputEl
    if(validity.valid) return ""
    else {
        if(validity.valueMissing){
            return `The field is required`
        }
        if(validity.tooShort){
            minLength = inputEl.getAttribute('minlength')
            return `The field must be at least ${minLength} characters long`
        }
        return
    }
}

function login(username, password) {
    const users = JSON.parse( localStorage.getItem('users') );
    if(users){
        const user = users.find(user => user.username == username)
        if(!user){
            updateErrors("User not found")
            return
        }
        if(user.password != password){
            updateErrors("Wrong password")
            return
        }
        localStorage.setItem( 'credentials', JSON.stringify(user) )
    } else {
        updateErrors("User not found")
    }
    navigate('index.html')
}

function signup(username, password) {
    let users = JSON.parse( localStorage.getItem('users') );
    if(!users) users = []
    if(users.find(u => u.username == username)){
        updateErrors("User already exists")
        return
    } else {
        users.push({ username, password })
        localStorage.setItem( 'users', JSON.stringify(users) )
        navigate('login.html')
    }
}

function toggleButton(){
    if(!state.errors.username && !state.errors.password){
        document.querySelector('form button').removeAttribute('disabled')   
    } else {
        document.querySelector('form button').setAttribute('disabled', true)   
    }
}

function submitForm(){
    document.querySelector('form').submit()
}

document.querySelector('form').onchange = (e) => {
    const { id } = document.querySelector('form')
    switch (id) {
        case 'signup-form':
            state.errors.age = validate(document.getElementById('age'))
            updateErrors(state.errors.age, 'age')
        default:
            console.log('2')
            state.errors.username = validate(document.getElementById('username')),
            state.errors.password = validate(document.getElementById('password'))
            updateErrors(state.errors.username, 'username')
            updateErrors(state.errors.password, 'password')
            break;
    }
    toggleButton()
}


document.querySelector('form').onsubmit = (e) =>{
    e.preventDefault()
    const id = e.srcElement.id
    const { username, password } = Object.fromEntries(new FormData(document.getElementById(id)).entries('username'))
    switch (id) {
        case 'login-form':
            login(username, password)
            break;
        case 'signup-form':
            signup(username, password)
            break
        default:
            break;
    }
}