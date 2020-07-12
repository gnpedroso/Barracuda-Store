const loginBtn = document.querySelector('.userLogin')
const loginContent = document.querySelector('.userLogin_content')
loginBtn.addEventListener('click', openOrClose)

let _loginOpenened = false;

function openOrClose(){
    if(!_loginOpenened){
        openLogin()
        closeCart()
    } else{
        closeLogin()
    }
}

function openLogin(){
    loginContent.style.display = "block";
    _loginOpenened = true
}

function closeLogin(){
    loginContent.style.display = "none";
    _loginOpenened = false
}

const createAccBtn = loginContent.querySelector('.createAcc')


createAccBtn.addEventListener('click', function(){
    window.location.href = 'form.html#createAcc'
})

const loginAccBtn = loginContent.querySelector('button')

loginAccBtn.addEventListener('click', function(){
    window.location.href = 'form.html#loginAcc'
})